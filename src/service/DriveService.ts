import Client from '@/graphql/apollo'
import {eyeblueUserInfoQuery} from '@/graphql/driveGraphql'

export const eyeblueUserCookieService = () =>
    Client.getInstance().query({
        query: eyeblueUserInfoQuery
    })