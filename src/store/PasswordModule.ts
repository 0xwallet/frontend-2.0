import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {store} from './index'

@Module({
    dynamic: true,
    name   : 'PasswordModule',
    store
})
class PasswordModulePrivate extends VuexModule {
    show = false
    title = ''
    content = ''
    callback: any = {}

    @Mutation
    setHide(){
        this.show = false
    }

    @Mutation
    setPasswordComponent(params: {
        show: boolean,
        title: string,
        content: string,
        callback: any,
    }) {
        this.show = true
        this.title = params.title
        this.content = params.content
        this.callback = params.callback
    }

}

export const PasswordModule = getModule(PasswordModulePrivate)