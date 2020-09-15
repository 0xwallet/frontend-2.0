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
        <div class="file">
            <div class="box">
                <div class="info">
                    <div class="title">
                        <div class="name">文件名</div>
                        <CButton class="btn btn-outline-info"
                        >Download
                        </CButton>
                        <CButton class="btn btn-outline-danger"
                        >举报
                        </CButton>
                    </div>
                    <div class="time">分享时间：2020年4月31日 7天后过期</div>
                    <hr/>
                    <div>

                    </div>
                </div>
                <div class="user">
                    <div class="avatar"></div>
                    <div class="name">这里是用户名</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import TheHeaderDropdownAccount from '@/containers/TheHeaderDropdownAccount.vue'
    import {UserModule} from '@/store/UserModule'

    @Component({
        components: {TheHeaderDropdownAccount}
    })
    export default class Share extends Vue {

        locale = [
            {name: 'en', text: 'English'},
            {name: 'zh', text: '简体中文'},
        ]

        mounted() {
            let paths = this.$route.fullPath.split('/')
            paths.shift()
            paths.shift()
            let fileId = paths[0]
            console.log(fileId)
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
</style>