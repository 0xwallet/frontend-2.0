<template>
    <div>
        <main-card-component :title="''">
            <div slot="left" style="float: left;font-size: 16px;margin-right: 20px;margin-top: 5px"
                 @mousemove="txIDOver" @mouseout="txIDOut">
                <div style="display: flex;">
                    <div>
                    </div>
                    <!--                    <div style="margin: 0 10px"> | </div>-->
                    <!--                    <div v-if="!showTxID" style="margin-top: 2px;">-->
                    <!--                        <hash-component-->
                    <!--                                :hash="'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d1232db32e432db3634'"></hash-component>-->
                    <!--                    </div>-->
                    <!--                    <div v-if="showTxID" style="font-size: 14px;margin-top: 2px;">-->
                    <!--                        be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d1232db32e432db3634-->
                    <!--                    </div>-->
                    <!--                    <div style="margin-left: 10px;margin-top: -1px">-->
                    <!--                        <CIcon name="cil-copy"></CIcon>-->
                    <!--                    </div>-->
                </div>
            </div>
            <div slot="right-action" class="float-right files-action">
                <CButton class="btn" @click="checkAllFiles">{{ checkFiles.length === files.length ? 'Inverse' : 'Check
                    All' }}
                </CButton>
                <CButton class="btn btn-info" @click="choiceFile">Upload</CButton>
                <CButton class="btn btn-success">New</CButton>
                <CButton class="btn btn-light">Refresh</CButton>
                <input type="file" ref="choiceFile" hidden @change="fileChange($event)">
            </div>

            <!--            <CProgress color="success"-->
            <!--                       show-value-->
            <!--                       :value="32"-->
            <!--                       animated-->
            <!--                       size="sm"></CProgress>-->

            <div>
                <table class="file-table">
                    <tr>
                        <th class="file-checkbox">
                            <div class="checkbox">
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
                    <tr v-for="(file,index) in files" :key="index">
                        <td class="file-checkbox">
                            <div v-if="file.type === 4" style="height: 40px"></div>
                            <div class="checkbox" v-if="file.type !== 4">
                                <label>
                                    <input type="checkbox" name="checkFile" v-model="checkFiles" :value="file.txId">
                                </label>
                            </div>
                        </td>
                        <td class="file-name">
                            <div>
                                <div class="image-box">
                                    <CImg class="image"
                                          :src="file.getImg()"></CImg>
                                </div>
                            </div>
                            <div class="text">{{ file.name }}</div>
                        </td>
                        <td class="file-option">
                            <div class="options" v-if="file.type !== 4">
                                <div>
                                    <CIcon v-c-tooltip.hover="'share'" name="cil-share-alt"></CIcon>
                                </div>
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
                        </td>
                        <td class="file-hash">
                            <div class="hash" v-if="file.type !== 4">
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
            <!--            <div style="margin-top: 10px" class="files">-->
            <!--                <div class="name">-->
            <!--                    Name-->
            <!--                </div>-->
            <!--                <div class="hash" style="margin-left: 80px">-->
            <!--                    Hash-->
            <!--                </div>-->
            <!--                <div class="size" style="margin-right: 30px">-->
            <!--                    Size-->
            <!--                </div>-->
            <!--                <div class="time" style="width: 130px">-->
            <!--                    Time-->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div>-->
            <!--                <div v-for="(file,index) in files" :key="index" class="files" @mouseenter="mouseOver(file)"-->
            <!--                     @mouseleave="mouseOut(file)">-->
            <!--                    <div class="checkbox">-->
            <!--                        <label>-->
            <!--                            <input type="checkbox" name="checkFile" v-model="checkFiles" :value="file.txId">-->
            <!--                        </label>-->
            <!--                    </div>-->
            <!--                    <div class="name">-->
            <!--                        <div class="image-box">-->
            <!--                            <CImg class="image"-->
            <!--                                  :src="file.getImg()"></CImg>-->
            <!--                        </div>-->
            <!--                        <div class="text">{{ file.name }}</div>-->
            <!--                    </div>-->

            <!--                    <div class="option" v-if="file.type !== 4">-->
            <!--                        <div>-->
            <!--                            <CIcon v-c-tooltip.hover="'share'" name="cil-share-alt"></CIcon>-->
            <!--                        </div>-->
            <!--                        <div @click="clock">-->
            <!--                            <CIcon v-c-tooltip.hover="$t('drive.files.clock')" name="cil-lock-locked"></CIcon>-->
            <!--                        </div>-->
            <!--                        <div>-->
            <!--                            <CIcon v-c-tooltip.hover="$t('drive.files.info')" name="cil-info"></CIcon>-->
            <!--                        </div>-->
            <!--                        <div>-->
            <!--                            <CIcon v-c-tooltip.hover="$t('drive.files.edit')" name="cil-pencil"></CIcon>-->
            <!--                        </div>-->
            <!--                        <div>-->
            <!--                            <CIcon v-c-tooltip.hover="$t('drive.files.copy')" name="cil-link"></CIcon>-->
            <!--                        </div>-->
            <!--                        <div>-->
            <!--                            <CIcon v-c-tooltip.hover="$t('drive.files.download')" name="cil-save"></CIcon>-->
            <!--                        </div>-->
            <!--                        <div>-->
            <!--                            <CIcon v-c-tooltip.hover="$t('drive.files.upload')" name="cil-cloud-upload"></CIcon>-->
            <!--                        </div>-->
            <!--                        <div>-->
            <!--                            <CIcon v-c-tooltip.hover="$t('drive.files.delete')" class="delete"-->
            <!--                                   name="cil-trash"></CIcon>-->
            <!--                        </div>-->
            <!--                    </div>-->

            <!--                    <div class="hash" v-if="file.type !== 4">-->

            <!--                        <hash-component :hash="file.hash" :active="false"></hash-component>-->
            <!--                        <div style="margin-top: -1px;margin-left: 5px;">-->
            <!--                            <CIcon name="cil-copy"></CIcon>-->
            <!--                        </div>-->
            <!--                    </div>-->


            <!--                    <div class="size" style="margin-top: 10px" >{{ file.getSize() }}</div>-->
            <!--                    <div class="time" style="margin-top: 10px" >-->
            <!--                        <code>-->
            <!--                            {{ file.time }}-->
            <!--                        </code>-->
            <!--                    </div>-->
            <!--                    <div class="action" style="margin-top: 10px" >-->
            <!--                        <CIcon name="cil-options"></CIcon>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
        </main-card-component>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import MainCardComponent from '../../components/MainCardComponent.vue'
    import {NknModule} from '@/store/NknModule'
    import {File, FileType} from '@/store/model/File'
    import HashComponent from '@/components/HashComponent.vue'


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
            let file = new File()
            file.txId = ''
            file.name = '..'
            file.type = FileType.UP
            file.parentId = null
            file.hash = '9FE22AF7C170F934C5E1018D6BAB36606D1B23DFF6AB91F03DB1DC3D6FA895B4'
            // file.size = 52496
            // file.size = 44422
            file.size = 73542
            file.time = '2020-07-15 13:33:21'
            this.files.push(file)

            file = new File()
            file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3634'
            file.name = 'white_paper.pdf'
            file.type = FileType.PDF
            file.parentId = null
            file.hash = 'E57F71627218E3471A48228F256238EC1C23361126DEC3098CEB3A300F979E9A'
            file.size = 73542
            file.time = '2020-07-15 13:33:21'
            this.files.push(file)

            file = new File()
            file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3635'
            file.name = 'white_paper.pdf'
            file.type = FileType.PDF
            file.parentId = null
            file.hash = 'E57F71627218E3471A48228F256238EC1C23361126DEC3098CEB3A300F979E9A'
            file.size = 73542
            file.time = '2020-07-15 13:33:21'
            this.files.push(file)

            file = new File()
            file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3636'
            file.name = 'white_paper.pdf'
            file.type = FileType.PDF
            file.parentId = null
            file.hash = 'E57F71627218E3471A48228F256238EC1C23361126DEC3098CEB3A300F979E9A'
            file.size = 73542
            file.time = '2020-07-15 13:33:21'
            this.files.push(file)
            file = new File()
            file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3637'
            file.name = 'white_paper.pdf'
            file.type = FileType.PDF
            file.parentId = null
            file.hash = 'E57F71627218E3471A48228F256238EC1C23361126DEC3098CEB3A300F979E9A'
            file.size = 73542
            file.time = '2020-07-15 13:33:21'
            this.files.push(file)

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
                    this.checkFiles.push(item.txId)
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

    }
</script>

<style lang="stylus" scoped>
    .files-action
        .btn
            margin-left 10px

    /*.files*/
    /*    display flex*/

    /*    .checkbox*/
    /*        margin-top 12px*/
    /*        margin-right 10px*/

    /*    .name*/
    /*        cursor pointer*/
    /*        width 80%*/
    /*        flex 5*/
    /*        display flex*/
    /*        line-height 40px*/

    /*        .text*/
    /*            margin-left 5px*/
    /*            margin-top 2px*/

    /*        .image-box*/
    /*            width 30px*/
    /*            height 30px*/

    /*            .image*/
    /*                width 26px*/
    /*                height 26px*/

    /*    .hash*/
    /*        flex 1*/
    /*        margin-top 13px*/
    /*        margin-right 20px*/
    /*        width 10%*/
    /*        display flex*/

    /*    .option*/
    /*        margin-top 7px*/
    /*        display flex*/
    /*        width 175px*/
    /*        margin-right 10px*/
    /*        border 1px solid black*/

    /*        div*/
    /*            margin-left 5px*/

    /*            .c-icon*/

    /*                color #888888*/

    /*            .delete*/
    /*                color #FF5533*/

    /*    .time*/
    /*        margin-left 20px*/
    /*        text-align justify*/

    /*    .size*/
    /*        width 90px*/

    /*    .action*/
    /*        margin-left 10px*/

    .file-table
        width 100%

        th:nth-child(n+3)
            text-align center

        /*tr*/
        /*    border 1px solid black*/

        /*td, th*/
        /*    border 1px solid black*/

        .file-checkbox
            width 20px

            .checkbox
                padding-top 12px

        .file-name
            .image-box
                float left

                .image
                    width 18px

            .text
                padding-top 3px

        .file-option
            width 145px
            padding 0 10px
            text-align center

            .options
                display flex

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


</style>