<template>
    <div>
        <CCard class="credit-card">
            <CCardHeader class="header">Credit Card
                <CSwitch
                        class="float-right"
                        variant="3d"
                        size="sm"
                        shape="pill"
                        color="info"
                        data-on="on"
                        data-off="Off"
                        :checked="edit"
                        @update:checked="changeEdit"
                />
            </CCardHeader>
            <CCardBody class="body">
                <div class="bottom-right"></div>
                <div>
                    <CRow>
                        <CCol sm="12">
                            <CInput
                                    :disabled="!edit"
                                    label="Name"
                                    placeholder="Enter your name"
                                    :value.sync="form.name"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm="12">
                            <CInput
                                    :disabled="!edit"
                                    label="Credit Card Number"
                                    placeholder="0000 0000 0000 0000"
                                    :value.sync="form.creditCardNumber"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm="4">
                            <CSelect
                                    :disabled="!edit"
                                    label="Month"
                                    :options="[1,2,3,4,5,6,7,8,9,10,11,12]"
                                    :value.sync="form.month"
                            />
                        </CCol>
                        <CCol sm="4">
                            <CSelect
                                    :disabled="!edit"
                                    label="Year"
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
            </CCardBody>
        </CCard>
        <CheckEmailComponent ref="checkEmail" @commit="commit" @onHide="onHide"></CheckEmailComponent>
    </div>
</template>

<script lang="ts">

    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {UserModule} from '@/store/UserModule'
    import CheckEmailComponent from '@/components/CheckEmailComponent.vue'

    @Component({
        components: {CheckEmailComponent}
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

        changeEdit(checked: boolean) {
            this.edit = checked
            if (!this.edit) {
                this.$refs.checkEmail.showModal()
            }
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
            }).then(() => {
                UserModule.me().then(() => {
                    this.$router.go(0)
                })
            })
            this.edit = false
        }

        onHide() {
            // UserModule.me().then(() => {
            //     this.$router.go(0)
            // })
        }
    }
</script>

<style lang="stylus" scoped>
    .credit-card
        border-left 8px solid rgb(79, 116, 238) !important
        box-shadow 2px 2px 5px #BBBBBB !important
        border-radius 10px

        .bottom-right
            height 23px
            width 23px
            background rgb(79, 116, 238)
            right 0
            bottom 0
            position absolute
            border-bottom-right-radius 10px
            border-top-left-radius 6px

        .header
            border-top-right-radius 10px
            border-top-left-radius 10px
            padding-left 40px !important
            font-size 20px
</style>