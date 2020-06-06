import Vue from 'vue'
import Router from 'vue-router'

const TheContainer = () => import('../containers/TheContainer.vue')
const Dashboard = () => import('../views/Dashboard.vue')

Vue.use(Router)

const router = new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'open active',
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            name: 'Home',
            component: TheContainer,
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                }
            ]
        }
    ]
})

export default router
