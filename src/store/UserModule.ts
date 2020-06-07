import {getModule, Module, VuexModule, Action} from "vuex-module-decorators"
import {store} from './index'
import {meService, sendVerifyCodeService, signInService} from '@/service/UserService'

@Module({
    dynamic: true,
    name: 'UserModule',
    store
})
class UserModulePrivate extends VuexModule {

    @Action
    signIn(email: string, password: string | null, code: string | null) {
        return new Promise(((resolve) => {
            signInService({email, password, code}).then(res => {
                // 登录成功操作
                console.log(res)
            })
        }))
    }

    @Action
    me() {
        return new Promise((resolve => {
            meService().then(res => {
                // 个人信息
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