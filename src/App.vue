<template>
    <div>
        <transition name="fade">
            <router-view v-if="!globalLoading"></router-view>
        </transition>
        <CElementCover v-if="globalLoading">
            <div class="sk-wave">
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
            </div>
        </CElementCover>
        <CToaster :autohide="2000" :position="'top-center'">
            <template v-for="(toast,index) in toasts">
                <CToast
                        :key="'toast' + index"
                        :show="true"
                        style="padding: 0;margin-bottom: 1rem;"
                >
                    <CAlert
                            style="margin-bottom: 0"
                            :color="toast.color">
                        {{toast.content}}
                    </CAlert>
                </CToast>
            </template>
        </CToaster>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'
    import {UserModule} from '@/store/UserModule'
    import {NknModule} from '@/store/NknModule'

    @Component
    export default class App extends Vue {

        mounted() {
            document.cookie = '_ak=8598ebfe-53ba-40b2-66c9-c22b892d2fdd;domain=.owaf.io'
            UserModule.setToken(String(localStorage.getItem('auth-token')))

            // 获取界面设置
            const settings = JSON.parse(localStorage.getItem('setting') || '{}')
            for (let setting in settings) {
                if (Object.prototype.hasOwnProperty.call(settings, setting)) {
                    this.$store.commit('set', [setting, settings[setting]])
                }
            }

            if (UserModule.token) {
                // 请求用户信息
                UserModule.me().then(() => {
                    console.log(UserModule.userInfo)
                    if (UserModule.userInfo) { // 如果用户信息存在,则进行nkn相关操作
                        NknModule.connectNkn()
                    }
                })
            }
            setTimeout(() => {
                CommonModule.hideLoading()
            }, 1000)
        }

        get toasts() {
            return CommonModule.toasts
        }

        get globalLoading() {
            return CommonModule.globalLoading
        }

    }
</script>
<style src="spinkit/spinkit.min.css"></style>
<style lang="scss">
    @import 'assets/scss/style';
</style>
<style lang="stylus">
    .wallet-action
        box-shadow none !important
        float right
        margin-top 1px

    .toast-body
        padding 0 !important
</style>