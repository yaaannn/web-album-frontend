import request from '../request';
import type { ModifyUserInfoType, ResetPasswordType, UserLoginType, UserRegisterType } from '../types/user-type'

// 登录
export const loginAPI = (login: UserLoginType) => {
    return request.post('v1/user/login', login);
}


// 注册
export const registerAPI = (register: UserRegisterType) => {
    return request.post('v1/user/register', register);
}

export const sendEmailAPI = (email: string) => {
    return request.post('v1/user/send_reset_email', { email });
}
// 获取用户信息
export const getUserInfoAPI = () => {
    return request.get('v1/user/get_user_info');
}


// 重置密码验证
export const resetpwdCheckAPI = (email: string) => {
    return request.get(`v1/user/resetpwd/check?email=${email}`);
}

// 重置密码
export const resetPasswordAPI = (resetPassword: ResetPasswordType) => {
    return request.post('v1/user/reset_password', resetPassword);
}

// 修改用户信息
export const modifyUserInfoAPI = (modifyUserInfo: ModifyUserInfoType) => {
    return request.post('v1/user/modify_user_info', modifyUserInfo);
}

export const getUserInfoByIdAPI = (uid: number) => {
    return request.get(`v1/user/get_user_info_by_id?id=${uid}`);
}