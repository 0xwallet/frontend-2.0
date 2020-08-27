import Client from '@/graphql/apollo'
import {DriveSpace} from '@/store/model/File'
import {driveListFilesQuery, driveUploadByHashMutation} from '@/graphql/driveGraphql'

export const driveListFilesService = (param: {
    parentID?: string,
    space: DriveSpace,
}) => Client.getInstance().query({
    query    : driveListFilesQuery,
    variables: param
})


export const driveUploadByHashService = (param: {
    fullName: string[],
    hash: string,
    space: DriveSpace,
}) => Client.getInstance().mutate({
    mutation : driveUploadByHashMutation,
    variables: param
})