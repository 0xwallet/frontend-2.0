import {User} from './User'

export class Wallet {
    description?: string
    id!: string
    info!: WalletInfo
    tags?: WalletTag[]
    type!: WalletType
    user!: User
    show!: boolean
    name: string = 'No Name'
}

export class WalletInfo {
    address?: string
    identifier?: string
    publicKey?: string
}

export enum WalletTag {
    LOGIN_CODE = 'LOGIN_CODE',
    MESSAGE    = 'MESSAGE'
}

export enum WalletType {
    NKN = 'NKN',
    BSV = 'BSV'
}