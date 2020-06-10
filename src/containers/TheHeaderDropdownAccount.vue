<template>
    <CDropdown
            inNav
            class="c-header-nav-items"
            placement="bottom-end"
            add-menu-classes="pt-0"
    >
        <template #toggler>
            <CHeaderNavLink>
                <div class="c-avatar">
                    <img :src="defaultAvatar" class="c-avatar-img"/>
                </div>
            </CHeaderNavLink>
        </template>
        <CDropdownHeader tag="div" class="text-center" color="light">
            <strong>{{ userInfo.username || null }}</strong>
        </CDropdownHeader>
        <CDropdownItem>
            <CIcon name="cil-bell"/>
            Updates
            <CBadge color="info" class="ml-auto">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownItem>
            <CIcon name="cil-envelope-open"/>
            Messages
            <CBadge color="success" class="ml-auto">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownItem>
            <CIcon name="cil-task"/>
            Tasks
            <CBadge color="danger" class="ml-auto">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownItem>
            <CIcon name="cil-comment-square"/>
            Comments
            <CBadge color="warning" class="ml-auto">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownHeader
                tag="div"
                class="text-center"
                color="light"
        >
            <strong>Account</strong>
        </CDropdownHeader>
        <CDropdownItem>
            <CIcon name="cil-user"/>
            Profile
        </CDropdownItem>
        <CDropdownItem>
            <CIcon name="cil-settings"/>
            Settings
        </CDropdownItem>
        <CDropdownItem>
            <CIcon name="cil-dollar"/>
            Reports
            <CBadge color="secondary" class="ml-auto">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownItem>
            <CIcon name="cil-file"/>
            Upgrade
            <CBadge color="primary" class="ml-auto">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownDivider/>
        <CDropdownItem>
            <CIcon name="cil-lock-locked"/>
            Logout
        </CDropdownItem>
    </CDropdown>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component"
    import {UserModule} from "@/store/UserModule"

    @Component
    export default class TheHeaderDropdownAccount extends Vue {
        itemsCount = 42

        get userInfo() {
            return UserModule.userInfo
        }

        defaultAvatar = require('@/assets/images/default-avatar.png')
    }
</script>

<style lang="stylus" scoped>
    .c-icon {
        margin-right: 0.3rem;
    }
</style>