<template>
    <div>
        <CHeader class="header">
            <CImg
                    class="logo"
                    :src="logoSrc"
            />
            <CHeaderNav class="d-md-down-none mr-auto">
                <CHeaderNavItem class="px-3">
                    <CHeaderNavLink to="/dashboard">
                        {{ $t('header.dash_board') }}
                    </CHeaderNavLink>
                </CHeaderNavItem>
                <CHeaderNavItem class="px-3">
                    <CHeaderNavLink to="#">
                        {{ $t('header.blog') }}
                    </CHeaderNavLink>
                </CHeaderNavItem>
                <CHeaderNavItem class="px-3">
                    <CHeaderNavLink to="#">
                        {{ $t('header.help') }}
                    </CHeaderNavLink>
                </CHeaderNavItem>
            </CHeaderNav>
            <CHeaderNav>
                <CHeaderNavItem class="px-3">
                    <CDropdown
                            color="link"
                            :toggler-text="getCurrentLocale()"
                            class="m-2"
                            :in-nav="true"
                    >
                        <CDropdownItem v-for="(item,index) in locale" :key="index" @click="setLocale(item.name)">{{
                            item.text }}
                        </CDropdownItem>
                    </CDropdown>
                </CHeaderNavItem>
                <TheHeaderDropdownAccount v-if="userInfo.id"/>
                <div @click="$router.push('/user/login')" class="login" v-if="!userInfo.id">Login</div>
                <CHeaderNavItem class="px-3">
                    <button
                            v-if="userInfo.id"
                            in-header
                            class="c-header-nav-btn"
                            @click="$store.commit('toggle', 'asideShow')"
                    >
                        <CIcon size="lg" name="cil-applications-settings" class="mr-2"/>
                    </button>
                </CHeaderNavItem>
            </CHeaderNav>
        </CHeader>
        <div class="file" v-if="driveShare">
            <div class="box">
                <div class="info">
                    <div class="title">
                        <div class="name">{{ driveShare.userFile.fullName[driveShare.userFile.fullName.length - 1] }}
                        </div>
                        <CButton class="btn btn-outline-info" @click="download"
                        >Download
                        </CButton>
                        <CButton class="btn btn-outline-danger"
                        >举报
                        </CButton>
                    </div>
                    <div class="time">分享时间：2020年4月31日 7天后过期 {{ driveShare.expiredAt }}</div>
                    <hr/>
                    <div class="show">
                        <div class="img">
                            <img :src="fileImg" width="130"/>
                        </div>
                        <div class="preview">
                            <CButton class="btn btn-outline-warning" @click="preview"
                            >开通超级奢华土豪金会员既可在线预览
                            </CButton>
                        </div>
                    </div>
                </div>
                <div class="user">
                    <div class="avatar"></div>
                    <div class="name">{{ driveShare.user.username }}</div>
                </div>
            </div>
        </div>
        <div class="code" v-if="!driveShare">
            <div class="box">
                <div style="flex: 1;margin-right: 20px">
                    <CInput label="请输入提取码：" :value.sync="code"></CInput>
                </div>
                <div style="margin-top: 30px">
                    <button type="button" class="btn btn-success" @click="getFile">
                        提取文件
                    </button>
                </div>
            </div>
        </div>
        <pdf-view v-if="pdfShow" :url="pdfUrl" @onClose="onPdfClose"></pdf-view>
        <viewer style="display: none" :images="images" ref="viewer" @inited="inited" v-if="showImagePreview">
            <template slot-scope="scope">
                <img v-for="(src,i) in scope.images" :src="src" :key="i" alt="">
            </template>
        </viewer>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import TheHeaderDropdownAccount from '@/containers/TheHeaderDropdownAccount.vue'
    import {UserModule} from '@/store/UserModule'
    // eslint-disable-next-line no-unused-vars
    import {DriveUserShare, File, FileType} from '@/store/model/File'
    import {DriveModule} from '@/store/DriveModule'
    import {CommonModule} from '@/store/CommonModule'
    import PdfComponent from '@/views/drive/PdfComponent.vue'
    import pdfView from './PdfComponent.vue'
    import 'viewerjs/dist/viewer.css'
    import Viewer from 'v-viewer/src/component.vue'
    import {ToastColor} from '@/store/model/Toast'


    @Component({
        components: {PdfComponent, TheHeaderDropdownAccount, pdfView, Viewer}
    })
    export default class Share extends Vue {

        driveShare: DriveUserShare | null = null
        uri = ''
        code = ''
        pdfShow = false
        showImagePreview = false
        pdfUrl = ''
        images: string[] = []
        viewer: any


        locale = [
            {name: 'en', text: 'English'},
            {name: 'zh', text: '简体中文'},
        ]

        mounted() {
            let paths = this.$route.fullPath.split('/')
            paths.shift()
            paths.shift()
            this.uri = paths[0]
            let code = localStorage.getItem(this.uri)
            if (code) {
                this.code = code
                this.getFile()
            }
        }

        inited(viewer: any) {
            console.log('inited', viewer)
            this.viewer = viewer
        }

        download() {
            location.href = File.getDownloadUrl(this.driveShare!.userFile, this.driveShare?.token, this.driveShare?.user.id)
        }

        preview() {
            let type = File.getType(this.driveShare!.userFile.fullName!.join('/'))
            let previewUrl = File.getPreviewUrl(this.driveShare!.userFile, this.driveShare?.token, this.driveShare?.user.id)
            switch (type) {
                case FileType.PDF:
                    this.pdfUrl = previewUrl
                    this.pdfShow = true
                    break
                case FileType.IMG:
                    if (!this.showImagePreview) {
                        this.images[0] = previewUrl
                        this.showImagePreview = true
                        setTimeout(() => {
                            this.viewer.show()
                        }, 300)
                    }
                    break
                default:
            }

        }

        getFile() {
            DriveModule.findShare({
                code: this.code,
                uri : this.uri
            }).then(res => {
                let data = res.data.driveFindShare
                if (!data) {
                    CommonModule.toast({content: '密码错误',color: ToastColor.DANGER})
                    return
                }
                this.driveShare = data
                localStorage.setItem(this.uri, this.code)
            }).catch(() => {
                CommonModule.toast({content: '密码错误',color: ToastColor.DANGER})
            })
        }

        onPdfClose() {
            this.pdfShow = false
        }

        getCurrentLocale() {
            let currentLocale = localStorage.getItem('locale')

            let text = 'English'

            this.locale.map(item => {
                if (item.name == currentLocale) {
                    text = item.text
                }
            })

            return text
        }

        setLocale(locale: string) {
            localStorage.setItem('locale', locale)
            this.$router.go(0)
        }

        get fileImg() {
            return this.driveShare ? File.getImg(File.getType(this.driveShare.userFile.fullName!.join('/'))) : ''
        }

        get minimize(): boolean {
            return this.$store.state.sidebarMinimize
        }

        get darkMode(): boolean {
            return this.$store.state.darkMode
        }

        get userInfo() {
            return UserModule.userInfo
        }

        get logoSrc(): string {
            if (this.minimize) {
                if (this.darkMode) {
                    return require<string>('@/assets/images/logo-mini-dark.png')
                } else {
                    return require<string>('@/assets/images/logo-mini.png')
                }
            } else {
                if (this.darkMode) {
                    return require<string>('@/assets/images/logo-dark.png')
                } else {
                    return require<string>('@/assets/images/logo.png')
                }
            }
        }

    }
</script>

<style lang="stylus" scoped>
    .header
        .logo
            height 40px
            margin-left 10px
            margin-top 6px

        .login
            cursor pointer

    .file
        padding-top 100px

        .box
            display flex
            width 80%
            margin 0 auto

            .info
                background white
                height 500px
                flex 1
                margin 10px
                box-shadow 1px 1px 5px #CCCCCC
                border-radius 5px

                .title
                    margin 20px
                    display flex

                    .name
                        flex 1
                        font-size 25px

                    .btn
                        margin-left 5px

                .time
                    margin-left 20px
                    color #999999
                    font-size 13px

                .show
                    .img
                        margin 0 auto
                        width 150px
                        margin-top 100px

                    .preview
                        text-align center
                        margin-top 50px

            .user
                margin 10px
                background white
                width 250px
                height 300px
                box-shadow 1px 1px 5px #CCCCCC
                border-radius 5px

                .avatar
                    width 80px
                    height 80px
                    border-radius 50%
                    border 1px solid #E4E5E6
                    margin 0 auto
                    margin-top 30px

                .name
                    margin-top 10px
                    text-align center

    .code
        padding-top 200px

        .box
            background white
            width 400px
            margin 0 auto
            box-shadow 1px 1px 5px #CCCCCC
            border-radius 5px
            padding 70px 40px
            justify-content space-between
            display flex
</style>