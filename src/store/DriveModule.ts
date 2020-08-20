import {getModule, Module, VuexModule} from 'vuex-module-decorators'
import {store} from '@/store/index'

@Module({
    dynamic: true,
    name   : 'DriveModule',
    store
})
class DriveModulePrivate extends VuexModule {

}

export const DriveModule = getModule(DriveModulePrivate)