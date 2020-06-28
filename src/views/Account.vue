<template>
    <div>
        <CRow v-if="!pageLoading">
            <CCol xl="6"  class="left">
                <AccountProfile></AccountProfile>
            </CCol>
            <CCol xl="6">
                <AccountCreditCard></AccountCreditCard>
                <AccountApps></AccountApps>
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
    import AccountCreditCard from '@/views/Account/AccountCreditCard.vue'
    import AccountApps from '@/views/Account/AccountApps.vue'

    @Component({
        components: {AccountApps, AccountCreditCard, AccountProfile}
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