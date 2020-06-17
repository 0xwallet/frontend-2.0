<template>
    <div>
        <p>This view file path: src/views/dashboard</p>
        <p>
            <span class="mr-1">Check</span>
            <a href="https://coreui.io/vue/docs" target="_blank">CoreUI Vue Documentation</a>
        </p>
        <p>
            <button class="btn btn-success" @click="test">Test</button>
        </p>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'
    import {NknModule} from '@/store/NknModule'

    @Component
    export default class Dashboard extends Vue {

        mounted() {
            CommonModule.hidePageLoading()
        }

        test() {
            NknModule.bindAndSetDefault({
                password: 'lty01234',
            }).then()
        }
    }
</script>
