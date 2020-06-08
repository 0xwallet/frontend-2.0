<template>
    <div>
        <transition name="fade">
            <router-view v-show="!globalLoading"></router-view>
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
                        header="提示"
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

    @Component
    export default class App extends Vue {

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