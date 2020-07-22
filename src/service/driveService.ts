import Client from '@/graphql/apollo'
import {eyeblueUserCookieQuery} from '@/graphql/driveGraphql'

export const eyeblueUserCookieService = () =>
    Client.getInstance().query({
        query: eyeblueUserCookieQuery
    })