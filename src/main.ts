import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CoreuiVue from '@coreui/vue/src'
import {iconsSet as icons} from './assets/icons/icons'
import {store} from '@/store'
import 'babel-polyfill'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'


Vue.use(CoreuiVue)
Vue.use(VueI18n)
Vue.use(VueAxios, axios)

const other = require('./other.js')
other.main()


axios.defaults.withCredentials = true

const i18n = new VueI18n({
    locale  : localStorage.getItem('locale') || 'en',
    messages: {
        'zh': require('@/assets/languages/zh.json'),
        'en': require('@/assets/languages/en.json'),
    }
})


Vue.config.productionTip = false

new Vue({
    i18n,
    router,
    store,
    //CIcon component documentation: https://coreui.io/vue/docs/components/icon
    icons,
    render: h => h(App)
}).$mount('#app')

