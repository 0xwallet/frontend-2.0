<template>
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
                                label="Name"
                                placeholder="Enter your name"
                                :value.sync="form.name"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="12">
                        <CInput
                                label="Credit Card Number"
                                placeholder="0000 0000 0000 0000"
                                :value.sync="form.creditCardNumber"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="4">
                        <CSelect
                                label="Month"
                                :options="[1,2,3,4,5,6,7,8,9,10,11,12]"
                                :value.sync="form.month"
                        />
                    </CCol>
                    <CCol sm="4">
                        <CSelect
                                label="Year"
                                :options="[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]"
                                :value.sync="form.year"
                        />
                    </CCol>
                    <CCol sm="4">
                        <CInput
                                label="CVV/CVC"
                                placeholder=""
                                :value.sync="form.cvv"
                        />
                    </CCol>
                </CRow>
            </div>
        </CCardBody>
    </CCard>
</template>

<script lang="ts">

    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'


    @Component
    export default class AccountCreditCard extends Vue {
        edit = false

        form = {
            name            : '',
            creditCardNumber: '',
            month           : '1',
            year            : '2014',
            cvv             : ''
        }

        changeEdit(checked: boolean) {
            this.edit = checked
            CommonModule.toast(JSON.stringify(this.form))
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