<template>
    <div>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'

    @Component({
        components: {}
    })
    export default class Security extends Vue {

        mounted() {
            setTimeout(() => {
                CommonModule.hidePageLoading()
            }, 1000)
        }

    }
</script>

<style lang="stylus" scoped>
    .title
        width auto
        word-break keep-all
        white-space nowrap
        overflow hidden
        text-overflow ellipsis

    .public-key-action
        float right

    .btn-create
        float right

    .wallet-type
        margin-right 10px

    .wallet-tag
        font-size 10px
</style>