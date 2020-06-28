import {Wallet} from '@/store/model/Wallet'

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
    personalInfo ?: PersonalInfoInput
}

export class PersonalInfo {
    country ?: string
    creditCard ?: string
    passport ?: string
    phoneNumber ?: string
}

export class PersonalInfoInput {
    country ?: string
    creditCard?: string
    passport?: string
}