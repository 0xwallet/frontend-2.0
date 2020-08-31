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
            personalInfo{
                country
                creditCard{
                    month
                    name
                    number
                    securityCode
                    year
                }
                passport
                phoneNumber
            }
            wallets{
                id
                description
                info{
                    encryptedWallet
                    identifier
                    publicKey
                }
                tags
                type
            }
            setting{
                currency\
            }
            driveSetting{
                availableSpace
                totalSpace
                usedSpace
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


export const editCurrentUserMutation = gql`
    mutation editCurrentUser($avatar: String,$code: String, $bio: String, $personalInfo: PersonalInfoInput, $userName:String){
        editCurrentUser(avatar: $avatar, bio: $bio, personalInfo:$personalInfo, username:$userName,code: $code){
            id
        }
    }
`

export const editCurrentUserSettingMutation = gql`
    mutation editCurrentUserSetting($currency : Currency){
        editCurrentUserSetting(currency: $currency){
            currency
        }
    }
`
