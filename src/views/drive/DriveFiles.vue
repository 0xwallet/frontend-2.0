<template>
    <div>
        <main-card-component :title="''">
            <div slot="left" style="float: left;font-size: 16px;margin-right: 20px;margin-top: 5px"
                 @mouseenter="txIDOver" @mouseleave="txIDOut">
                <div style="display: flex;">
                    <div style="margin: 0 5px">{{ currentFolder }} |</div>
                    <div v-if="!showTxID" style="margin-top: 2px;">
                        <hash-component
                                :hash="'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d1232db32e432db3634'"></hash-component>
                    </div>
                    <div v-if="showTxID" style="font-size: 14px;margin-top: 2px;">
                        be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d1232db32e432db3634
                    </div>
                    <div style="margin-left: 10px;margin-top: -1px">
                        <CIcon name="cil-copy"></CIcon>
                    </div>
                </div>
            </div>
            <div slot="right-action" class="float-right files-action">
                <CButton class="btn" @click="checkAllFiles">{{ checkFiles.length === files.length ? 'Inverse' : `Check
                    All` }}
                </CButton>
                <CButton class="btn btn-info" @click="choiceFile">Upload</CButton>
                <CButton class="btn btn-success">New</CButton>
                <CButton class="btn btn-light">Refresh</CButton>
                <input type="file" ref="choiceFile" hidden @change="fileChange($event)">
            </div>

            <CProgress v-if="isUploading" color="success"
                       show-value
                       :value="uploadProgress"
                       animated
                       size="sm">
                <div class="upload-speed">
                    {{ uploadSpeed }}
                </div>
            </CProgress>


            <div>
                <table class="file-table">
                    <tr>
                        <th class="file-checkbox">
                            <div class="checkbox" @click="checkAllFiles">
                                <label>
                                    <input type="checkbox">
                                </label>
                            </div>
                        </th>
                        <th>Name</th>
                        <th>Options</th>
                        <th>Hash</th>
                        <th>Size</th>
                        <th>Time</th>
                    </tr>
                    <tr :class="[darkMode?'files-item-dark':'files-item']" v-for="(file,index) in files" :key="index"
                        @mouseenter="mouseOver(file)"
                        @mouseleave="mouseOut(file)" @click="clickFile(file)">
                        <td class="file-checkbox">
                            <div v-if="file.type === 4" style="height: 40px"></div>
                            <div class="checkbox" v-if="file.type !== 4">
                                <label>
                                    <input type="checkbox" name="checkFile" v-model="checkFiles" :value="file.id">
                                </label>
                            </div>
                        </td>
                        <td class="file-name">
                            <div v-if="file">
                                <div class="image-box">
                                    <CImg class="image"
                                          :src="file.getImg()"></CImg>
                                </div>
                            </div>
                            <div class="text">{{ file.name }}</div>
                        </td>
                        <td class="file-option">
                            <div class="options" v-if="file.type !== 4 && file.active">
                                <div>
                                    <CIcon v-c-tooltip.hover="'share'" name="cil-share-alt"></CIcon>
                                </div>
                                <div>
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
                                <div @click="download(file)">
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
                        </td>
                        <td class="file-hash">
                            <div class="hash" v-if="file.type !== 4 && file.hash">
                                <hash-component :hash="file.hash" :active="false"></hash-component>
                                <div class="copy">
                                    <CIcon name="cil-copy"></CIcon>
                                </div>
                            </div>
                        </td>
                        <td class="file-size">
                            <div class="size" style="margin-top: 10px">{{ file.getSize() }}</div>
                        </td>
                        <td class="file-time">
                            <div class="time">
                                <code>
                                    {{ file.time }}
                                </code>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </main-card-component>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import MainCardComponent from '../../components/MainCardComponent.vue'
    import {NknModule} from '@/store/NknModule'
    import {DriveSpace, DriveUserFileInfo, File, FileType} from '@/store/model/File'
    import HashComponent from '@/components/HashComponent.vue'
    import {DriveModule} from '@/store/DriveModule'
    import {UserModule} from '@/store/UserModule'


    @Component({
        components: {HashComponent, MainCardComponent}
    })
    export default class DriveFiles extends Vue {

        $refs !: {
            uploadFile: any,
            choiceFile: HTMLInputElement
        }

        showTxID = false
        files: Array<File> = []
        checkFiles: Array<string> = []

        mounted() {

            let drivePath = this.$route.params.drive
            if (!drivePath) {
                let file = new File()
                file.id = '1'
                file.type = FileType.LOCK
                file.info = new DriveUserFileInfo()
                file.name = 'Private'
                file.info.size = 0
                this.files.push(file)

                file = new File()
                file.id = '2'
                file.type = FileType.DIR
                file.info = new DriveUserFileInfo()
                file.name = 'MetaNet'
                file.info.size = 0
                this.files.push(file)
            } else {
                console.log(drivePath)
                let paths = drivePath.split('.')
                console.log(paths)

                let space: DriveSpace

                if (paths[0] == 'MetaNet') {
                    space = DriveSpace.PUBLIC
                } else {
                    space = DriveSpace.PRIVATE
                }

                this.files = []
                console.log('files', this.files)

                setTimeout(() => {

                    DriveModule.getDriveListFiles({parentId: null, space: space}).then((fileList) => {
                        console.log(fileList)
                        let file = new File()
                        file.id = '0'
                        file.type = FileType.DIR
                        file.info = new DriveUserFileInfo()
                        file.name = '..'
                        file.info.size = 0
                        this.files.push(file)

                        fileList.forEach(fileItem => {
                            console.log('fileItem', fileItem)
                            this.files.push(fileItem)
                        })
                    })
                }, 1000)
            }
        }

        get currentFolder(): string {
            let drivePath = this.$route.params.drive

            let paths = drivePath ? drivePath.split('.') : []

            if (paths.length == 0) {
                return 'Drive'
            } else {
                return paths[paths.length - 1]
            }
        }

        download(file: File) {
            location.href = 'https://drive-s.owaf.io/download/' + UserModule.userInfo.id + '/public/' + file.id + '/' + file.name
        }

        clickFile(file: File) {
            console.log(file)
            let drivePath = this.$route.params.drive

            let paths = drivePath ? drivePath.split('.') : []

            if (file.id == '1' || file.id == '2') {
                this.$router.push('/drive/' + file.name)
                return
            }
            if (file.id == '0') {
                // 回到上一级
                if (paths.length == 1) {
                    this.$router.push('/drive')
                } else {
                    paths.pop()
                    this.$router.push('/drive/' + paths.join('.'))
                }
            }
        }

        txIDOver() {
            this.showTxID = true
        }

        txIDOut() {
            this.showTxID = false
        }

        mouseOver(file: File) {
            if (!file.active) {
                file.active = true
            }
        }

        mouseOut(file: File) {
            if (file.active) {
                file.active = false
            }
        }

        get darkMode(): boolean {
            return this.$store.state.darkMode
        }

        checkAllFiles() {
            if (this.checkFiles.length != this.files.length) {
                this.checkFiles = []
                this.files.forEach(item => {
                    this.checkFiles.push(item.id)
                })
            } else {
                this.checkFiles = []
            }
        }

        choiceFile() {
            this.$refs.choiceFile.dispatchEvent(new MouseEvent('click'))
        }

        fileChange(input: any) {
            let file = input.target.files[0]
            NknModule.uploadFile(file)
        }

        get isUploading(): boolean {
            return NknModule.isUploading
        }

        get uploadProgress(): number {
            return NknModule.uploadProgress
        }

        get uploadSpeed(): string {
            return NknModule.uploadSpeed
        }

    }
</script>

<style lang="stylus" scoped>
    .files-action
        .btn
            margin-left 10px

    .file-table
        width 100%

        th:nth-child(n+3)
            text-align center

        /*tr*/
        /*    border 1px solid black*/

        /*td, th*/
        /*    border 1px solid black*/

        .files-item
            &:hover
                background linear-gradient(to right, rgba(250, 250, 250, 1), rgba(244, 244, 244, 1), white)

        .files-item-dark
            &:hover
                background background linear-gradient(to right, #23252d, rgba(40, 40, 80, 1), #23252d)

        .file-checkbox
            cursor pointer
            width 20px

            .checkbox
                padding-top 12px

        .file-name
            cursor pointer

            .image-box
                float left

                .image
                    width 18px

            .text
                padding-top 2px
                margin-left 23px

        .file-option
            cursor pointer
            width 145px
            padding 0 10px
            text-align center

            .options
                display flex
                margin-top -2px

                .c-icon
                    width 13px
                    margin-left 2px
                    color #888888

                .delete
                    color #FF5533

        .file-hash
            padding 0 10px
            width 135px
            text-align center

            .hash
                display flex
                margin-top 8px

            .copy
                margin-top -3px
                margin-left 4px
                color #888888

                .c-icon
                    width 13px

        .file-size
            width 120px

            .size
                text-align center
                font-size 12px

        .file-time
            width 200px
            text-align center

            .time
                margin-top 3px

    .upload-speed
        position absolute
        margin-top 8px
        width 100%
        text-align center

</style>