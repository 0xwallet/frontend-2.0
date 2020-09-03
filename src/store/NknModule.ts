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
import has = Reflect.has
import {PasswordModule} from '@/store/PasswordModule'

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
        seed?: string,
        password?: string
    }) {
        return params.password ? new nkn.Wallet({
            seed    : params.seed,
            password: params.password,
        }) : new nkn.MultiClient({
            numSubClients: 4, seed: params.seed,
        })
    }

    @Action
    bindNknAddress(params: {
        nknAddress: string,
        encryptedWallet?: string,
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
        console.log('正在连接nkn服务器')
        if (!this.nknClient) {
            let seed = localStorage.getItem('nkn-seed')
            if (seed) {
                console.log('当前存在SEED，使用SEED创建连接')
                this.getAndSetNknClient(seed)
            } else {
                console.log('当前不存在SEED')
                let hasMsgWallet: boolean = false
                let msgWallet: Wallet = new Wallet()
                UserModule.userInfo.wallets?.forEach((wallet: Wallet) => {
                    wallet.tags!!.some(tag => {
                        if (tag == WalletTag.MESSAGE) {
                            msgWallet = wallet
                            hasMsgWallet = true
                            return true
                        }
                        return false
                    })
                })
                if (hasMsgWallet) {
                    // 当前存在MessageWallet
                    if (!msgWallet.info?.encryptedWallet || msgWallet.info.encryptedWallet.length < 10) {
                        // 服务器上的钱包数据异常，需要重写创建一个钱包，需要提示用户输入密码
                        console.log('当前服务器的MessageWallet无法正常使用，将重新创建，需要提示用户输入密码')
                        PasswordModule.setPasswordComponent({
                            show    : true,
                            title   : 'Please enter your password',
                            content : 'Since it was detected that you have changed the device or cleared the cache, please re-enter the password',
                            callback: (password: string) => {
                                console.log(password)
                                this.bindAndSetDefault({
                                    password: password,
                                }).then(() => {
                                    console.log('重新创建MessageWallet成功')
                                })
                            }
                        })
                    } else {
                        console.log('当前服务器的MessageWallet能正常使用，将直接解密，需要提示用户输入密码')
                        PasswordModule.setPasswordComponent({
                            show    : true,
                            title   : 'Please enter your password',
                            content : 'Since it was detected that you have changed the device or cleared the cache, please re-enter the password',
                            callback: (password: string) => {
                                let wallet = nkn.Wallet.fromJSON(msgWallet.info.encryptedWallet, {password: password})
                                console.log('解密后的Wallet', wallet)
                                let seed = wallet.account.key.seed
                                localStorage.setItem('nkn-seed', seed)
                                this.getAndSetNknClient(seed)
                            }
                        })
                    }
                } else {
                    console.log('当前服务器不存在MessageWallet，将使用密码创建，需要提示用户输入密码', msgWallet)
                    PasswordModule.setPasswordComponent({
                        show    : true,
                        title   : 'Please enter your password',
                        content : 'Since it was detected that you have changed the device or cleared the cache, please re-enter the password',
                        callback: (password: string) => {
                            console.log(password)
                            this.bindAndSetDefault({
                                password: password,
                            }).then(() => {
                                console.log('重新创建MessageWallet成功')
                            })
                        }
                    })
                }
            }
        }
    }

    @Action
    getAndSetNknClient(seed: string) {
        this.getNknClient({
            seed: seed
        }).then(async (cli: any) => {
            console.log(UserModule.userInfo)
            console.log('当前使用NKN:', cli)
            console.log('当前使用NKN pubkey:', cli.getPublicKey())
            cli.shouldReconnect = true

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
            console.log('NKN服务器连接成功：', this.nknClient)
        })
    }

    @Action
    uploadFile({file, paths, space}:{
        file: any, paths: string[], space: DriveSpace
    } ) {
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

            let array = new Uint8Array(contents)
            console.log(array)


            let wordArray = CryptoJS.lib.WordArray.create(array)
            let hash = CryptoJS.SHA256(wordArray).toString()
            // console.log('hash', hash)

            let fullName = paths
            fullName.push(fileName)

            DriveModule.driveUploadByHash({
                fullName: fullName,
                hash    : hash,
                space   : space,
            }).then(() => CommonModule.toast({content: '上传成功'})
            ).catch(async () => {
                let session = await _this.nknClient.dial('file.33ed3f20f423dfa816ebd8c33f05523170b7ba86a78d5b39365bfb57db443f6c')

                const object = {
                    File    : array,
                    FullName: fullName,
                    FileSize: fileSize,
                    UserId  : UserModule.userInfo.id,
                    Space   : space
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
            this.getNknClient({password: params.password}).then((cli: any) => {
                console.log('成功创建NknClient', cli)
                // 这里获取到了加密后的NknClient
                let walletJson = JSON.stringify(cli.toJSON())
                console.log('加密后的walletJson为：', walletJson)
                let seed = cli.account.key.seed
                let address = cli.getPublicKey()

                this.bindNknAddress({
                    encryptedWallet: walletJson,
                    nknAddress     : address,
                    tag            : WalletTag.MESSAGE,
                }).then((res) => {
                    this.setDefaultNknAddress({
                        password: params.password,
                        tag     : WalletTag.MESSAGE,
                        walletId: res.id
                    }).then(() => {
                        // 存起来
                        this.getAndSetNknClient(seed)
                        localStorage.setItem('nkn-seed', seed)
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