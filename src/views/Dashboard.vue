<template>
    <div>
        <p>This view file path: src/views/dashboard</p>
        <p>
            <span class="mr-1">Check</span>
            <a href="https://coreui.io/vue/docs" target="_blank">CoreUI Vue Documentation</a>
        </p>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component"

    @Component
    export default class Dashboard extends Vue {

        mounted() {
        }
    }
</script>
