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
                                        autocomplete="username email"
                                        :value.sync="$v.form.email.$model"
                                        :isValid="checkIfValid('email')"
                                        invalidFeedback="This is a required field and must be an email"
                                >
                                    <template #prepend-content>
                                        <CIcon name="cil-envelope-closed"/>
                                    </template>
                                    <template #append>
                                        <CButton block pressed variant="ghost" color="light" @click="sendCode">
                                            {{ time !== 0 ? time + 's' : 'Send'}}
                                        </CButton>
                                    </template>
                                </CInput>
                                <CInput
                                        placeholder="email code"
                                        type="text"
                                        autocomplete="false"
                                        :value.sync="$v.form.emailCode.$model"
                                        :isValid="checkIfValid('emailCode')"
                                        invalidFeedback="The email code must be at least 6 digits"
                                >
                                    <template #prepend-content>
                                        <CIcon name="cil-envelope-letter"/>
                                    </template>
                                </CInput>
                                <CInput
                                        placeholder="password"
                                        type="password"
                                        autocomplete="false"
                                        :value.sync="$v.form.password.$model"
                                        :isValid="checkIfValid('password')"
                                        invalidFeedback="Password must be at least 8 digits"
                                >
                                    <template #prepend-content>
                                        <CIcon name="cil-lock-locked"/>
                                    </template>
                                </CInput>
                                <CInput
                                        placeholder="validate password"
                                        type="password"
                                        autocomplete="false"
                                        :value.sync="$v.form.password2.$model"
                                        :isValid="checkIfValid('password2')"
                                        invalidFeedback="Two password input must be consistent"
                                >
                                    <template #prepend-content>
                                        <CIcon name="cil-lock-locked"/>
                                    </template>
                                </CInput>
                                <CButton color="primary" class="px-4 btn-block" style="margin-top: 5px;"
                                         @click="register">Register
                                </CButton>
                                <div>
                                    <div class="or">
                                        <div>or</div>
                                    </div>
                                </div>

                                <CRow class="bottom-btn">
                                    <CCol col="4">
                                        <CButton color="link" class="px-0">
                                            WebAuthn
                                        </CButton>
                                    </CCol>
                                    <CCol col="4">
                                        <CButton color="link"
                                                 @click="$router.push({path:'/user/login',query:{mode:'NKN'}})"
                                                 class="px-0">
                                            NKN
                                        </CButton>
                                    </CCol>
                                    <CCol col="4">
                                        <CButton color="link" @click="$router.push('/user/login')" class="px-0">
                                            Sign In
                                        </CButton>
                                    </CCol>
                                </CRow>
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
    import VueParticles from 'vue-particles/src/vue-particles/vue-particles.vue'
    import {CommonModule} from '@/store/CommonModule'
    import {validationMixin} from 'vuelidate'
    import {required, email, sameAs, minLength} from 'vuelidate/lib/validators'
    import {UserModule} from '@/store/UserModule'

    @Component({
        mixins     : [validationMixin],
        components : {
            VueParticles
        },
        validations: {
            form: {
                email    : {
                    required, email
                },
                emailCode: {
                    required,
                    minLength: minLength(6)
                },
                password : {
                    required,
                    minLength: minLength(8)
                },
                password2: {
                    required,
                    someAsPassword: sameAs('password')
                }
            }
        }
    })
    export default class Register extends Vue {
        logoImg = require('@/assets/images/logo.png')
        time = 0
        loading = false

        form = this.getEmptyForm()

        valid() {
            return !this.$v.form.$invalid
        }

        mounted() {
            setTimeout(() => CommonModule.hideLoading(), 800)
            this.timeReduction()
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

        timeReduction() {
            setInterval(() => {
                if (this.time > 0) {
                    this.time--
                }
            }, 1000)
        }

        sendCode() {
            if (this.time == 0 && this.form.email != '') {
                this.time = 60
                UserModule.sendVerifyCode({email: this.form.email, type: 'ACTIVE_EMAIL'})
            }
        }

        register() {
            if (this.valid()) {
                UserModule.signUp({
                    email   : this.form.email,
                    code    : this.form.emailCode,
                    userName: this.form.email.substring(0, this.form.email.indexOf('@')),
                    password: this.form.password,
                }).then(() => {
                    setTimeout(() => {
                        this.loading = false
                        this.$router.push('/')
                    }, 500)
                })
            }
        }

        getEmptyForm() {
            return {
                email    : '',
                emailCode: '',
                password : '',
                password2: '',
            }
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