import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators"
import {store} from './index'
import {meService, sendVerifyCodeService, signInService, signUpService} from '@/service/UserService'
import {User} from "@/store/model/User"
import {CommonModule} from "@/store/CommonModule"

@Module({
    dynamic: true,
    name: 'UserModule',
    store
})
class UserModulePrivate extends VuexModule {

    token = ''

    userInfo: User = new User()

    @Mutation
    setToken(token: string) {
        this.token = token
        localStorage.setItem('auth-token', token)
    }

    @Mutation
    setUserInfo(userInfo: User) {
        this.userInfo = userInfo
    }

    @Action
    signIn(params: {
        email: string,
        password?: string,
        code?: string
    }) {
        return new Promise(((resolve, reject) => {
            signInService(params).then(res => {
                this.setToken(res.data.signin.token)
                resolve(res.data.signin)
            }).catch(error => reject(error))
        }))
    }

    @Action
    signUp(params: {
        userName: string,
        password: string,
        email: string,
        code: string,
    }) {
        return new Promise(((resolve, reject) => {
            signUpService(params).then(res => {
                resolve(res.data.signup)
                this.setToken(res.data.signup.token)
                // TODO: 为用户创建并绑定地址
            }).catch(error => reject(error))
        }))
    }

    @Action
    me() {
        return new Promise((resolve => {
            meService().then(res => {
                this.setUserInfo(res.data.me)
                resolve(res)
            })
        }))
    }

    @Action
    sendVerifyCode(email: string) {
        return new Promise((resolve => {
            sendVerifyCodeService({email}).then(() => {
                CommonModule.toast('Verification code sent successfully')
                resolve()
            })
        }))
    }


}

export const UserModule = getModule(UserModulePrivate)