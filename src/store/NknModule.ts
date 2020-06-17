import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators'
import {store} from './index'
import {
    bindNknAddressService,
    deleteWalletService,
    sendLoginCodeService,
    setDefaultNknAddressService
} from '@/service/NknService'
import {Wallet, WalletTag} from '@/store/model/Wallet'
import {UserModule} from '@/store/UserModule'

const nkn = require('nkn-client/dist/nkn.js')

@Module({
    dynamic: true,
    name   : 'NknModulePrivate',
    store
})
class NknModulePrivate extends VuexModule {

    @Action
    getNknClient() {
        return nkn()
    }

    @Action
    bindNknAddress(params: { nknAddress: string }) {
        return new Promise(((resolve: (wallet: Wallet) => void, reject) => {
            bindNknAddressService(params).then(res => {
                UserModule.me().then()
                resolve(res.data.bindNknAddress)
            }).catch(error => reject(error))
        }))
    }

    @Action
    setDefaultNknAddress(params: {
        loginCode?: string,
        password: string,
        tag: WalletTag,
        walletId: string | number,
    }) {
        return new Promise(((resolve: (wallet: Wallet) => void, reject) => {
            setDefaultNknAddressService(params).then(res => {
                UserModule.me().then()
                resolve(res.data.setDefaultNknAddress)
            }).catch(error => reject(error))
        }))
    }


    @Action
    bindAndSetDefault(params: {
        password: string,
        loginCode?: string,
    }) {
        return new Promise(((resolve, reject) => {
            this.getNknClient().then((res: any) => {
                this.bindNknAddress({
                    nknAddress: res.addr
                }).then((res) => {
                    this.setDefaultNknAddress({
                        password: params.password,
                        tag     : WalletTag.MESSAGE,
                        walletId: res.id
                    }).then(() => {
                        resolve()
                    }).catch(error => reject(error))
                }).catch(error => reject(error))
            })
        }))
    }

    @Action
    deleteWallet(param: {
        id: string
    }) {
        return new Promise(((resolve, reject) => {
            deleteWalletService(param).then(() => {
                UserModule.me().then()
                resolve()
            }).catch(error => reject(error))
        }))
    }

    @Action
    sendLoginCode(params: {
        email: string
        walletId?: string
    }) {
        return new Promise((resolve => {
            sendLoginCodeService(params).then(() => {
                resolve()
            })
        }))
    }

}

export const NknModule = getModule(NknModulePrivate)