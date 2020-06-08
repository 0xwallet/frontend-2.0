<template>
    <div class="c-app flex-row align-items-center register">
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
                                            <CButton color="link" class="px-0" @click="$router.push('/login')">Sign In
                                            </CButton>
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
    import VueParticles from 'vue-particles/src/vue-particles/vue-particles.vue'
    import {CommonModule} from "@/store/CommonModule"


    @Component({
        components: {
            VueParticles
        }
    })
    export default class Register extends Vue {
        logoImg = require('@/assets/images/logo.png')

        mounted() {
            setTimeout(() => CommonModule.hideLoading(), 800)
        }

        sendCode() {

        }
    }
</script>

<style lang="stylus" scoped>
    .register
        background linear-gradient(to bottom, #FFCC99 0%, #0066FF 80%)

        .vue-particles
            position fixed
            width 100%
            height 100%

        .logo
            width 170px
</style>