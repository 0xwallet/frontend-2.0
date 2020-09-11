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