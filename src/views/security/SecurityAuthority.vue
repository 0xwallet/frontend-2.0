<template>
    <main-card-component :title="$t('security.authority.authority')">
        <div style="height: 700px"></div>
    </main-card-component>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import MainCardComponent from '@/components/MainCardComponent.vue'

    @Component({
        components: {MainCardComponent}
    })
    export default class SecurityAuthority extends Vue {

    }
</script>

<style lang="stylus" scoped>

</style>