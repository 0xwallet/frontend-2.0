import gql from 'graphql-tag'


export const bindNknAddressMutation = gql`
    mutation bindNknAddress($nknAddress:String!){
        bindNknAddress(nknAddress:$nknAddress){
            id
        }
    }
`

export const setDefaultNknAddressMutation = gql`
    mutation setDefaultNknAddress($loginCode:String,$password:String!,$tag:WalletTag!,$walletId:ID!){
        setDefaultNknAddress(loginCode:$loginCode,password:$password,tag:$tag,walletId:$walletId){
            id
        }
    }
`

export const deleteWalletMutation = gql`
    mutation deleteWallet($id:ID!){
        deleteWallet(id:$id){
            id
        }
    }
`

export const sendLoginCodeMutation = gql`
    mutation sendLoginCode($email:String!,$walletId: ID){
        sendLoginCode(email:$email,walletId:$walletId)
    }
`

