import {HttpLink} from 'apollo-link-http'
import {ApolloLink, NextLink, Operation, split} from 'apollo-link'
import {onError} from 'apollo-link-error'
import {InMemoryCache, IntrospectionFragmentMatcher, NormalizedCacheObject} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {UserModule} from '@/store/UserModule'
import {CommonModule} from '@/store/CommonModule'
import {ToastColor} from '@/store/model/Toast'
import {getMainDefinition} from 'apollo-utilities'

import * as AbsintheSocket from '@absinthe/socket'
import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link'
import {Socket as PhoenixSocket} from 'phoenix'

const apiLink = new HttpLink({
    uri: process.env.VUE_APP_BASE_URL
})

const wsLink = createAbsintheSocketLink(AbsintheSocket.create(
    new PhoenixSocket('wss://owaf.io/socket', {
        params: () => {
            if (localStorage.getItem('auth-token')) {
                return {Authorization: localStorage.getItem('auth-token')}
            } else {
                return {}
            }
        }
    })
))

const middlewareLink = new ApolloLink((operation: Operation, forward: NextLink) => {
    if (forward === undefined) {
        return null
    }
    operation.setContext({
        headers: {
            'Authorization': UserModule.token ? 'Bearer ' + UserModule.token : '',
        }
    })
    return forward(operation)
})

const errorLink = onError(({
                               networkError,
                               response
                           }) => {
    let errorMsg = ''
    if (!!response && response.errors !== undefined && response.errors.length) {
        errorMsg = !response.errors[0].message ? '服务器错误' : response.errors[0].message
    }
    if (networkError) {
        errorMsg = networkError.message
    }
    if (errorMsg) {
        // 全局异常消息
        if (errorMsg == 'file hash not found') {
            return
        }
        CommonModule.toast({
            content: errorMsg,
            color  : ToastColor.DANGER
        })
    }
})

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: []
        }
    }
})

const link = split(
    ({query}) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
    },
    // @ts-ignore
    middlewareLink.concat(wsLink),
    errorLink.concat(middlewareLink).concat(apiLink)
)

const apolloClient = new ApolloClient({
    link             : link,
    cache            : new InMemoryCache({fragmentMatcher}),
    connectToDevTools: true,
})


export default class Client {
    private static instance: ApolloClient<NormalizedCacheObject> = apolloClient

    private constructor() {
    }

    static getInstance() {
        return this.instance
    }
}

