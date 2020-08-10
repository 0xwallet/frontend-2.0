import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {store} from './index'
import {
    bindNknAddressService,
    deleteWalletService,
    sendLoginCodeService,
    setDefaultNknAddressService
} from '@/service/NknService'
import {Wallet, WalletTag} from '@/store/model/Wallet'
import {UserModule} from '@/store/UserModule'

const nkn = require('nkn-sdk/dist/nkn.js')


@Module({
    dynamic: true,
    name   : 'NknModulePrivate',
    store
})
class NknModulePrivate extends VuexModule {

    connected: boolean = false
    nknClient: any = null
    session: any = null


    @Mutation
    setNknClient(client: any) {
        this.nknClient = client
    }

    @Mutation
    setNknConnectStatus(status: boolean) {
        this.connected = status
    }

    @Mutation
    setSession(session: any) {
        this.session = session
    }

    @Action
    getNknClient(params: {
        seed?: string
    }) {
        return new nkn.MultiClient({numSubClients: 4, seed: params.seed})
    }

    @Action
    bindNknAddress(params: {
        nknAddress: string,
        code?: string,
        tag?: WalletTag
    }) {
        return new Promise(((resolve: (wallet: Wallet) => void, reject) => {
            bindNknAddressService(params).then(res => {
                UserModule.me().then()
                resolve(res.data.bindNknAddress)
            }).catch(error => reject(error))
        }))
    }

    @Action
    connectNkn() {
        let seed = localStorage.getItem('nkn-seed')
        if (seed) {
            this.getNknClient({
                seed: seed
            }).then(async (cli: any) => {
                console.log(UserModule.userInfo)
                console.log('当前使用NKN:', cli)
                await new Promise((resolve => {
                    cli.onConnect(async () => {
                        resolve()
                        this.setNknClient(cli)
                        this.setNknConnectStatus(true)
                        let session = await cli.dial('file.33ed3f20f423dfa816ebd8c33f05523170b7ba86a78d5b39365bfb57db443f6c')
                        console.log(session)
                        this.setSession(session)
                    })
                }))
            })
        }
    }

    @Action
    uploadFile(file: any) {
        let timeStart = Date.now()

        let fileSize = 0
        const writeChunkSize = 1024
        let client = this.nknClient
        let _this = this
        let fileName = file.name


        if (file) {
            fileSize = file.size
            reading()
        }

        function reading() {
            let reader = new FileReader()
            let result: any
            reader.onload = async function () {
                result = this.result
                await write(result)
            }
            reader.readAsArrayBuffer(file)
        }


        async function write(contents: any) {
            // let buffer = new Uint8Array(contents)
            // let bufT = new Buffer(4)
            // console.log(contents)
            let array = new Uint8Array(contents)
            console.log(array)

            let buffer = new ArrayBuffer(4)
            let dv = new DataView(buffer)
            dv.setUint32(0, fileSize, true)
            await _this.session.write(new Uint8Array(buffer))

            buffer = Buffer.from(fileName)
            buffer = new Uint8Array(buffer)
            let bufferLength = buffer.byteLength
            let tmpBuf = new ArrayBuffer(4)
            dv = new DataView(tmpBuf)
            dv.setUint32(0, bufferLength, true)
            await _this.session.write(new Uint8Array(tmpBuf))

            await _this.session.write(buffer)

            let buf!: Uint8Array
            for (let n = 0; n < fileSize; n += buf.length) {
                buf = new Uint8Array(Math.min(fileSize - n, writeChunkSize))
                // console.log(buf)
                for (let i = 0; i < buf.length; i++) {
                    buf[i] = array[i + n]
                }

                await _this.session.write(buf)
                if (Math.floor((n + buf.length) * 10 / fileSize) !== Math.floor(n * 10 / fileSize)) {
                    console.log(_this.session.localAddr, 'sent', n + buf.length, 'bytes',
                        (n + buf.length) / (1 << 20) / (Date.now() - timeStart) * 1000, 'MB/s')
                }
            }
        }

        function byteAt(n: number) {
            return n % 256
        }
    }

    @Action
    setDefaultNknAddress(params: {
        loginCode?: string,
        password: string,
        tag: WalletTag,
        walletId: string | number,
    }) {
        console.log('setDefault')
        console.log(params)
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
            this.getNknClient({}).then((cli: any) => {
                this.bindNknAddress({
                    nknAddress: cli.addr,
                    tag       : WalletTag.MESSAGE,
                }).then((res) => {
                    this.setDefaultNknAddress({
                        password: params.password,
                        tag     : WalletTag.MESSAGE,
                        walletId: res.id
                    }).then(() => {
                        // 存起来
                        localStorage.setItem('nkn-seed', cli.key.seed)
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