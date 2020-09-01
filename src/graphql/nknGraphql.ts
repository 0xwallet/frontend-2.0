import gql from 'graphql-tag'


export const bindNknAddressMutation = gql`
    mutation bindNknAddress($encryptedWallet: String,$nknAddress:String!,$code: String,$tag : WalletTag = LOGIN_CODE){
        bindNknAddress(encryptedWallet: $encryptedWallet,nknAddress:$nknAddress,code: $code,tag : $tag){
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

