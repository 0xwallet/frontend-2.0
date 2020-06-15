import {User} from "./User"

export class Wallet {
    description?: string
    id !: string
    info!: WalletInfo
    tags?: WalletTag[]
    type!: WalletType
    user!: User
}

export class WalletInfo {
    address?: string
    identifier?: string
    publicKey?: string
}

export enum WalletTag {
    // eslint-disable-next-line no-unused-vars
    LOGIN_CODE = 'LOGIN_CODE',
    // eslint-disable-next-line no-unused-vars
    MESSAGE = 'MESSAGE'
}

export class WalletType {
    // eslint-disable-next-line no-unused-vars
    NKN = 'NKN'
}