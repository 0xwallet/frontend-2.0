<template>
    <div>
        <CRow v-if="!pageLoading">
            <CCol col="6" class="left">
                <AccountProfile></AccountProfile>
            </CCol>
            <CCol col="6">
                sss
            </CCol>
        </CRow>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {UserModule} from '@/store/UserModule'
    import {formatDate} from '@/common/DateUtil'
    import {CommonModule} from '@/store/CommonModule'
    import AccountProfile from '@/views/Account/AccountProfile.vue'
    @Component({
        components: {AccountProfile}
    })
    export default class Account extends Vue {

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

</style>