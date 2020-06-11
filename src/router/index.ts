import Vue from 'vue'
import Router from 'vue-router'
import {UserModule} from "@/store/UserModule"

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
                },
                {
                    path: 'security',
                    name: 'Security',
                    component: () => import('@/views/Security.vue')
                },
                {
                    path: 'account',
                    name: 'Account',
                    component: () => import('@/views/Account.vue')
                },
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/user/Login.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/user/Register.vue')
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path != '/login' && to.path != '/register') {
        let token = UserModule.token || localStorage.getItem('auth-token')
        if (token == '' || token == 'null' || token == null) {
            next('/login')
        }
    }
    next()
})

export default router
