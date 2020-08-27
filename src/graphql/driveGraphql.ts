import gql from 'graphql-tag'

export const driveListFilesQuery = gql`
    query driveListFiles($parentId : ID, $space: DriveSpace){
        driveListFiles(parentId: $parentId, space: $space){
            id
            fullName
            hash
            isDir
            space
            info{
                size
            }
            updatedAt
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