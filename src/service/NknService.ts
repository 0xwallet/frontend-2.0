import Client from "@/graphql/apollo"
import {setDefaultNknAddressMutation, bindNknAddressMutation} from "@/graphql/nknGraphql"

/**
 * 绑定
 * @param params
 */
export const bindNknAddressService = (params: {
    nknAddress: string
}) => Client.getInstance().mutate({
    mutation: bindNknAddressMutation,
    variables: params
})


export const setDefaultNknAddressService = (params: {
    loginCode?: string,
    password: string,
    tag: string,
    walletId: string | number,
}) => Client.getInstance().mutate({
    mutation: setDefaultNknAddressMutation,
    variables: params
})