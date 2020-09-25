<template>
    <div>
        <CModal
                title="Upload File"
                :show.sync="show"
                size="sm"
        >
            <input type="file" ref="choiceFile" hidden @change="fileChange($event)">
            <CInput label="Upload File Path" :value.sync="pathString"></CInput>
            <div class="select-file">
                <div class="file-name">{{ file ? file.name : 'no file' }}</div>
                <button type="button" class="btn btn-light" @click="choiceFile()">
                    Select File
                </button>
            </div>
            <div slot="footer">
                <button type="button" class="btn btn-light" @click="uploadFile()">
                    Upload
                </button>
            </div>
        </CModal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator'
    import {NknModule} from '@/store/NknModule'
    import {CommonModule} from '@/store/CommonModule'
    import {DriveSpace} from '@/store/model/File'

    @Component
    export default class UploadFileComponent extends Vue {

        $refs !: {
            uploadFile: any,
            choiceFile: HTMLInputElement
        }

        show = false
        pathString = ''
        file: any = null


        @Prop()
        path !: string[] | null

        @Prop()
        public !: string

        showModal() {
            this.show = true
            console.log('当前空间为：', this.public)
            if (this.path) {
                this.pathString = '/' + (this.path ? this.path.join('/') : 'root') + (this.path.length > 0 ? '/' : '')
            }
        }

        choiceFile() {
            this.$refs.choiceFile.dispatchEvent(new MouseEvent('click'))
        }

        fileChange(input: any) {
            this.file = input.target.files[0]
        }

        uploadFile() {
            if (!this.file || !this.path) {
                CommonModule.toast({content: 'please select file and set file path'})
                return
            }
            let paths = this.pathString.split('/').filter((v) => {
                return v && v.trim() && v !== 'MetaNet' && v !== 'Personal'
            })
            console.log(paths)
            NknModule.uploadFile({
                file: this.file, paths: paths, space: this.public === 'MetaNet' ? DriveSpace.PUBLIC : DriveSpace.PRIVATE
            })
            this.show = false
        }

    }
</script>

<style lang="stylus" scoped>
    .select-file
        display flex

        button
            float left

        .file-name
            line-height 40px
            padding 0 10px 0 0
</style>