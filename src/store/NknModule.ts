import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators"
import {store} from './index'

const nkn = require('nkn-client/dist/nkn.js')

@Module({
    dynamic: true,
    name: 'NknModulePrivate',
    store
})
class NknModulePrivate extends VuexModule {

    @Action
    async getNknClient(password: string) {
        let client = await nkn({
            identifier: password
        })
        console.log(client)
        return client
    }

}

export const NknModule = getModule(NknModulePrivate)