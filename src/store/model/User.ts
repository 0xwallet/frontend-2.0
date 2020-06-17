import {Wallet} from "@/store/model/Wallet"

export class User {
    avatar?: string
    bio?: string
    email!: string
    lastLoginAt?: string
    loginNknAddress?: string
    messageNknAddress?: string
    role?: string
    type!: string
    username!: string
    wallets?: Wallet[]
}