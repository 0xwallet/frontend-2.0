import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {store} from './index'
import {
    drivePreviewTokenService,
    editCurrentUserService,
    editCurrentUserSettingService,
    meService,
    sendVerifyCodeService,
    signInService,
    signUpService
} from '@/service/UserService'
import {Currency, PersonalInfoInput, User} from '@/store/model/User'
import {CommonModule} from '@/store/CommonModule'
import {NknModule} from '@/store/NknModule'
import {ToastColor} from '@/store/model/Toast'
import {drivePreviewTokenMutation} from '@/graphql/userGraphql'

@Module({
    dynamic: true,
    name   : 'UserModule',
    store
})
class UserModulePrivate extends VuexModule {

    token = ''

    userInfo: User = new User()
    drivePreviewToken: string = ''

    @Mutation
    setToken(token: string) {
        this.token = token
        localStorage.setItem('auth-token', token)
    }

    @Mutation
    setDrivePreviewToken(token: string) {
        this.drivePreviewToken = token
        console.log('drivePreviewToken', this.drivePreviewToken)
    }

    @Mutation
    setUserInfo(userInfo: User) {
        userInfo.wallets?.map(((value) => {
            value.show = false
        }))
        this.userInfo = new User()
        this.userInfo = JSON.parse(JSON.stringify(userInfo))
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
                    NknModule.connectNkn()
                })
            }).catch(error => reject(error))
        }))
    }

    @Action
    me() {
        return new Promise((resolve => {
            meService().then(res => {
                this.setUserInfo(res.data.me)
                drivePreviewTokenService().then((res) => {
                    this.setDrivePreviewToken(res.data.drivePreviewToken)
                })
                resolve(res)
            })
        }))
    }

    @Action
    sendVerifyCode(params: {
        email: string
        type?: string
    }) {
        return new Promise((resolve => {
            sendVerifyCodeService(params).then(() => {
                CommonModule.toast({content: 'Verification code sent successfully'})
                resolve()
            })
        }))
    }

    @Action
    editCurrentUser(params: {
        avatar?: string,
        bio?: string,
        code?: string,
        personalInfo?: PersonalInfoInput,
        userName?: string
    }) {
        return new Promise((resolve => {
            editCurrentUserService(params).then(() => {
                this.me().then()
                CommonModule.toast({
                    content: 'Profile update successful',
                    color  : ToastColor.SUCCESS
                })
                resolve()
            })
        }))
    }

    @Action
    editCurrentUserSetting(params: {
        currency: Currency
    }) {
        return new Promise((resolve => {
            editCurrentUserSettingService(params).then(() => {
                this.me().then()
                CommonModule.toast({content: 'Edit User Setting Successful', color: ToastColor.SUCCESS})
                resolve()
            })
        }))
    }

}

export const UserModule = getModule(UserModulePrivate)