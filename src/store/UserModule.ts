import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {store} from './index'
import {
    editCurrentUserService,
    meService,
    sendVerifyCodeService,
    signInService,
    signUpService
} from '@/service/UserService'
import {PersonalInfoInput, User} from '@/store/model/User'
import {CommonModule} from '@/store/CommonModule'
import {NknModule} from '@/store/NknModule'

@Module({
    dynamic: true,
    name   : 'UserModule',
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
        userInfo.wallets?.map(((value, index, array) => {
            value.show = false
        }))
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
                this.me().then(() => {
                    resolve()
                })
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
                this.setToken(res.data.signup.token)

                this.me().then(() => {
                    NknModule.bindAndSetDefault({
                        password: params.password
                    }).then(() => {
                        resolve(res.data.signup)
                    })
                })
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
                CommonModule.toast({content: 'Verification code sent successfully'})
                resolve()
            })
        }))
    }

    @Action
    editCurrentUser(params: {
        avatar?: string,
        bio?: string,
        personalInfo?: PersonalInfoInput,
        userName?: string
    }) {
        return new Promise((resolve => {
            editCurrentUserService(params).then(() => {
                this.me().then(() => {
                    resolve()
                })
            })
        }))
    }


}

export const UserModule = getModule(UserModulePrivate)