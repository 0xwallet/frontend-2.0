import gql from 'graphql-tag'

export const signInMutation = gql`
    mutation signIn($email:String!,$password:String,$code:String){
        signin(email:$email,password:$password,code:$code){
            token
        }
    }
`

export const meQuery = gql`
    query me{
        me{
            id
            username
            bio
            avatar
            email
            lastLoginAt
            loginNknAddress
            messageNknAddress
            role
            type
            wallets{
                id
                description
                info{
                    address
                    identifier
                    publicKey
                }
                tags
                type
            }
        }
    }
`

export const signUpMutation = gql`
    mutation signUp($userName:String!,$password:String!,$email:String!,$code:String!){
        signup(username:$userName,password:$password,email:$email,code:$code){
            token
        }
    }
`

export const sendVerifyCodeMutation = gql`
    mutation sendVerifyCode($email:String!,$type:VerifyCodeType = ACTIVE_EMAIL){
        sendVerifyCode(email:$email,type:$type)
    }
`



