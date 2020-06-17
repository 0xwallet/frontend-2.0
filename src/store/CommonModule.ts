import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {store} from './index'
import {Toast, ToastColor} from '@/store/model/Toast'

@Module({
    dynamic: true,
    name   : 'CommonModule',
    store
})
class CommonModulePrivate extends VuexModule {

    toasts: Array<Toast> = []

    globalLoading = true
    pageLoading = true

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
     * 显示页面加载
     */
    @Mutation
    showPageLoading() {
        this.pageLoading = true
    }

    /**
     * 隐藏页面加载
     */
    @Mutation
    hidePageLoading() {
        this.pageLoading = false
    }

    /**
     * 全局Toast提示
     * @param content
     * @param color
     */
    @Mutation
    toast(content: string, color: ToastColor = ToastColor.SECONDARY) {
        this.toasts.push({
            content: content,
            color  : color
        })
    }

}

export const CommonModule = getModule(CommonModulePrivate)