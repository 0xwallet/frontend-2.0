<template>
    <div>
        <main-card-component :title="$t('drive.files.title')">
            <div slot="right-action" class="float-right files-action">
                <CButton class="btn" @click="checkAllFiles">{{ checkFiles.length === files.length ? '全不选' : '全选' }}
                </CButton>
                <CButton class="btn btn-info" @click="$refs.uploadFile.showModal()">高级上传</CButton>
                <CButton class="btn btn-info" @click="choiceFile">上传</CButton>
                <CButton class="btn btn-success">新建</CButton>
                <CButton class="btn btn-light">刷新</CButton>
                <input type="file" ref="choiceFile" hidden @change="fileChange($event)">
            </div>
            <div>
                <div v-for="(file,index) in files" :key="index" class="files" @mouseenter="mouseOver(file)"
                     @mouseleave="mouseOut(file)">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" name="checkFile" v-model="checkFiles" :value="file.uuid">
                        </label>
                    </div>
                    <div class="name">
                        <div class="image-box">
                            <CImg class="image" v-if="file.dir"
                                  :src="require('@/assets/images/icon/drive/dir.png')"></CImg>
                        </div>
                        <div class="text">{{ file.name }}</div>
                    </div>
                    <div class="option" v-if="file.active">
                        <div @click="clock">
                            <CIcon v-c-tooltip.hover="$t('drive.files.clock')" name="cil-lock-locked"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.info')" name="cil-info"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.edit')" name="cil-pencil"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.copy')" name="cil-link"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.download')" name="cil-save"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.upload')" name="cil-cloud-upload"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.delete')" class="delete"
                                   name="cil-trash"></CIcon>
                        </div>
                    </div>
                    <div class="size">{{ file.getSize() }}</div>
                    <div class="time">
                        <code>
                            {{ file.createTime }}
                        </code>
                    </div>
                </div>
            </div>
        </main-card-component>
        <drive-upload-file ref="uploadFile"></drive-upload-file>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import MainCardComponent from '../../components/MainCardComponent.vue'
    import {Matter} from '@/store/model/EyeBlue'
    import moment from 'moment'
    import {NknModule} from '@/store/NknModule'
    import DriveUploadFile from '@/views/drive/DriveUploadFile.vue'
    import {DriveModule} from '@/store/DriveModule'

    @Component({
        components: {DriveUploadFile, MainCardComponent}
    })
    export default class DriveFiles extends Vue {

        $refs !: {
            uploadFile: any,
            choiceFile: HTMLInputElement
        }

        files: Array<Matter> = []
        checkFiles: Array<string> = []

        mounted() {
            for (let i = 0; i < 20; i++) {
                let file = new Matter()
                file.name = '文件名'
                file.dir = i < 6
                file.uuid = (Math.random() * 10000000).toString()
                file.size = Math.random() * 10000000
                let min = Math.ceil(new Date(2019, 12, 31, 9).getTime())
                let max = Math.ceil(new Date().getTime())
                file.createTime = moment(Math.floor(Math.random() * (max - min + 1)) + min).format('YYYY-MM-DD HH:ss')
                this.files.push(file)
            }
        }

        mouseOver(file: Matter) {
            if (!file.active) {
                file.active = true
            }
        }

        mouseOut(file: Matter) {
            if (file.active) {
                file.active = false
            }
        }

        clock() {
            NknModule.bindAndSetDefault({
                password: 'lty01234',
            }).then(res => {
                console.log(res)
            })
        }

        checkAllFiles() {
            if (this.checkFiles.length != this.files.length) {
                this.checkFiles = []
                this.files.forEach(item => {
                    this.checkFiles.push(item.uuid)
                })
            } else {
                this.checkFiles = []
            }
        }

        choiceFile() {
            this.$refs.choiceFile.dispatchEvent(new MouseEvent('click'))
        }

        fileChange(file: any) {
            // let uuid = DriveModule.eyeblueUserInfo.uuid
            // console.log(uuid)
            // console.log(file.target.files[0])
            this.axios.defaults.withCredentials = true
            let param = new FormData()
            param.append('userUuid', '467f81c2-ce8f-4ec4-7b12-14e403fa94a7')
            param.append('puuid', 'root')
            param.append('file', file.target.files[0])
            this.axios.post('https://drive-s.owaf.io/api/matter/upload', param, {
                headers         : {
                    'Content-Type': 'multipart/form-data',
                    // 'cookie'      : 'ak=51e300c1-84b3-4af5-6a75-f67b07119b80'
                },
                onUploadProgress: e => {
                    const completeProgress = ((e.loaded / e.total * 100) | 0) + '%'
                    console.log(completeProgress)
                }
            })
        }

    }
</script>

<style lang="stylus" scoped>
    .files-action
        .btn
            margin-left 10px

    .files
        display flex

        .checkbox
            margin-top 12px
            margin-right 10px

        .name
            flex 1
            display flex
            line-height 40px

            .text
                margin-left 5px
                margin-top 2px

            .image-box
                width 30px
                height 30px

                .image
                    width 26px
                    height 26px

        .option
            margin-right 40px
            display flex

            div
                margin-left 5px

                .c-icon

                    color #888888

                .delete
                    color #FF5533

        .time
            margin-left 20px
            text-align justify

        .size
            width 90px


</style>