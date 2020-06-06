<template>
    <CSidebar
            :minimize="minimize"
            unfoldable
            :show="show"
            @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
    >
        <CSidebarBrand :class="{'c-sidebar-brand-dark' : darkMode}" to="/">
            <c-img :class="[minimize ? 'logo-mini' : 'logo']" :src="logoSrc" alt="logo"/>
        </CSidebarBrand>
        <CRenderFunction flat :contentToRender="nav"/>
        <CSidebarMinimizer
                class="c-d-md-down-none"
                @click.native="$store.commit('toggle', 'sidebarMinimize')"
        />
    </CSidebar>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {nav} from './_nav'
    import Component from "vue-class-component"

    // declare interface dataInterface {
    //     nav: typeof nav
    // }

    @Component
    export default class TheSidebar extends Vue {

        nav = nav

        /**
         * 为
         */
        get show(): string | boolean {
            return this.$store.state.sidebarShow
        }

        get minimize(): boolean {
            return this.$store.state.sidebarMinimize
        }

        get darkMode(): boolean {
            return this.$store.state.darkMode
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
    .c-sidebar-brand
        background #fff !important
        height 56px

        &-dark
            background #2c2c34 !important

        .logo
            height 40px

        .logo-mini
            height 30px
</style>
