<template>
    <div>
        <p>This view file path: src/views/dashboard</p>
        <p>
            <span class="mr-1" target="_blank">Check</span>
            <a href="https://coreui.io/vue/docs">CoreUI Vue Documentation</a>
        </p>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component"
    import {CommonModule} from "@/store/CommonModule"

    @Component
    export default class Dashboard extends Vue {

        mounted() {
            setTimeout(() => CommonModule.hideLoading(), 500)
        }
    }
</script>
