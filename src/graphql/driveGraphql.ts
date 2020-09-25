import gql from 'graphql-tag'

export const driveListFilesQuery = gql`
    query driveListFiles($dirFullName : [String], $dirId : String, $space: DriveSpace){
        driveListFiles(dirFullName: $dirFullName,dirId: $dirId, space: $space){
            id
            fullName
            hash
            isDir
            space
            info{
                size
            }
            updatedAt
            insertedAt
        }
    }
`

export const driveUploadByHashMutation = gql`
    mutation driveUploadByHash($fullName:[String]!,$hash: String!,$space:DriveSpace!){
        driveUploadByHash(fullName:$fullName,hash:$hash,space:$space){
            id
        }
    }
`

export const driveDeleteFileMutation = gql`
    mutation driveDeleteFile($id : String!,$space : DriveSpace!){
        driveDeleteFile(id: $id, space: $space)
    }
`

export const driveDeleteFilesMutation = gql`
    mutation driveDeleteFiles($ids : [String]!,$space : DriveSpace!){
        driveDeleteFiles(ids: $ids, space: $space)
    }
`

export const driveMoveFileMutation = gql`
    mutation driveMoveFile($fromId : String!, $toId : String!){
        driveMoveFile(fromId: $fromId,toId: $toId)
    }
`

export const driveCreateShareMutation = gql`
    mutation driveCreateShare($code : String!, $userFileId : String!){
        driveCreateShare(code: $code, userFileId: $userFileId){
            id
            token
            uri
        }
    }
`

export const driveFindShareQuery = gql`
    query driveFindShare($code : String, $uri : String!){
        driveFindShare(code: $code, uri: $uri){
            id
            uri
            token
            expiredAt
            user{
                id
                avatar
                username
                bio
            }
            userFile{
                id
                hash
                info{
                    size
                }
                space
                fullName
            }
        }
    }
`

export const driveListSharesQuery = gql`
    query driveListShares{
        driveListShares{
            id
            token
            uri
            userFile{
                id
                fullName
            }
            expiredAt
            code
        }
    }
`

export const driveMakeDirUnderMutation = gql`
    mutation driveMakeDirUnder($fullName : [String]!, $space : DriveSpace){
        driveMakeDir(fullName: $fullName,space: $space){
            id
        }
    }
`