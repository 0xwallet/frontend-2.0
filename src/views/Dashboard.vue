<template>
    <div>
        <widget-wallet></widget-wallet>
        <widget-token-traffic></widget-token-traffic>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'
    import WidgetWallet from '@/views/widgets/WidgetWallet.vue'
    import WidgetTokenTraffic from '@/views/widgets/WidgetTokenTraffic.vue'


    @Component({
        components: {WidgetTokenTraffic, WidgetWallet}
    })
    export default class Dashboard extends Vue {

        mounted() {
            CommonModule.hidePageLoading()
        }


    }
</script>
