<template>
    <div>
        <widget-wallet></widget-wallet>
        <widget-token-traffic></widget-token-traffic>
        <widget-social></widget-social>
        <widget-traffic-and-sales></widget-traffic-and-sales>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'
    import WidgetWallet from '@/views/widgets/WidgetWallet.vue'
    import WidgetTokenTraffic from '@/views/widgets/WidgetTokenTraffic.vue'
    import WidgetSocial from '@/views/widgets/WidgetSocial.vue'
    import WidgetTrafficAndSales from '@/views/widgets/WidgetTrafficAndSales.vue'


    @Component({
        components: {WidgetTrafficAndSales, WidgetSocial, WidgetTokenTraffic, WidgetWallet}
    })
    export default class Dashboard extends Vue {

        mounted() {
            setTimeout(() => {
                CommonModule.hidePageLoading()
            }, 1000)
        }


    }
</script>
