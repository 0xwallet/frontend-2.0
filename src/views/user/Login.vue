<template>
    <div class="c-app flex-row align-items-center login">
        <vue-particles
                class="vue-particles"
                color="#FFFFFF"
                :particleOpacity="0.7"
                :particlesNumber="120"
                shapeType="circle"
                :particleSize="4"
                linesColor="#dedede"
                :linesWidth="1"
                :lineLinked="false"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="2"
                :hoverEffect="false"
                hoverMode="repulse"
                :clickEffect="true"
                clickMode="repulse">
        </vue-particles>
        <CContainer>
            <CRow class="justify-content-center">
                <CCol md="8">
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
                                            :value.sync="user.email"
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
                                            :value.sync="user.password"
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
                                            :value.sync="user.code"
                                            autocomplete="false"
                                    >
                                        <template #prepend-content>
                                            <CIcon name="cil-lock-locked"/>
                                        </template>
                                        <template #append>
                                            <CButton block pressed variant="ghost" color="light" @click="sendCode">
                                                Send
                                            </CButton>
                                        </template>
                                    </CInput>
                                    <CRow>
                                        <CCol col="6" class="text-left">
                                            <CButton color="primary" class="px-4" @click="login">Login</CButton>
                                        </CCol>
                                        <CCol col="6" class="text-right">
                                            <CButton color="link" @click="changeLoginType" class="px-0">Use {{ loginType
                                                === 'Password' ? 'NKN' : 'Password'}}
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol col="12" class="text-right">
                                            <CButton color="link" class="px-0">Forgot password?</CButton>
                                        </CCol>
                                    </CRow>
                                    <CElementCover :opacity="0.8" v-show="loading"/>
                                </CForm>
                            </CCardBody>
                        </CCard>

                        <CCard
                                color="primary"
                                text-color="white"
                                class="text-center py-5 d-md-down-none"
                                body-wrapper
                        >
                            <CCardBody>
                                <h2>Sign up</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.</p>
                                <CButton
                                        color="light"
                                        variant="outline"
                                        size="lg"
                                        @click="() => $router.push('/register')"
                                >
                                    Register Now!
                                </CButton>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component"
    import {CommonModule} from "@/store/CommonModule"
    import VueParticles from 'vue-particles/src/vue-particles/vue-particles.vue'
    import {UserModule} from "@/store/UserModule"


    @Component({
        components: {
            VueParticles
        }
    })
    export default class Login extends Vue {

        loginType = 'Password'
        logoImg = require('@/assets/images/logo.png')
        loading = false

        mounted() {
            CommonModule.hideLoading()

        }

        user = {
            email: '',
            password: '',
            code: ''
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

        }

        /**
         * 登录
         */
        login() {
            this.loading = true

            const param = {
                email: this.user.email,
                password: '',
                code: '',
            }
            if (this.loginType === 'Password') {
                param.password = this.user.password
            } else {
                param.code = this.user.code
            }
            UserModule.signIn(param).then(() => {
                CommonModule.toast('Login Successful')
                this.loading = false
                setTimeout(() => {
                    this.$router.push('/')
                }, 500)
            }).catch(() => {
                this.loading = false
            })

        }
    }
</script>

<style lang="stylus" scoped>
    .login
        background linear-gradient(to bottom, #FFCC99 0%, #0066FF 80%)

        .vue-particles
            position fixed
            width 100%
            height 100%

        .logo
            width 170px
</style>