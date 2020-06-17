<template>
    <div>
        <CRow v-if="!pageLoading">
            <CCol sm="12">
                <div class="user-info">
                    <div style="text-align: center;">
                        <c-img width="100" height="100" :src="userInfo.avatar || defaultAvatar"></c-img>
                        <div class="user-name">{{ userInfo.username }}</div>
                        <div class="email">{{ userInfo.email }}</div>
                        <div class="last-login-at">LastLoginAt: {{ formatDate(userInfo.lastLoginAt)}}</div>
                    </div>
                </div>
            </CCol>
            <CCol sm="6">
                <CCard>
                    <CCardHeader>
                        Message
                    </CCardHeader>
                    <CCardBody>
                        <div>messageNknAddress: {{ userInfo.messageNknAddress }}</div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CElementCover v-if="pageLoading"/>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component"
    import {UserModule} from "@/store/UserModule"
    import {formatDate} from "@/common/DateUtil"
    import {CommonModule} from "@/store/CommonModule"

    @Component
    export default class Account extends Vue {

        defaultAvatar = require('@/assets/images/default-avatar.png')

        mounted() {
            setTimeout(() => {
                CommonModule.hidePageLoading()
            }, 1000)
        }

        get userInfo() {
            return UserModule.userInfo
        }

        formatDate(dateString: string) {
            return formatDate(dateString)
        }

        get pageLoading() {
            return CommonModule.pageLoading
        }
    }
</script>

<style lang="stylus" scoped>
    .user-info
        margin-bottom 20px

        .c-img
            margin-left auto
            margin-right auto

        .user-name
            font-size 24px
</style>