import Client from '@/graphql/apollo'
import {DriveSpace} from '@/store/model/File'
import {
    driveCreateShareMutation,
    driveDeleteFileMutation,
    driveDeleteFilesMutation, driveFindShareQuery,
    driveListFilesQuery, driveListSharesQuery, driveMakeDirUnderMutation, driveMoveFileMutation,
    driveUploadByHashMutation
} from '@/graphql/driveGraphql'

export const driveListFilesService = (param: {
    dirFullName?: string[],
    dirId?: string,
    space: DriveSpace,
}) => Client.getInstance().query({
    query      : driveListFilesQuery,
    variables  : param,
    fetchPolicy: 'network-only'
})


export const driveUploadByHashService = (param: {
    fullName: string[],
    hash: string,
    space: DriveSpace,
    description: string
}) => Client.getInstance().mutate({
    mutation : driveUploadByHashMutation,
    variables: param
})

export const driveDeleteFileService = (params: {
    id: string,
    space: DriveSpace,
}) => Client.getInstance().mutate({
    mutation : driveDeleteFileMutation,
    variables: params,
})


export const driveDeleteFilesService = (params: {
    ids: string[],
    space: DriveSpace,
}) => Client.getInstance().mutate({
    mutation : driveDeleteFilesMutation,
    variables: params,
})


export const driveMoveFileService = (params: {
    fromId: string,
    toId: string
}) => Client.getInstance().mutate({
    mutation : driveMoveFileMutation,
    variables: params,
})

export const driveCreateShareService = (params: {
    code: string,
    userFileId: string
}) => Client.getInstance().mutate({
    mutation : driveCreateShareMutation,
    variables: params
})

export const driveFindShareService = (params: {
    code: string,
    uri: string
}) => Client.getInstance().query({
    query    : driveFindShareQuery,
    variables: params
})

export const driveListSharesService = () => Client.getInstance().query({
    query      : driveListSharesQuery,
    fetchPolicy: 'network-only'
})

export const driveMakeDirService = (params: {
    fullName: string[],
    space: DriveSpace,
}) => Client.getInstance().mutate({
    mutation : driveMakeDirUnderMutation,
    variables: params
})