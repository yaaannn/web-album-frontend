import request from '../request'
import type { AdminLoginType } from '../types/admin-type'

export const adminLoginAPI = (data: AdminLoginType) => {
    return request.post('v1/admin/login', data)
}

export const getAdminInfoAPI = () => {
    return request.get('v1/admin/info')
}

export const getUserListAPI = (page: number, pageSize: number) => {
    return request.get(`v1/admin/user/list?page=${page}&page_size=${pageSize}`)
}

export const deleteUserAPI = (id: number) => {
    return request.get(`v1/admin/user/delete?id=${id}`)
}

export const freezeUserAPI = (id: number) => {
    return request.get(`v1/admin/user/freeze?id=${id}`)
}

export const getPhotoListAPI = (page: number, pageSize: number) => {
    return request.get(`v1/admin/photo/list?page=${page}&page_size=${pageSize}`)
}

export const deletePhotoAPI = (id: number) => {
    return request.get(`v1/admin/photo/delete?id=${id}`)
}

export const getCommentListAPI = (page: number, pageSize: number) => {
    return request.get(`v1/admin/comment/list?page=${page}&page_size=${pageSize}`)
}