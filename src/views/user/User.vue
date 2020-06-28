<template>
    <div class="c-app flex-row align-items-center user">
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
                clickMode="repulse"
        ></vue-particles>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import VueParticles from 'vue-particles/src/vue-particles/vue-particles.vue'

    @Component({
        components: {
            VueParticles
        },
    })
    export default class Login extends Vue {


    }
</script>

<style lang="stylus" scoped>
    .user
        background linear-gradient(to bottom, #0066FF 0%, #FFCC99 80%)

    .vue-particles
        position fixed
        width 100%
        height 100%
</style>