import {getModule, Module, VuexModule, Action, Mutation} from "vuex-module-decorators"
import {store} from './index'

@Module({
    dynamic: true,
    name: 'UserModule',
    store
})
class CommonModulePrivate extends VuexModule {

    toasts: Array<string> = []

    /**
     * 全局Toast提示
     * @param content
     */
    @Mutation
    toast(content: string) {
        this.toasts.push(content)
    }

}

export const CommonModule = getModule(CommonModulePrivate)