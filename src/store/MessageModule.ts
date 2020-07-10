import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {store} from '@/store/index'

@Module({
    dynamic: true,
    name   : 'MessageModulePrivate',
    store
})
class MessageModulePrivate extends VuexModule {

    messageModalShow = false
    msgIconPosition = {
        left: 0,
        top : 0
    }
    msgIcon: any

    @Mutation
    setMsgIcon(msgIcon: any) {
        this.msgIcon = msgIcon
    }

    @Mutation
    getMsgIconLeftAndTop() {
        this.msgIconPosition.left = MsgIconUtils.getElementLeft(this.msgIcon)
        this.msgIconPosition.top = MsgIconUtils.getElementTop(this.msgIcon)
    }

    @Mutation
    showMessageModal(show: boolean) {
        this.messageModalShow = show
    }

}

class MsgIconUtils {

    static getElementTop(element: any) {
        let top = element.offsetTop
        let current = element.offsetParent
        while (current !== null) {
            top += current.offsetTop
            current = current.offsetParent
        }
        return top
    }

    static getElementLeft(element: any) {
        let left = element.offsetLeft
        let current = element.offsetParent
        while (current !== null) {
            left += current.offsetLeft
            current = current.offsetParent
        }
        return left
    }
}

export const MessageModule = getModule(MessageModulePrivate)