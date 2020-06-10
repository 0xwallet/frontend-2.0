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
        <CToaster :autohide="3000">
            <template v-for="(toast,index) in toast">
                <CToast
                        :key="'toast' + index"
                        :show="true"
                        header="Message"
                >
                    {{toast}}
                </CToast>
            </template>
        </CToaster>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component"
    import {CommonModule} from "@/store/CommonModule"
    import {UserModule} from "@/store/UserModule"

    @Component
    export default class App extends Vue {

        mounted() {
            UserModule.setToken(String(localStorage.getItem('auth-token')))

            if (UserModule.token == 'null') {
                this.$router.push('/login')
            }

            // 请求用户信息
            UserModule.me().then(() => {
                CommonModule.hideLoading()
            })
        }

        get toast() {
            return CommonModule.toasts
        }

        get globalLoading() {
            return CommonModule.globalLoading
        }

    }
</script>
<style src="spinkit/spinkit.min.css"></style>
<style lang="scss">
    // Import Main styles for this application
    @import 'assets/scss/style';
</style>