import Client from '@/graphql/apollo'
import {DriveSpace} from '@/store/model/File'
import {
    driveDeleteFileMutation,
    driveDeleteFilesMutation,
    driveListFilesQuery, driveMoveFileMutation,
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