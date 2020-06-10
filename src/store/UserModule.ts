import {getModule, Module, VuexModule, Action, Mutation} from "vuex-module-decorators"
import {store} from './index'
import {meService, sendVerifyCodeService, signInService} from '@/service/UserService'
import {User} from "@/store/model/User"

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
    signIn(param: {
        email: string,
        password?: string,
        code?: string
    }) {
        return new Promise(((resolve, reject) => {
            signInService(param).then(res => {
                resolve(res.data.signin)
                this.setToken(res.data.signin.token)
            }).catch(error => reject(error))
        }))
    }

    @Action
    me() {
        return new Promise((resolve => {
            meService().then(res => {
                // console.log(res)
                this.setUserInfo(res.data.me)
                resolve(res)
            })
        }))
    }

    @Action
    sendVerifyCode(email: string) {
        return new Promise((resolve => {
            sendVerifyCodeService({email}).then(res => {
                // 发送成功
            })
        }))
    }


}

export const UserModule = getModule(UserModulePrivate)