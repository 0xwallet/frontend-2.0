<template>
    <div>
        <main-card-component :title="$t('security.data.data')">
            <div style="height: 300px"></div>
        </main-card-component>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import MainCardComponent from '@/components/MainCardComponent.vue'

    @Component({
        components: {MainCardComponent}
    })
    export default class SecurityData extends Vue {

    }
</script>

<style lang="stylus" scoped>

</style>