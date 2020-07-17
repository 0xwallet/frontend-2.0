import Client from '@/graphql/apollo'
import {
    setDefaultNknAddressMutation,
    bindNknAddressMutation,
    deleteWalletMutation,
    sendLoginCodeMutation
} from '@/graphql/nknGraphql'
import {Wallet, WalletTag} from '@/store/model/Wallet'


export const bindNknAddressService = (params: {
    nknAddress: string,
    code?: string,
    tag?: WalletTag
}) => Client.getInstance().mutate({
    mutation : bindNknAddressMutation,
    variables: params
})

export const setDefaultNknAddressService = (params: {
    loginCode?: string,
    password: string,
    tag: WalletTag,
    walletId: string | number,
}) => Client.getInstance().mutate({
    mutation : setDefaultNknAddressMutation,
    variables: params
})

export const deleteWalletService = (params: {
    id: string
}) => Client.getInstance().mutate({
    mutation : deleteWalletMutation,
    variables: params
})

export const sendLoginCodeService = (params: {
    email: string,
    walletId?: string,
}) => Client.getInstance().mutate({
    mutation : sendLoginCodeMutation,
    variables: params
})

