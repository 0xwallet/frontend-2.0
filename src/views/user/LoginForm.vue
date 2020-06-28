<template>
    <CContainer>
        <CRow class="justify-content-center">
            <CCol md="4">
                <CCardGroup>
                    <CCard class="p-4">
                        <CCardBody>
                            <div style="text-align: center;">
                                <c-img class="logo" :src="logoImg"/>
                            </div>
                            <CForm>
                                <h1></h1>
                                <p class="text-muted"></p>
                                <br>
                                <CInput
                                        placeholder="Email"
                                        :value.sync="$v.form.email.$model"
                                        :isValid="checkIfValid('email')"
                                        invalidFeedback="This is a required field and must be an email"
                                        autocomplete="username email"
                                >
                                    <template #prepend-content>
                                        <CIcon name="cil-envelope-closed"/>
                                    </template>
                                </CInput>
                                <CInput
                                        v-if="loginType === 'Password'"
                                        placeholder="password"
                                        type="password"
                                        :value.sync="$v.form.password.$model"
                                        :isValid="checkIfValid('password')"
                                        invalidFeedback="Password must be at least 8 digits"
                                        autocomplete="false"
                                >
                                    <template #prepend-content>
                                        <CIcon name="cil-lock-locked"/>
                                    </template>
                                </CInput>
                                <CInput
                                        v-if="loginType === 'NKN'"
                                        placeholder="loginCode"
                                        type="text"
                                        :value.sync="$v.form.code.$model"
                                        :isValid="checkIfValid('code')"
                                        invalidFeedback="Email Code must be at least 6 digits"
                                        autocomplete="false"
                                >
                                    <template #prepend-content>
                                        <CIcon name="cil-lock-locked"/>
                                    </template>
                                    <template #append>
                                        <CButton block pressed variant="ghost" color="light" @click="sendCode">
                                            {{ time !== 0 ? time + 's' : 'Send'}}
                                        </CButton>
                                    </template>
                                </CInput>
                                <CRow>
                                    <CCol col="4" style="margin-top: 6px">
                                        <CInputCheckbox label="Remember"></CInputCheckbox>
                                    </CCol>
                                    <CCol col="8" class="text-right">
                                        <CButton color="link" class="px-0">Forgot password?</CButton>
                                    </CCol>
                                </CRow>
                                <CButton color="primary" class="px-4 btn-block" style="margin-top: 5px;"
                                         @click="login">Login
                                </CButton>

                                <div>
                                    <div class="or">
                                        <div>or</div>
                                    </div>
                                </div>

                                <CRow class="bottom-btn">
                                    <CCol col="4">
                                        <CButton color="link" class="px-0">WebAuthn
                                        </CButton>
                                    </CCol>
                                    <CCol col="4">
                                        <CButton color="link" @click="changeLoginType" class="px-0">{{ loginType
                                            === 'Password' ? 'NKN' : 'Password'}}
                                        </CButton>
                                    </CCol>
                                    <CCol col="4">
                                        <CButton color="link" @click="$router.push('/user/register')" class="px-0">
                                            Sign Up
                                        </CButton>
                                    </CCol>
                                </CRow>

                                <CElementCover :opacity="0.8" v-show="loading"/>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCardGroup>
            </CCol>
        </CRow>
    </CContainer>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'
    import {NknModule} from '@/store/NknModule'
    import {UserModule} from '@/store/UserModule'
    import {validationMixin} from 'vuelidate'
    import {email, minLength, required} from 'vuelidate/lib/validators'

    @Component({
        mixins     : [validationMixin],
        validations: {
            form: {
                email   : {
                    required, email
                },
                code    : {
                    required,
                    minLength: minLength(6)
                },
                password: {
                    required,
                    minLength: minLength(8)
                },
            }
        }
    })
    export default class LoginForm extends Vue {
        loginType = 'Password'
        logoImg = require('@/assets/images/logo.png')
        loading = false
        time = 0

        mounted() {
            CommonModule.hideLoading()
            this.timeReduction()
            if (this.$route.query.mode && this.$route.query.mode === 'NKN') {
                this.loginType = this.$route.query.mode
            }
        }

        form = this.getEmptyForm()

        valid() {
            return !this.$v.form.$invalid
        }

        checkIfValid(fieldName: string) {
            const field = this.$v.form[fieldName]
            if (field == undefined) {
                return null
            }
            if (!field.$dirty) {
                return null
            }
            return !(field.$invalid || field.$model === '')
        }

        getEmptyForm() {
            return {
                email   : '',
                password: '',
                code    : ''
            }
        }

        changeLoginType() {
            if (this.loginType === 'Password') {
                this.loginType = 'NKN'
            } else {
                this.loginType = 'Password'
            }
        }

        /**
         * 发送验证码
         */
        sendCode() {
            if (this.time == 0 && this.form.email != '') {
                this.time = 60
                NknModule.sendLoginCode({
                    email: this.form.email,
                })
            }
        }

        timeReduction() {
            setInterval(() => {
                if (this.time > 0) {
                    this.time--
                }
            }, 1000)
        }

        /**
         * 登录
         */
        login() {
            this.loading = true

            const param = {
                email   : this.form.email,
                password: '',
                code    : '',
            }
            if (this.loginType === 'Password') {
                param.password = this.form.password
            } else {
                param.code = this.form.code
            }
            UserModule.signIn(param).then(() => {
                CommonModule.toast({content: 'Login Successful'})
                setTimeout(() => {
                    this.loading = false
                    this.$router.push('/')
                }, 500)
            }).catch(() => {
                this.loading = false
            })
        }
    }
</script>

<style lang="stylus" scoped>

    .logo
        width 170px

    .or
        position absolute
        text-align center
        margin-top 10px
        width 255px


    .or div
        line-height 20px


    .or div:after, .or div:before
        position absolute
        top 50%
        background #ddd
        content ""
        height 1px
        width 45%


    .or div:before
        left 0


    .or div:after
        right 0

    .bottom-btn
        text-align center
        margin-top 30px
</style>