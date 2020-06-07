<template>
    <CFooter :fixed="false">
        <div>
            <a href="https://coreui.io" target="_blank">0xWallet</a>
            <span class="ml-1">&copy; {{new Date().getFullYear()}} creativeLabs.</span>
        </div>
        <div class="ml-auto">
            <span class="mr-1">Powered by</span>
            <a href="https://coreui.io/vue" target="_blank">CoreUI for Vue</a>
        </div>
    </CFooter>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component"

    @Component
    export default class TheFooter extends Vue {

    }
</script>
