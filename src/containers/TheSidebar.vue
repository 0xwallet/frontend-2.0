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
        <CSidebarNav>
            <CSidebarNavItem :name="$i18n.t('nav.dashboard')" to="/dashboard" icon="cil-speedometer"></CSidebarNavItem>
            <CSidebarNavTitle>{{ $i18n.t('nav.token') }}</CSidebarNavTitle>
            <CSidebarNavItem :name="$i18n.t('nav.issuer')" icon="cil-bank"></CSidebarNavItem>
            <CSidebarNavItem :name="$i18n.t('nav.management')" icon="cil-bank"></CSidebarNavItem>
            <CSidebarNavItem :name="$i18n.t('nav.wallet')" icon="cil-wallet"></CSidebarNavItem>
            <CSidebarNavTitle>{{ $i18n.t('nav.contact') }}</CSidebarNavTitle>
            <CSidebarNavItem :name="$i18n.t('nav.organizations')" icon="cil-sitemap" to="/organization"></CSidebarNavItem>
            <CSidebarNavItem :name="$i18n.t('nav.clients')" icon="cil-people"></CSidebarNavItem>
            <CSidebarNavItem :name="$i18n.t('nav.general')" icon="cil-address-book"></CSidebarNavItem>
            <CSidebarNavTitle>{{ $i18n.t('nav.history') }}</CSidebarNavTitle>
            <CSidebarNavItem :name="$i18n.t('nav.payments')" icon="cil-credit-card"></CSidebarNavItem>
            <CSidebarNavItem :name="$i18n.t('nav.settlement')" icon="cil-layers"></CSidebarNavItem>
            <CSidebarNavItem :name="$i18n.t('nav.activity')" icon="cil-flag-alt"></CSidebarNavItem>
            <CSidebarNavTitle>{{ $i18n.t('nav.general') }}</CSidebarNavTitle>
            <CSidebarNavItem :name="$i18n.t('nav.account')" icon="cil-at" to="/account"></CSidebarNavItem>
            <CSidebarNavItem :name="$i18n.t('nav.security')" icon="cil-shield-alt" to="/security"></CSidebarNavItem>
            <CSidebarNavItem :name="$i18n.t('nav.blockchain')" icon="cil-speedometer" to="/drive"></CSidebarNavItem>
            <CSidebarNavTitle>{{ $i18n.t('nav.account_type') }}</CSidebarNavTitle>
            <CSidebarNavItem :name="$i18n.t('nav.basic')" :icon="{
                    name : 'cil-circle',
                    class: 'text-info'
                }" ></CSidebarNavItem>
            <CSidebarNavItem :name="$i18n.t('nav.issuer')" :icon="{
                    name : 'cil-circle',
                    class: 'text-warning'
                }"></CSidebarNavItem>
            <CSidebarNavTitle>{{ $i18n.t('nav.system_utilization') }}</CSidebarNavTitle>
            <CSidebarNavItem>
                <div class="utilization">
                    <system-utilization-component></system-utilization-component>
                </div>
            </CSidebarNavItem>
        </CSidebarNav>
        <CSidebarMinimizer
                class="c-d-md-down-none"
                @click.native="$store.commit('toggle', 'sidebarMinimize')"
        />
    </CSidebar>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import SystemUtilizationComponent from '@/components/SystemUtilizationComponent.vue'
    @Component({
        components: {SystemUtilizationComponent}
    })
    export default class TheSidebar extends Vue {

        mounted() {

        }

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
    .utilization
        padding 0 20px 10px 20px
</style>
