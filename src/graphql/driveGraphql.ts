import gql from 'graphql-tag'

export const eyeblueUserInfoQuery = gql`
    query eyeblueUserInfo {
        eyeblueUserInfo {
            cookie
            sizeLimit
            totalSize
            totalSizeLimit
            uuid
        }
    }
`