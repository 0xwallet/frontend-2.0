import {meQuery, sendVerifyCodeMutation, signInMutation, signUpMutation} from "@/graphql/userGraphql"
import Client from "@/graphql/apollo"

/**
 * 登录
 */
export const signInService = (param: {
    email: string,
    password?: string,
    code?: string,
}) => Client.getInstance().mutate({
    mutation: signInMutation,
    variables: param
})

/**
 * 获取个人信息
 */
export const meService = () => Client.getInstance().query({
    query: meQuery
})

/**
 * 获取验证码
 */
export const sendVerifyCodeService = (param: {
    email: string
}) => Client.getInstance().mutate({
    mutation: sendVerifyCodeMutation,
    variables: param
})

/**
 *
 */
export const signUpService = (params: {
    userName: string,
    password: string,
    email: string,
    code: string
}) => Client.getInstance().mutate({
    mutation: signUpMutation,
    variables: params
})
