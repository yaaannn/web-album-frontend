export interface UserLoginType {
    username: string
    password?: string
    code?: string
}

export interface UserRegisterType {
    email: string
    password: string
    username: string
}

export interface UserInfoType {
    id: number,
    username: string
    email: string
    mobile?: string
    nickname?: string
    regions?: string
    avatar?: string
    birthday: string
    gender?: string
    create_time?: number
    cover?: string
}


export interface ResetPasswordType {
    email: string
    new_password: string
    code: string //验证码
}

export interface ModifyUserInfoType {
    nickname: string,
    gender: string,
    regions: string,
    avatar: string,
    birthday: string,

}
