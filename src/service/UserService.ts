import {meQuery, sendVerifyCodeMutation, signInMutation} from "@/graphql/userGraphql"
import Client from "@/graphql/apollo"

/**
 * 登录
 * @param param { email: 邮箱，password: 密码（可选），code（NKN登录使用）}
 * @return { token }
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

