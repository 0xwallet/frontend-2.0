import gql from 'graphql-tag'

export const organizationsQuery = gql`
    query origanizations($page : Int!, $size : Int, $userId : ID!){
        organizations(pageNumber: $page,pageSize: $size,userId: $userId){
            pageCount
            pageNumber
            pageSize
            totalCount
            results{
                id
                info{
                    country
                }
                name
            }
        }
    }
`

export const createOrganizationMutation = gql`
    mutation createOriganization($info : OrganizationInfoInput, $name : String!){
        createOrganization(name: $name,info: $info){
            id
        }
    }
`

