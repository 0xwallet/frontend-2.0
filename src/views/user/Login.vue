<template>
    <div class="c-app flex-row align-items-center">

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
                                            autocomplete="username email"
                                    >
                                        <template #prepend-content>
                                            <CIcon name="cil-user"/>
                                        </template>
                                    </CInput>
                                    <CInput
                                            :placeholder="loginType === 'Password' ? 'password' : 'loginCode'"
                                            :type="loginType === 'Password' ? 'password' : 'text'"
                                            autocomplete="false"
                                    >
                                        <template #prepend-content>
                                            <CIcon name="cil-lock-locked"/>
                                        </template>
                                        <template #append v-if="loginType === 'NKN'">
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
                                                === 'Password' ? 'Password' : 'NKN'}}
                                            </CButton>
                                            <CButton color="link" class="px-0">Forgot password?</CButton>
                                        </CCol>
                                    </CRow>
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

    @Component
    export default class Login extends Vue {

        loginType = 'Password'
        logoImg = require('@/assets/images/logo.png')

        mounted() {
            CommonModule.hideLoading()
        }

        user = {
            email: '',
            password: '',
            emailCode: '',
        }

        changeLoginType() {
            if (this.loginType === 'Password') {
                this.loginType = 'NKN'
            } else {
                this.loginType = 'Password'
            }
        }

        sendCode() {

        }

        login() {
            CommonModule.toast('测试吐司')
        }
    }
</script>

<style lang="stylus" scoped>
    .logo
        width 170px
</style>