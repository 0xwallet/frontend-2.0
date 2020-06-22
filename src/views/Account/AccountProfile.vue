<template>
    <CCard class="profile">
        <CCardHeader class="header">Profile
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
            <div class="avatar-name">
                <CImg class="avatar" :src="userInfo.avatar || defaultAvatar"></CImg>
                <div class="name">{{ userInfo.username }}</div>
                <div class="clearfix"></div>
            </div>
            <div class="exchange-rate">
                <div class="flag">
                    <CIcon name="cif-us" height="50" width="50"></CIcon>
                </div>
                <div class="info">1 BSV = 254.23 USD</div>
                <div class="clearfix"></div>
            </div>
            <div class="address">
                <div class="how">
                    <CImg class="icon" :src="require('@/assets/images/icon/icon-info.png')"></CImg>
                    <div class="info"><i>How <strong>D-Chat</strong> works</i></div>
                    <div class="clearfix"></div>
                </div>
                <div class="card">
                    <div class="left"></div>
                    <div class="mid">
                        <div class="public">
                            {{ userInfo.messageNknAddress }}
                        </div>
                        <div @click="copy"
                             class="copy"
                             :data-clipboard-text="userInfo.messageNknAddress">
                            <CIcon
                                    name="cil-copy"
                                    v-c-tooltip.hover.click="'Copy Public Key'"/>
                        </div>
                        <div class="pub-name">
                            <CImg class="icon" :src="require('@/assets/images/icon/icon-ok.png')"></CImg>
                            <i class="white-text">
                                Primary
                            </i>
                            <i>
                                NKN Pubkey Address
                            </i>
                        </div>
                        <div class="share">
                            <CButton class="btn-outline-light btn-pill">Share</CButton>
                        </div>
                    </div>
                    <div class="right">
                        <div class="bottom-right"></div>
                        <div class="qrcode">
                            <CImg class="img" :src="require('@/assets/images/icon/icon-qrcode.png')"></CImg>
                        </div>
                        <div class="option">
                            <CDropdown
                                    color="link"
                                    size="lg"
                                    :caret="false"
                            >
                                <template #toggler-content>
                                    <CIcon name="cil-options"></CIcon>
                                    <span class="sr-only">Search</span>
                                </template>
                                <CDropdownItem>Export Wallet</CDropdownItem>
                                <CDropdownItem>Import</CDropdownItem>
                                <CDropdownItem>Show Secret Seed</CDropdownItem>
                            </CDropdown>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-check">
                <CRow>
                    <CCol col="4">
                        <div>Email</div>
                        <div class="bold">{{ userInfo.email }}</div>
                        <div>
                            <CIcon name="cil-check" class="verified"></CIcon>
                            Verified
                        </div>
                    </CCol>
                    <CCol col="4">
                        <div>Country</div>
                        <div class="bold">China</div>
                        <div>
                            <CIcon name="cil-check"></CIcon>
                            Unverified
                        </div>
                    </CCol>
                    <CCol col="4">
                        <div>Email</div>
                        <div class="bold">G3026789</div>
                        <div>
                            <CIcon name="cil-check"></CIcon>
                            Unverified
                        </div>
                    </CCol>
                </CRow>
            </div>
            <div class="user-info">
                <CRow>
                    <CCol col="6">
                        <div class="name" @click="changeEdit(true)">
                            <CIcon name="cib-apache"></CIcon>
                            Name
                        </div>
                        <div>
                            <div class="text" v-if="!edit">{{ form.name }}</div>
                            <CInput v-if="edit" :value="form.name"></CInput>
                        </div>
                    </CCol>
                    <CCol col="6">
                        <div class="name" @click="changeEdit(true)">
                            <CIcon name="cib-apache"></CIcon>
                            Bio
                        </div>
                        <div>
                            <div class="text" v-if="!edit">{{ form.bio }}</div>
                            <CInput v-if="edit" :value="form.bio"></CInput>
                        </div>
                    </CCol>
                </CRow>
            </div>
            <div class="backup">
                <CRow>
                    <CCol col="8">
                        <div>NKN ID</div>
                        <div>KJWEWEWELXKDKDKDKDKDKK</div>
                    </CCol>
                    <CCol col="4" class="btns">
                        <CIcon name="cil-save"></CIcon>
                        <CButton class="btn btn-pill btn-outline-dark">back up your wallet</CButton>
                    </CCol>
                </CRow>
            </div>
        </CCardBody>
    </CCard>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {UserModule} from '@/store/UserModule'

    @Component
    export default class AccountProfile extends Vue {

        defaultAvatar = require('@/assets/images/default-avatar.png')
        edit = false

        form = {
            name: this.userInfo.username,
            bio : this.userInfo.bio
        }

        get userInfo() {
            return UserModule.userInfo
        }

        copy() {

        }

        changeEdit(checked: boolean) {
            this.edit = checked
        }
    }
</script>

<style lang="stylus" scoped>
    .profile
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

        .body
            .avatar-name
                border-bottom 1px solid #bcbcbc
                margin 15px
                padding-bottom 20px

                .avatar
                    width 60px
                    height 60px
                    float left

                .name
                    line-height 60px
                    float left
                    margin-left 20px
                    font-weight bold
                    font-size 15px

            .exchange-rate
                margin 15px
                padding-bottom 15px
                border-bottom 1px solid #bcbcbc

                .flag
                    float left
                    border-radius 50%
                    width 35px
                    height 35px
                    overflow hidden

                    .c-icon
                        height 100%
                        width 200%
                        margin-left -10px

                .info
                    line-height 35px
                    float left
                    margin-left 20px
                    font-size 13px

            .address
                margin 15px
                padding-bottom 15px
                border-bottom 1px solid #bcbcbc

                .how
                    .icon
                        height 20px
                        width 20px
                        float left

                    .info
                        font-size 12px
                        line-height 20px
                        margin-left 15px
                        float left

                .card
                    display flex
                    border-radius 13px
                    flex-direction inherit
                    margin-top 20px
                    height 160px
                    background rgb(139, 163, 239)

                    .left
                        height 100%
                        width 15px
                        background rgb(106, 128, 202)
                        border-top-left-radius 13px
                        border-bottom-left-radius 13px

                    .mid
                        width 80%

                        .public
                            margin-top 30px
                            margin-left 20px
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color black

                        .copy
                            color white
                            float right
                            top 30px
                            position absolute
                            right 13%

                        .pub-name
                            margin-top 10px
                            margin-left 15px
                            color black

                            .icon
                                width 18px
                                height 18px
                                margin-bottom 5px

                            .white-text
                                color white
                                margin-left 5px
                                font-size 15px

                        .share
                            margin-left 15px
                            margin-top 20px

                    .right
                        right 0
                        position absolute
                        height 100%
                        width 50px

                        .bottom-right
                            background rgb(106, 128, 202)

                        .qrcode
                            background white
                            margin-top 20px
                            height 32px
                            width 32px
                            border-radius 3px

                            .img
                                width 12px
                                margin-left 10px
                                margin-top 9px

                        .option
                            margin-top 50px

                            .c-icon
                                color white
                                margin-left -6px

            .info-check
                margin 15px
                padding-bottom 15px
                line-height 30px
                border-bottom 1px solid #bcbcbc

                .bold
                    font-weight bold

                .verified
                    color lawngreen

            .user-info
                margin 15px
                padding-bottom 15px
                border-bottom 1px solid #bcbcbc
                line-height 30px

                .c-icon
                    margin-right 5px

                .text
                    padding 0.375rem 0.75rem

                .c-input
                    margin-top 5px

            .backup
                margin 15px
                padding-bottom 5px
                line-height 30px

                .btns
                    margin-top 30px
                    .c-icon
                        color #636f83
                    .btn
                        margin-left 20px

</style>