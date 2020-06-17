import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CoreuiVue from '@coreui/vue/src'
import {iconsSet as icons} from './assets/icons/icons'
import {store} from '@/store'
import 'babel-polyfill'

Vue.use(CoreuiVue)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    //CIcon component documentation: https://coreui.io/vue/docs/components/icon
    icons,
    render: h => h(App)
}).$mount('#app')
