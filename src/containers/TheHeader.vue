<template>
    <CHeader with-subheader>
        <CToggler
                in-header
                class="ml-3 d-lg-none"
                @click="$store.commit('toggleSidebarMobile')"
        />
        <CToggler
                in-header
                class="ml-3 d-md-down-none"
                @click="$store.commit('toggleSidebarDesktop')"
        />
        <CHeaderBrand
                class="mx-auto d-lg-none"
                src="img/brand/coreui-vue-pro-logo.svg"
                width="190"
                height="46"
                alt="CoreUI Logo"
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
            <CHeaderNavItem class="px-3">
                <button
                        @click="() => $store.commit('toggle', 'darkMode')"
                        class="c-header-nav-btn"
                >
                    <CIcon v-if="$store.state.darkMode" name="cil-sun"/>
                    <CIcon v-else name="cil-moon"/>
                </button>
            </CHeaderNavItem>
            <TheHeaderDropdownAccount/>
            <CHeaderNavItem class="px-3">
                <button
                        in-header
                        class="c-header-nav-btn"
                        @click="$store.commit('toggle', 'asideShow')"
                >
                    <CIcon size="lg" name="cil-applications-settings" class="mr-2"/>
                </button>
            </CHeaderNavItem>
        </CHeaderNav>

        <CSubheader class="px-3">
            <CHeaderNav class="d-md-down-none mr-auto">
                <MyCBreadcrumbRouter class="border-0 mb-0 d-md-down-none mr-auto"/>
            </CHeaderNav>
            <CHeaderNav>
                <CHeaderNavLink>
                    <div @click="showMessageModal" ref="msgIcon">
                        <CIcon name="cil-speech"></CIcon>
                    </div>
                </CHeaderNavLink>
                <CHeaderNavLink to="/dashboard">
                    <CIcon name="cil-graph"></CIcon>
                    Dashboard
                </CHeaderNavLink>
                <CHeaderNavLink to="#" exact>
                    <CIcon name="cil-settings"></CIcon>
                    Setting
                </CHeaderNavLink>
            </CHeaderNav>
        </CSubheader>
    </CHeader>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import TheHeaderDropdownAccount from '@/containers/TheHeaderDropdownAccount.vue'
    import MyCBreadcrumbRouter from '@/components/MyCBreadcrumbRouter.vue'
    import {MessageModule} from '@/store/MessageModule'

    @Component({
        components: {TheHeaderDropdownAccount, MyCBreadcrumbRouter}
    })
    export default class TheHeader extends Vue {

        locale = [
            {name: 'en', text: 'English'},
            {name: 'zh', text: '简体中文'},
        ]

        showMessageModal() {
            const {msgIcon} = this.$refs
            MessageModule.setMsgIcon(msgIcon)
            MessageModule.getMsgIconLeftAndTop()
            MessageModule.showMessageModal(true)
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


    }
</script>
