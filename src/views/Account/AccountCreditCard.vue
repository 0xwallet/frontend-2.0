<template>
    <div>
        <main-card-component :title="$t('account.credit_card.credit_card')"
                             @onOpen="onOpen"
                             @onClose="onClose"
                             class="credit-card"
        >
            <div>
                <CRow>
                    <CCol sm="12">
                        <CInput
                                :disabled="!edit"
                                :label="$t('account.credit_card.name')"
                                placeholder="Enter your name"
                                :value.sync="form.name"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="12">
                        <CInput
                                :disabled="!edit"
                                :label="$t('account.credit_card.credit_card_number')"
                                placeholder="0000 0000 0000 0000"
                                :value.sync="form.creditCardNumber"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="4">
                        <CSelect
                                :disabled="!edit"
                                :label="$t('account.credit_card.month')"
                                :options="[1,2,3,4,5,6,7,8,9,10,11,12]"
                                :value.sync="form.month"
                        />
                    </CCol>
                    <CCol sm="4">
                        <CSelect
                                :disabled="!edit"
                                :label="$t('account.credit_card.year')"
                                :options="[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]"
                                :value.sync="form.year"
                        />
                    </CCol>
                    <CCol sm="4">
                        <CInput
                                :disabled="!edit"
                                label="CVV/CVC"
                                placeholder="CVV/CVC"
                                :value.sync="form.cvv"
                        />
                    </CCol>
                </CRow>
            </div>
        </main-card-component>
        <CheckEmailComponent ref="checkEmail" @commit="commit" @onHide="onHide"></CheckEmailComponent>
    </div>
</template>

<script lang="ts">

    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {UserModule} from '@/store/UserModule'
    import CheckEmailComponent from '@/components/CheckEmailComponent.vue'
    import MainCardComponent from '@/components/MainCardComponent.vue'

    @Component({
        components: {MainCardComponent, CheckEmailComponent}
    })
    export default class AccountCreditCard extends Vue {
        $refs !: {
            checkEmail: CheckEmailComponent
        }

        edit = false

        form = {
            name            : this.userInfo.personalInfo?.creditCard?.name || '',
            creditCardNumber: this.userInfo.personalInfo?.creditCard?.number || '',
            month           : Number(this.userInfo.personalInfo?.creditCard?.month) || 1,
            year            : Number(this.userInfo.personalInfo?.creditCard?.year) || 2014,
            cvv             : this.userInfo.personalInfo?.creditCard?.securityCode || '',
        }

        onClose() {
            this.edit = false
            this.$refs.checkEmail.showModal()
        }

        onOpen() {
            this.edit = true
        }


        get userInfo() {
            return UserModule.userInfo
        }

        commit(code: string) {
            UserModule.editCurrentUser({
                code        : code,
                personalInfo: {
                    creditCard: {
                        month       : String(this.form.month),
                        name        : this.form.name,
                        number      : String(this.form.creditCardNumber),
                        securityCode: this.form.cvv,
                        year        : String(this.form.year),
                    }
                }
            })
            this.edit = false
        }

        onHide() {
        }
    }
</script>

<style lang="stylus" scoped>

</style>