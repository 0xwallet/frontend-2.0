import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {store} from '@/store/index'
import {EyeblueUserInfo} from '@/store/model/EyeBlue'
import {eyeblueUserCookieService} from '@/service/DriveService'

@Module({
    dynamic: true,
    name   : 'DriveModule',
    store
})
class DriveModulePrivate extends VuexModule {

    eyeblueUserInfo !: EyeblueUserInfo

    @Mutation
    setEyeblueUserInfo(eyeblueUserInfo: EyeblueUserInfo) {
        this.eyeblueUserInfo = eyeblueUserInfo
    }

    @Action
    getEyeblueUserInfo() {
        return new Promise((resolve => {
            eyeblueUserCookieService().then(res => {
                this.setEyeblueUserInfo(res.data.eyeblueUserInfo)
                resolve()
            })
        }))
    }
}

export const DriveModule = getModule(DriveModulePrivate)