<template>
    <div>
        <main-card-component :title="''">
            <div slot="left" style="float: left;font-size: 16px;margin-right: 20px;margin-top: 5px"
                 @mousemove="txIDOver" @mouseout="txIDOut">
                <div style="display: flex;">
                    <div>
                        {{ this.$route.params.txId.split(".")[this.$route.params.txId.split(".").length-1] }}
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
                <CButton class="btn" @click="checkAllFiles">{{ checkFiles.length === files.length ? 'Inverse' : 'Check All' }}
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

            <div style="margin-top: 10px" class="files">
                <div class="name">
                    Name
                </div>
                <div class="hash" style="margin-left: 60px">
                    Hash
                </div>
                <div class="size" style="margin-right: 30px">
                    Size
                </div>
                <div class="time" style="width: 130px">
                    Time
                </div>
            </div>
            <div>
                <div v-for="(file,index) in files" :key="index" class="files" @mouseenter="mouseOver(file)"
                     @mouseleave="mouseOut(file)">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" name="checkFile" v-model="checkFiles" :value="file.txId">
                        </label>
                    </div>
                    <div class="name">
                        <div class="image-box">
                            <CImg class="image"
                                  :src="file.getImg()"></CImg>
                        </div>
                        <div class="text">{{ file.name }}</div>
                    </div>
                    <div class="hash" style="margin-top: 10px" v-if="file.type !== 4">

                        <hash-component :hash="file.hash" :active="false"></hash-component>
                        <div style="margin-top: -1px;margin-left: 5px;">
                            <CIcon name="cil-copy"></CIcon>
                        </div>
                    </div>
                    <div class="option" v-if="file.active && file.type !== 4">
                        <div>
                            <CIcon v-c-tooltip.hover="'share'" name="cil-share-alt" v-if="file.active"></CIcon>
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

                    <div class="size" style="margin-top: 10px" >{{ file.getSize() }}</div>
                    <div class="time" style="margin-top: 10px" >
                        <code>
                            {{ file.time }}
                        </code>
                    </div>
                    <div class="action" style="margin-top: 10px" >
                        <CIcon name="cil-options"></CIcon>
                    </div>
                </div>
            </div>
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

            // file = new File()
            // file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3631'
            // file.name = 'Blog'
            // file.type = FileType.DIR
            // file.parentId = null
            // file.hash = '9FE22AF7C170F934C5E1018D6BAB36606D1B23DFF6AB91F03DB1DC3D6FA895B4'
            // file.size = 44422
            // file.time = '2020-07-15 13:33:21'
            // this.files.push(file)
            //
            // file = new File()
            // file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3632'
            // file.name = 'Pictures'
            // file.type = FileType.DIR
            // file.parentId = null
            // file.hash = '512448EBF0349DF8E1D38B721F1B688A85048968AE9E5C32BBD6EF78890D0D53'
            // file.size = 3000
            // file.time = '2020-07-15 13:33:21'
            // this.files.push(file)
            //
            // file = new File()
            // file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3633'
            // file.name = 'README.md'
            // file.type = FileType.MD
            // file.parentId = null
            // file.hash = 'BC3D82F837959B8945F9812A37B33BE417BF2B017FE15D6A6C0E61180A71E3A2'
            // file.size = 3552
            // file.time = '2020-07-15 13:33:21'
            // this.files.push(file)
            //
            //
            // file = new File()
            // file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3634'
            // file.name = 'white_paper.pdf'
            // file.type = FileType.PDF
            // file.parentId = null
            // file.hash = 'E57F71627218E3471A48228F256238EC1C23361126DEC3098CEB3A300F979E9A'
            // file.size = 4222
            // file.time = '2020-07-15 13:33:21'
            // this.files.push(file)

            // file = new File()
            // file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3631'
            // file.name = 'Life'
            // file.type = FileType.DIR
            // file.parentId = null
            // file.hash = '9FE22AF7C170F934C5E1018D6BAB36606D1B23DFF6AB91F03DB1DC3D6FA895B4'
            // file.size = 30000
            // file.time = '2020-07-15 13:33:21'
            // this.files.push(file)
            //
            // file = new File()
            // file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3632'
            // file.name = 'Ideas'
            // file.type = FileType.DIR
            // file.parentId = null
            // file.hash = '512448EBF0349DF8E1D38B721F1B688A85048968AE9E5C32BBD6EF78890D0D53'
            // file.size = 14422
            // file.time = '2020-07-15 13:33:21'
            // this.files.push(file)

            // file = new File()
            // file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3631'
            // file.name = 'MetaNet'
            // file.type = FileType.DIR
            // file.parentId = null
            // file.hash = '9FE22AF7C170F934C5E1018D6BAB36606D1B23DFF6AB91F03DB1DC3D6FA895B4'
            // file.size = 52496
            // file.time = '2020-07-15 13:33:21'
            // this.files.push(file)
            // file = new File()
            // file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3632'
            // file.name = 'Personal'
            // file.type = FileType.PERSON
            // file.parentId = null
            // file.hash = '512448EBF0349DF8E1D38B721F1B688A85048968AE9E5C32BBD6EF78890D0D53'
            // file.size = 65332
            // file.time = '2020-07-15 13:33:21'
            // this.files.push(file)
            // file = new File()
            // file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3631'
            // file.name = 'Private'
            // file.type = FileType.LOCK
            // file.parentId = null
            // file.hash = '9FE22AF7C170F934C5E1018D6BAB36606D1B23DFF6AB91F03DB1DC3D6FA895B4'
            // file.size = 73542
            // file.time = '2020-07-15 13:33:21'
            // this.files.push(file)

            file = new File()
            file.txId = 'be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d13f2db32e432db3634'
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

    .files
        display flex

        .checkbox
            margin-top 12px
            margin-right 10px

        .name
            width 80%
            flex 5
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

        .hash
            flex 1
            width 10%
            display flex

        .option
            margin-top 10px
            display flex
            position  absolute
            left 55%

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

        .action
            margin-left 10px

</style>