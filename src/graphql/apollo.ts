import Vue from 'vue'
import VueApollo from 'vue-apollo'
import {HttpLink} from "apollo-link-http"
import {ApolloLink, NextLink, Operation} from "apollo-link"
import {onError} from "apollo-link-error"
import {InMemoryCache, IntrospectionFragmentMatcher, NormalizedCacheObject} from "apollo-cache-inmemory"
import {ApolloClient} from "apollo-client"


Vue.use(VueApollo)

const apiLink = new HttpLink({
    uri: 'https://owaf.io/graphiql'
})

const middlewareLink = new ApolloLink((operation: Operation, forward: NextLink) => {
    if (forward === undefined) {
        return null
    }
    operation.setContext({
        headers: {}
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
    }
})

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: []
        }
    }
})

const apolloClient = new ApolloClient({
    link: errorLink.concat(middlewareLink).concat(apiLink),
    cache: new InMemoryCache({fragmentMatcher})
})

export default class Client {
    private static instance: ApolloClient<NormalizedCacheObject> = apolloClient

    private constructor() {
    }

    static getInstance() {
        return this.instance
    }
}