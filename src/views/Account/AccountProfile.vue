<template>
    <div>

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
                    <div @click="choiceImg">
                        <div class="avatar-box">
                            <CImg class="avatar" :src="avatar || defaultAvatar"></CImg>
                            <div class="avatar cover" v-if="edit"></div>
                            <div class="edit" v-if="edit">edit</div>
                        </div>
                    </div>
                    <input ref="choiceImg" type="file" name="" accept="image/gif,image/jpeg,image/png,image/jpg"
                           style="display: none;"
                           @change="fileChange">
                    <div class="name">{{ userInfo.username }}</div>
                    <div class="exchange-rate">
                        <div class="flag" @click="$refs.editCurrency.showModal()">
                            <CIcon :name="'cif-' + userInfo.setting.currency.substring(0,2).toLowerCase() || 'us'"
                                   height="50"
                                   width="50"></CIcon>
                        </div>
                        <div class="info">1 BSV = {{ currentRate }} {{ userInfo.setting.currency || 'USD'
                            }}
                        </div>
                        <div class="clearfix"></div>
                    </div>
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
                            <div v-if="!edit" class="bold">
                                {{ form.country || 'UnKnow' }}
                            </div>
                            <CSelect
                                    v-if="edit"
                                    :options="countries"
                                    style="width: 120px;"
                                    :value.sync="form.country"
                            />
                            <div>
                                <CIcon name="cil-check"></CIcon>
                                Unverified
                            </div>
                        </CCol>
                        <CCol col="4">
                            <div>Passport</div>
                            <div v-if="!edit" class="bold">
                                {{ form.passport || 'UnKnow' }}
                            </div>
                            <CInput v-if="edit" :value.sync="form.passport"></CInput>
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
                                <CInput v-if="edit" style="width: 200px;" :value.sync="form.name"></CInput>
                            </div>
                        </CCol>
                        <CCol col="6">
                            <div class="name" @click="changeEdit(true)">
                                <CIcon name="cib-apache"></CIcon>
                                Bio
                            </div>
                            <div>
                                <div class="text" v-if="!edit">{{ form.bio }}</div>
                                <CInput v-if="edit" style="width: 200px;" :value.sync="form.bio"></CInput>
                            </div>
                        </CCol>
                    </CRow>
                </div>
                <div class="backup">
                    <div class="bottom-box">
                        <div class="left">
                            <div><strong>0xWallet ID</strong></div>
                            <div>KJWE WEWE LXKD KDKD</div>
                        </div>
                        <div class="btns right">
                            <!--                        <CIcon name="cil-save"></CIcon>-->
                            <CButton class="btn btn-pill btn-outline-dark btn-lg"><i>Change my ID</i></CButton>
                        </div>
                    </div>
                </div>
            </CCardBody>
        </CCard>
        <EditCurrencyComponent ref="editCurrency"></EditCurrencyComponent>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {UserModule} from '@/store/UserModule'
    import {CommonModule} from '@/store/CommonModule'
    import Clipboard from 'clipboard'
    import {ToastColor} from '@/store/model/Toast'
    import {getNames} from 'country-list'
    import EditCurrencyComponent from '@/components/EditCurrencyComponent.vue'
    import {Watch} from 'vue-property-decorator'

    @Component({
        components: {EditCurrencyComponent}
    })
    export default class AccountProfile extends Vue {

        $refs!: {
            choiceImg: HTMLInputElement
        }

        defaultAvatar = require('@/assets/images/default-avatar.png')
        edit = false
        countries = getNames()

        form = {
            avatar  : this.userInfo.avatar,
            name    : this.userInfo.username,
            bio     : this.userInfo.bio,
            country : this.userInfo.personalInfo?.country,
            passport: this.userInfo.personalInfo?.passport,
        }


        avatar ?: any = ''
        file: any = null
        currentRate = 'Waiting...'

        @Watch('userInfo', {immediate: true, deep: true})
        onUserInfoChange() {
            this.getCurrencyRate()
        }

        getCurrencyRate() {
            this.axios.get('https://api.coinbase.com/v2/prices/BSV-' + this.userInfo.setting?.currency + '/buy', {
                headers: {
                    'Authorization': 'Bearer abd90df5f27a7b170cd775abf89d632b350b7c1c9d53e08b340cd9832ce52c2c'
                }
            }).then((res) => {
                console.log(res.data.data.amount)
                this.currentRate = res.data.data.amount
            })
        }


        get userInfo() {
            return UserModule.userInfo
        }

        choiceImg() {
            if (this.edit) {
                this.$refs.choiceImg.dispatchEvent(new MouseEvent('click'))
            }
        }

        fileChange(e: any) {
            let $target: any = e.target
            let file: any = $target.files[0]
            this.file = file


            let imgSize: any = file.size
            if (imgSize > 5 * 1024 * 1024) {
                CommonModule.toast({content: '图片大小限制为5M', color: ToastColor.WARNING})
                return
            }
            let reader = new FileReader()
            reader.onload = (data) => {
                let res = data.target
                this.avatar = res?.result
            }
            reader.readAsDataURL(file)

        }

        // public handleUploadHead(){
        //     let file:any = this.file;
        //     let picData:any = new FormData();
        //     picData.append('file',file,file.name);
        //     //接口请求，根据自身项目做调整，这里只是简单介绍
        //     axios.post({
        //         url:"接口url",
        //         method:'post',
        //         data:picData,
        //     }).then(res=>{
        //         if(res.data.success == true){
        //             //这里是借用elelment UI的消息提示
        //             this.$notify.success({title: 'success',message: '头像图片上传成功'});
        //             return;
        //         }
        //         this.$notify.error({title: '错误',message: res.data.msg});
        //     }).catch(err=>{
        //         console.log(err);
        //     })
        // }

        copy() {
            let clipboard = new Clipboard('.copy')
            clipboard.on('success', () => {
                CommonModule.toast({content: 'Copy Successfully', color: ToastColor.SUCCESS})
                clipboard.destroy()
            })
            clipboard.on('error', () => {
                CommonModule.toast({content: 'The browser does not support automatic copying'})
                clipboard.destroy()
            })
        }

        changeEdit(checked: boolean) {
            this.edit = checked

            if (!this.edit) {
                // CommonModule.showPageLoading()
                UserModule.editCurrentUser({
                    userName    : this.form.name,
                    bio         : this.form.bio,
                    personalInfo: {
                        passport: this.form.passport,
                        country : this.form.country,
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .form-group
        padding 0
        margin 0

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

                .avatar-box
                    position relative

                    .avatar
                        width 75px
                        height 75px
                        float left

                    .cover
                        width 62px
                        height 65px
                        margin-left 7px
                        margin-top 5px
                        position absolute
                        box-shadow inset 0px -20px 10px rgba(0, 0, 0, 0.4)
                        border-radius 50%
                        display none

                    &:hover .cover
                        display block


                    .edit
                        width 75px
                        height 100px
                        position absolute
                        margin-top 45px
                        text-align center
                        color white
                        display none

                    &:hover .edit
                        display block

                .name
                    line-height 75px
                    float left
                    margin-left 20px
                    font-weight bold
                    font-size 15px

                .exchange-rate
                    margin-right 20px

                    .flag
                        float right
                        margin-top 19px
                        border-radius 50%
                        height 35px
                        width 35px
                        overflow hidden

                        .c-icon
                            height 100%
                            width 200%
                            margin-left -10px

                    .info
                        float right
                        line-height 75px
                        margin-right 10px


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

                .bottom-box
                    display flex
                    justify-content space-between

                    .right
                        flex 1
                        text-align right

                    .btns
                        margin-top 30px

                        .c-icon
                            color #636f83

                        .btn
                            margin-left 20px

</style>