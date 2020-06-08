import {getModule, Module, VuexModule, Action, Mutation} from "vuex-module-decorators"
import {store} from './index'

@Module({
    dynamic: true,
    name: 'CommonModule',
    store
})
class CommonModulePrivate extends VuexModule {

    toasts: Array<string> = []

    globalLoading = true

    /**
     * 显示全局加载
     */
    @Mutation
    showLoading() {
        this.globalLoading = true
    }

    /**
     * 隐藏全局加载
     */
    @Mutation
    hideLoading() {
        this.globalLoading = false
    }

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