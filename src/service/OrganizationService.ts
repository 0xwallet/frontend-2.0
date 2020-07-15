import Client from '@/graphql/apollo'
import {createOrganizationMutation, organizationsQuery} from '@/graphql/organization'
import {OrganizationInfoInput} from '@/store/model/Organization'

export const createOrganizationService = (params: {
    info: OrganizationInfoInput,
    name: string,
}) => Client.getInstance().mutate({
    mutation : createOrganizationMutation,
    variables: params,
})

export const organizationsQueryService = (params: {
    page: number,
    size: number,
    userId: string,
}) => Client.getInstance().query({
    query    : organizationsQuery,
    variables: params
})