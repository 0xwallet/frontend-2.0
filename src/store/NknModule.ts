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
import {encode} from '@msgpack/msgpack'
import {DriveModule} from '@/store/DriveModule'
import {DriveSpace} from '@/store/model/File'

const nkn = require('nkn-sdk/dist/nkn.js')
const CryptoJS = require('crypto-js/crypto-js.js')


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
    uploadSpeed: string = '0 KB/s'

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
        console.log('nknClient', this.nknClient)
        if (!this.nknClient) {
            let seed = localStorage.getItem('nkn-seed')
            if (seed) {
                this.getNknClient({
                    seed: seed
                }).then(async (cli: any) => {
                    console.log(UserModule.userInfo)
                    console.log('当前使用NKN:', cli)

                    if (!(cli instanceof Array)) {
                        await new Promise((resolve => {
                            cli.onConnect(async () => {
                                resolve()
                                this.setNknClient(cli)
                                this.setNknConnectStatus(true)
                            })
                        }))
                    } else {
                        this.setNknClient(cli[0])
                        this.setNknConnectStatus(true)
                    }
                    console.log('nknClient', this.nknClient)
                })
            } else {
                // 如果不存在SEED, 就重新创建一个

            }
        }
    }

    @Action
    uploadFile(params: {
        file: any, paths: string[], space: string
    }) {
        let timeStart = Date.now()

        let fileSize = 0
        const writeChunkSize = 1024
        let client = this.nknClient
        let _this = this
        let fileName = params.file.name


        _this.setUploading(true)

        if (params.file) {
            fileSize = params.file.size
            reading()
        }

        function reading() {
            let reader = new FileReader()
            let result: any
            reader.onload = async function () {
                result = this.result
                await write(result)
            }
            reader.readAsArrayBuffer(params.file)
        }


        async function write(contents: any) {

            let array = new Uint8Array(contents)
            console.log(array)


            let wordArray = CryptoJS.lib.WordArray.create(array)
            let hash = CryptoJS.SHA256(wordArray).toString()
            // console.log('hash', hash)

            let fullName = params.paths
            fullName.push(fileName)

            DriveModule.driveUploadByHash({
                fullName: fullName,
                hash    : hash,
                space   : DriveSpace.PUBLIC,
            }).then(() => CommonModule.toast({content: '上传成功'})
            ).catch(async () => {
                let session = await _this.nknClient.dial('file.33ed3f20f423dfa816ebd8c33f05523170b7ba86a78d5b39365bfb57db443f6c')

                const object = {
                    File    : array,
                    FullName: fullName,
                    FileSize: fileSize,
                    UserId  : UserModule.userInfo.id,
                    Space   : params.space
                }

                console.log(object)
                const encoded: Uint8Array = encode(object)
                console.log(encoded)

                let buffer = new ArrayBuffer(4)
                let dv = new DataView(buffer)
                dv.setUint32(0, encoded.length, true)

                await session.write(new Uint8Array(buffer))

                // await session.write(encoded)

                let buf!: Uint8Array
                for (let n = 0; n < encoded.length; n += buf.length) {
                    buf = new Uint8Array(Math.min(encoded.length - n, writeChunkSize))
                    for (let i = 0; i < buf.length; i++) {
                        buf[i] = encoded[i + n]
                    }

                    _this.setUploadProgress(n / encoded.length * 100)

                    await session.write(buf)

                    if (Math.floor((n + buf.length) * 10 / encoded.length) !== Math.floor(n * 10 / encoded.length)) {
                        console.log(session.localAddr, 'sent', n + buf.length, 'bytes',
                            (n + buf.length) / (1 << 20) / (Date.now() - timeStart) * 1000000000, 'B/s')


                        let speed: number | string = (n + buf.length) / (1 << 20) / (Date.now() - timeStart) * 1000

                        if (speed > 0.9) {
                            speed = speed + ' MB/s'
                        } else if (speed * 1000 > 0.9) {
                            speed = speed * 1000 + 'KB/s'
                        } else {
                            speed = speed * 1000 * 1000 + 'B/s'
                        }
                        _this.setUploadSpeed(speed)
                    }
                }
                _this.setUploading(false)
                _this.setUploadSpeed('0 KB/s')
                CommonModule.toast({content: '上传成功'})
            })

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