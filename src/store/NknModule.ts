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
import {CommonModule} from '@/store/CommonModule'

const nkn = require('nkn-sdk/dist/nkn.js')


@Module({
    dynamic: true,
    name   : 'NknModulePrivate',
    store
})
class NknModulePrivate extends VuexModule {

    connected: boolean = false
    nknClient: any = null
    isUploading: boolean = false
    uploadProgress: number = 0
    uploadSpeed: string = '0KB/s'

    @Mutation
    setUploadSpeed(speed: string) {
        this.uploadSpeed = speed
    }

    @Mutation
    setUploadProgress(number: number) {
        this.uploadProgress = number
    }

    @Mutation
    setUploading(status: boolean) {
        this.isUploading = status
    }

    @Mutation
    setNknClient(client: any) {
        this.nknClient = client
    }

    @Mutation
    setNknConnectStatus(status: boolean) {
        this.connected = status
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


        _this.setUploading(true)

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
            let session = await _this.nknClient.dial('file.33ed3f20f423dfa816ebd8c33f05523170b7ba86a78d5b39365bfb57db443f6c')

            console.log(session)

            let buffer = new ArrayBuffer(4)
            let dv = new DataView(buffer)
            dv.setUint32(0, fileSize, true)
            await session.write(new Uint8Array(buffer))

            buffer = Buffer.from(fileName)
            buffer = new Uint8Array(buffer)
            let bufferLength = buffer.byteLength
            let tmpBuf = new ArrayBuffer(4)
            dv = new DataView(tmpBuf)
            dv.setUint32(0, bufferLength, true)
            await session.write(new Uint8Array(tmpBuf))

            await session.write(buffer)

            let buf!: Uint8Array
            for (let n = 0; n < fileSize; n += buf.length) {
                buf = new Uint8Array(Math.min(fileSize - n, writeChunkSize))
                // console.log(buf)
                for (let i = 0; i < buf.length; i++) {
                    buf[i] = array[i + n]
                }

                await session.write(buf)

                if (Math.floor((n + buf.length) * 10 / fileSize) !== Math.floor(n * 10 / fileSize)) {
                    console.log(session.localAddr, 'sent', n + buf.length, 'bytes',
                        (n + buf.length) / (1 << 20) / (Date.now() - timeStart) * 1000, 'MB/s')

                    let current = n + buf.length
                    _this.setUploadProgress(current / fileSize)

                    let speed: number | string = (n + buf.length) / (1 << 20) / (Date.now() - timeStart) * 1000
                    if (speed > 0.9) {
                        speed = speed + 'MB/s'
                    } else {
                        speed = speed / 1000 + 'KB/s'
                    }
                    _this.setUploadSpeed(speed)
                }
            }
            _this.setUploading(false)
            CommonModule.toast({content: '上传成功'})
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