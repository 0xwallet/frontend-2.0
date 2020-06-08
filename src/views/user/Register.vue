<template>
    <div class="c-app flex-row align-items-center">
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
                                    >
                                        <template #prepend-content>
                                            <CIcon name="cil-envelope-closed"/>
                                        </template>
                                        <template #append>
                                            <CButton block pressed variant="ghost" color="light" @click="sendCode">
                                                Send
                                            </CButton>
                                        </template>
                                    </CInput>
                                    <CInput
                                            placeholder="email code"
                                            type="text"
                                            autocomplete="false"
                                    >
                                        <template #prepend-content>
                                            <CIcon name="cil-envelope-letter"/>
                                        </template>
                                    </CInput>
                                    <CInput
                                            placeholder="password"
                                            type="password"
                                            autocomplete="false"
                                    >
                                        <template #prepend-content>
                                            <CIcon name="cil-lock-locked"/>
                                        </template>
                                    </CInput>
                                    <CInput
                                            placeholder="validate password"
                                            type="password"
                                            autocomplete="false"
                                    >
                                        <template #prepend-content>
                                            <CIcon name="cil-lock-locked"/>
                                        </template>
                                    </CInput>
                                    <CRow>
                                        <CCol col="6" class="text-left">
                                            <CButton color="primary" class="px-4">Login</CButton>
                                        </CCol>
                                        <CCol col="6" class="text-right">
                                            <CButton color="link" class="px-0" @click="$router.push('/login')">Sign In</CButton>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol col="12" class="text-right">
                                            <CButton color="link" class="px-0">Forgot password?</CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
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

    @Component
    export default class Register extends Vue {
        logoImg = require('@/assets/images/logo.png')
    }
</script>

<style lang="stylus" scoped>
    .logo
        width 170px
</style>