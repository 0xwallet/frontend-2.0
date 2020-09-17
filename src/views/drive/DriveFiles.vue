<template>
    <div>
        <main-card-component :title="''">
            <div slot="left" style="float: left;font-size: 16px;margin-right: 20px;margin-top: 5px"
            >
                <div style="display: flex;" @mouseleave="txIDOut">
                    <div style="margin: 0 5px">{{ currentFolder }} |</div>
                    <div v-if="!showTxID" style="margin-top: 2px;" @mouseenter="txIDOver">
                        <hash-component
                                :hash="'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d1232db32e432db3634'"></hash-component>
                    </div>
                    <div v-if="showTxID" style="font-size: 14px;margin-top: 2px;">
                        be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d1232db32e432db3634
                    </div>
                    <div style="margin-left: 10px;margin-top: -1px">
                        <CIcon name="cil-copy" v-c-tooltip.hover="'Copy txID'"></CIcon>
                    </div>
                </div>
            </div>
            <div slot="right-action" class="float-right files-action">
                <CButton class="btn" v-if="currentFolder !== 'Drive'" @click="checkAllFiles">{{ checkFiles.length ===
                    files.length ? 'Inverse' : `Check
                    All` }}
                </CButton>
                <CButton v-if="moveId !== ''" class="btn btn-warning"
                         @click="paste()">Paste
                </CButton>
                <CButton v-if="currentFolder !== 'Drive'" class="btn btn-info"
                         @click="$refs.uploadFileComponent.showModal()">Upload
                </CButton>
                <CButton v-if="currentFolder !== 'Drive'" class="btn btn-success">New</CButton>
                <CButton v-if="checkFiles.length > 0" class="btn btn-danger" @click="deleteFiles">Delete</CButton>
                <CButton class="btn">Refresh</CButton>
            </div>

            <CProgress v-if="isUploading" color="success"
                       show-value
                       :value="uploadProgress"
                       animated
                       size="sm">

            </CProgress>
            <div class="upload-speed" v-if="isUploading">
                {{ uploadSpeed }}
            </div>
            <div>
                <table class="file-table">
                    <tr>
                        <th class="file-checkbox">
                            <div class="checkbox" @click="checkAllFiles">
                                <label>
                                    <input :disabled="currentFolder === 'Drive'" :checked="checkFiles.length ===
                    files.length" type="checkbox">
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
                        @mouseleave="mouseOut(file)">
                        <td class="file-checkbox" v-if="file.type !== 8">
                            <div v-if="file.type === 4" style="height: 40px"></div>
                            <div class="checkbox" v-if="file.type !== 4">
                                <label>
                                    <input type="checkbox" :disabled="currentFolder === 'Drive'" name="checkFile"
                                           v-model="checkFiles" :value="file.id">
                                </label>
                            </div>
                        </td>
                        <td class="file-name" v-if="file.type !== 8" @click="clickFile(file)" ref="file_item">
                            <div v-if="file">
                                <div class="image-box">
                                    <CImg class="image"
                                          :src="file.getImg()"></CImg>
                                </div>
                            </div>
                            <div class="text">{{ file.name }}</div>
                        </td>
                        <td class="file-option" v-if="file.type !== 8">
                            <div class="options" v-if="file.type !== 4 && file.active">
                                <div @click="shareFile(file)">
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
                                <div @click="deleteFile(file)">
                                    <CIcon v-c-tooltip.hover="$t('drive.files.delete')" class="delete"
                                           name="cil-trash"></CIcon>
                                </div>
                            </div>
                        </td>
                        <td class="file-hash" v-if="file.type !== 8">
                            <div class="hash" v-if="file.type !== 4 && file.hash">
                                <hash-component :hash="file.hash" :active="false"></hash-component>
                                <div class="copy">
                                    <CIcon name="cil-copy"></CIcon>
                                </div>
                            </div>
                        </td>
                        <td class="file-size" v-if="file.type !== 8">
                            <div v-if="file.type !== 4" class="size" style="margin-top: 10px">{{ file.getSize() }}</div>
                        </td>
                        <td class="file-time" v-if="file.type !== 8">
                            <div class="time">
                                <code>
                                    {{ file.time }}
                                </code>
                            </div>
                        </td>
                        <td colspan="6" v-if="file.type === 8" class="file-loading">
                            <CSpinner grow/>
                        </td>
                        <td class="file-options">
                            <div v-if="file.type !== 4 && file.type !== 8">
                                <CDropdown
                                        class="drop-down"
                                        toggler-text=""
                                >
                                    <div slot="toggler">
                                        <div>
                                            <CIcon name="cil-options"></CIcon>
                                        </div>
                                    </div>
                                    <CDropdownItem @click="move(file.id)">Move</CDropdownItem>
                                    <CDropdownItem>ReName</CDropdownItem>
                                    <CDropdownItem @click="deleteFile(file)" style="color: red">Delete</CDropdownItem>
                                    <CDropdownDivider></CDropdownDivider>
                                    <CDropdownItem>Share</CDropdownItem>
                                    <CDropdownItem>Info</CDropdownItem>
                                </CDropdown>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </main-card-component>

        <upload-file-component ref="uploadFileComponent" :path="currentPath"
                               :public="space"></upload-file-component>
        <viewer style="display: none" :images="images" ref="viewer" @inited="inited" v-if="showImagePreview" rebuild>
            <template slot-scope="scope">
                <img v-for="(src,i) in scope.images" :src="src" :key="i" alt="">
            </template>
        </viewer>
        <pdf-view v-if="pdfShow" :url="pdfUrl" @onClose="onPdfClose"></pdf-view>
        <create-file-share-component ref="create_file_share"></create-file-share-component>
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
    import UploadFileComponent from '@/views/drive/UploadFileComponent.vue'
    import gql from 'graphql-tag'
    import Client from '@/graphql/apollo'
    import {CommonModule} from '@/store/CommonModule'
    import 'viewerjs/dist/viewer.css'
    import Viewer from 'v-viewer/src/component.vue'
    import pdfView from './PdfComponent.vue'
    import CreateFileShareComponent from '@/views/drive/CreateFileShareComponent.vue'


    @Component({
        components: {CreateFileShareComponent, UploadFileComponent, HashComponent, MainCardComponent, Viewer, pdfView}
    })
    export default class DriveFiles extends Vue {

        $refs !: {
            file_item: any,
            create_file_share: CreateFileShareComponent
        }


        showTxID = false
        files: Array<File> = []
        checkFiles: Array<string> = []
        space: DriveSpace = DriveSpace.PUBLIC
        images: Array<string> = []
        viewer: any
        showImagePreview = false
        contextMenuTarget: any = null
        moveId: string = ''
        pdfShow: boolean = false
        pdfUrl: string = ''

        mounted() {
            if (localStorage.getItem('moveId')) {
                this.moveId = localStorage.getItem('moveId') || ''
            }

            this.loadFiles()

            this.contextMenuTarget = this.$refs.file_item
            console.log('target', this.$refs.file_item)


            this.subscript()

        }

        async subscript() {
            let user_id = await UserModule.hasUserInfo()

            const driveFileUploaded = gql`
                subscription driveFileUploaded($userId : ID!){
                    driveFileUploaded(userId: $userId){
                        id
                    }
                }
            `
            const observer = Client.getInstance().subscribe({
                query    : driveFileUploaded,
                variables: {
                    userId: user_id,
                },
            })
            let _this = this
            observer.subscribe({
                next(value) {
                    console.log('driveFileUpload:onNext:', value)
                    _this.loadFiles()
                    CommonModule.toast({content: '上传成功'})
                },
                error(errorValue: any) {
                    console.log('driveFileUpload:onError:', JSON.stringify(errorValue))
                }
            })
        }

        loadFiles() {
            this.files = []
            this.checkFiles = []

            const path = this.$route.path
            const paths = path.split('/')
            paths.shift()
            paths.shift()
            // console.log(paths)

            if (paths.length < 1 || paths[0] == '') {
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
                let space: DriveSpace

                if (paths[0] == 'MetaNet') {
                    space = DriveSpace.PUBLIC
                } else {
                    space = DriveSpace.PRIVATE
                }
                this.space = space
                console.log('当前网盘空间域为： ', this.space)

                let file = new File()
                file.id = '-100'
                file.type = FileType.LOADING
                file.info = new DriveUserFileInfo()
                file.name = '..'
                file.info.size = 0
                this.files.push(file)

                setTimeout(() => {
                    this.files.pop()
                    let fullName = paths
                    fullName.shift()
                    console.log('fullName', fullName)
                    let imageIndex = 0
                    DriveModule.getDriveListFiles({dirFullName: fullName, space: space}).then((fileList) => {
                        fileList.forEach(fileItem => {
                            if (fileItem.type === FileType.IMG) {
                                this.images.push(fileItem.getPreviewUrl())
                                fileItem.imgIndex = imageIndex++
                            }
                            this.files.push(fileItem)
                        })
                    })
                }, 1000)
            }
        }

        shareFile(file: File) {
            this.$refs.create_file_share.showModal(file)
        }

        move(id: string) {
            this.moveId = id
        }

        paste() {
            if (this.moveId !== '') {
                DriveModule.driveMoveFile({
                    fromId: this.moveId,
                    toId  : DriveModule.currentId
                })
                localStorage.removeItem('moveId')
                this.moveId = ''
                this.loadFiles()
            }
        }

        get currentPath(): string[] | null {
            let drivePath = this.$route.path
            let paths = drivePath.split('/')
            paths.shift()
            paths.shift()
            paths.shift()
            return paths
        }

        get currentFolder(): string {
            let drivePath = this.$route.path

            let paths = drivePath ? drivePath.split('/') : []

            if (paths.length == 2) {
                return 'Drive'
            } else {
                return paths[paths.length - 1]
            }
        }

        download(file: File) {
            location.href = file.getDownloadUrl()
        }

        deleteFile(file: File) {
            console.log(file)

            DriveModule.driveDeleteFile({
                id   : file.id,
                space: this.space
            }).then(() => {
                this.loadFiles()
            }).catch(() => {
                this.loadFiles()
            })
        }

        deleteFiles() {
            DriveModule.driveDeleteFiles({
                ids  : [],
                space: DriveSpace.PUBLIC
            }).then(() => {
                this.loadFiles()
            }).catch(() => {
                this.loadFiles()
            })
        }

        clickFile(file: File) {
            console.log(file)
            if (this.moveId) {
                localStorage.setItem('moveId', this.moveId)
            }

            let drivePath = this.$route.path
            let paths = drivePath ? drivePath.split('/') : []
            paths.shift()
            paths.shift()

            if (file.id == '1' || file.id == '2') {

                this.$router.push('/drive/' + file.name)
                return
            }
            if (file.type == FileType.UP) {
                // 回到上一级
                if (paths.length == 1) {
                    this.$router.push('/drive')
                } else {
                    paths.pop()
                    this.$router.push('/drive/' + paths.join('/'))
                }
                return
            }
            if (file.type == FileType.DIR) {
                paths.push(file.name)
                this.$router.push({path: '/drive/' + paths.join('/')})
                return
            }
            if (file.type === FileType.IMG) {
                if (!this.showImagePreview) {
                    this.showImagePreview = true
                }
                setTimeout(() => {
                    this.viewer.view(file.imgIndex)
                }, 200)
            }
            if (file.type === FileType.PDF) {
                this.pdfUrl = file.getPreviewUrl()
                this.pdfShow = true
            }
        }

        inited(viewer: any) {
            this.viewer = viewer
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

        onPdfClose() {
            this.pdfShow = false
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
                background linear-gradient(to right, white, rgba(244, 244, 244, 1), white)

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
        /*position absolute*/
        margin-top 8px
        width 100%
        text-align center

    .file-loading
        text-align center

    .file-options
        width 30px

        .drop-down
            width 30px
</style>