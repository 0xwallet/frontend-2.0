import Vue from 'vue'
import Router from 'vue-router'
import {UserModule} from '@/store/UserModule'
import {CommonModule} from '@/store/CommonModule'

const TheContainer = () => import('../containers/TheContainer.vue')
const Dashboard = () => import('../views/Dashboard.vue')

Vue.use(Router)

const router = new Router({
    mode           : 'hash',
    linkActiveClass: 'open active',
    routes         : [
        {
            path     : '/',
            redirect : '/dashboard',
            name     : 'Home',
            component: TheContainer,
            children : [
                {
                    path     : 'dashboard',
                    name     : 'Dashboard',
                    component: Dashboard
                },
                {
                    path     : 'security',
                    name     : 'Security',
                    component: () => import('@/views/Security.vue')
                },
                {
                    path     : 'account',
                    name     : 'Account',
                    component: () => import('@/views/Account.vue')
                },
                {
                    path     : 'organization',
                    name     : 'Organization',
                    component: () => import('@/views/Organization.vue')
                },
                {
                    path     : 'drive/metanet/:txId',
                    name     : 'Drive',
                    component: () => import('@/views/Drive.vue')
                }
            ]
        },
        {
            path     : '/user',
            redirect : '/login',
            name     : 'User',
            component: () => import('@/views/user/User.vue'),
            children : [
                {
                    path     : 'login',
                    name     : 'Login',
                    component: () => import('@/views/user/LoginForm.vue')
                },
                {
                    path     : 'register',
                    name     : 'RegisterForm',
                    component: () => import('@/views/user/RegisterForm.vue')
                },
            ]
        },
        {
            path     : '/test',
            name     : 'Test',
            component: () => import('@/views/TestPDF.vue')
        }

    ]
})

// router.beforeEach((to, from, next) => {
//     if (to.path != '/user/login' && to.path != '/user/register') {
//         let token = UserModule.token || localStorage.getItem('auth-token')
//         if (token == '' || token == 'null' || token == null) {
//             CommonModule.showLoading()
//             next('/user/login')
//         }
//     }
//     CommonModule.showPageLoading()
//     next()
// })

export default router
