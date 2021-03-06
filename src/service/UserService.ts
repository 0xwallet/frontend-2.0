import {
    drivePreviewTokenMutation,
    editCurrentUserMutation,
    editCurrentUserSettingMutation,
    meQuery,
    sendVerifyCodeMutation,
    signInMutation,
    signUpMutation
} from '@/graphql/userGraphql'
import Client from '@/graphql/apollo'
import {Currency, PersonalInfoInput} from '@/store/model/User'

/**
 * 登录
 */
export const signInService = (param: {
    email: string,
    password?: string,
    code?: string,
}) => Client.getInstance().mutate({
    mutation : signInMutation,
    variables: param
})

/**
 * 获取个人信息
 */
export const meService = () => Client.getInstance()
                                     .query({
                                         query      : meQuery,
                                         fetchPolicy: 'network-only'
                                     })

/**
 * 获取验证码
 */
export const sendVerifyCodeService = (param: {
    email: string
    type?: string
}) => Client.getInstance().mutate({
    mutation : sendVerifyCodeMutation,
    variables: param
})

/**
 * 注册
 */
export const signUpService = (params: {
    userName: string,
    password: string,
    email: string,
    code: string,
    nknEncryptedWallet: string,
    nknPublicKey: string
}) => Client.getInstance().mutate({
    mutation : signUpMutation,
    variables: params
})


/**
 * 修改当前用户信息
 */
export const editCurrentUserService = (params: {
    avatar?: string,
    bio?: string,
    personalInfo?: PersonalInfoInput,
    userName?: string
}) => Client.getInstance().mutate({
    mutation : editCurrentUserMutation,
    variables: params
})

export const editCurrentUserSettingService = (params: {
    currency: Currency
}) => Client.getInstance().mutate({
    mutation : editCurrentUserSettingMutation,
    variables: params
})

export const drivePreviewTokenService = () => Client.getInstance().mutate({
    mutation: drivePreviewTokenMutation
})
