import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators"
import {store} from './index'
import {bindNknAddressService, setDefaultNknAddressService} from "@/service/NknService"
import {Wallet} from "@/store/model/Wallet"

const nkn = require('nkn-client/dist/nkn.js')

@Module({
    dynamic: true,
    name: 'NknModulePrivate',
    store
})
class NknModulePrivate extends VuexModule {

    @Action
    getNknClient(userName: string) {
        let client = nkn({
            identifier: userName
        })
        console.log(client)
        return client
    }

    @Action
    bindNknAddress(params: { nknAddress: string }) {
        return new Promise(((resolve: (wallet: Wallet) => void, reject) => {
            bindNknAddressService(params).then(res => {
                resolve(res.data.bindNknAddress)
            }).catch(error => reject(error))
        }))
    }

    @Action
    setDefaultNknAddress(params: {
        loginCode?: string,
        password: string,
        tag: string,
        walletId: string | number,
    }) {
        return new Promise(((resolve: (wallet: Wallet) => void, reject) => {
            setDefaultNknAddressService(params).then(res => {
                resolve(res.data.setDefaultNknAddress)
            }).catch(error => reject(error))
        }))
    }


    @Action
    async bindAndSetDefault(params: {
        password: string,
        loginCode?: string,
    }) {
        return new Promise(((resolve, reject) => {
            let nknClient = this.getNknClient(params.password)
            this.bindNknAddress({
                nknAddress: nknClient.addr
            }).then((res) => {
                this.setDefaultNknAddress({
                    password: params.password,
                    tag: 'MESSAGE',
                    walletId: res.id
                }).then(() => {
                    resolve()
                }).catch(error => reject(error))
            }).catch(error => reject(error))
        }))
    }


}

export const NknModule = getModule(NknModulePrivate)