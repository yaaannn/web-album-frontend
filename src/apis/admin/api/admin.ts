import request from '../request'
import type { AdminLoginType } from '../types/admin-type'

export const adminLoginAPI = (data: AdminLoginType) => {
    return request.post('v1/admin/login', data)
}

export const getAdminInfoAPI = () => {
    return request.get('v1/admin/info')
}

// 用户相关

export const getUserListAPI = (page: number, pageSize: number) => {
    return request.get(`v1/admin/user/list?page=${page}&page_size=${pageSize}`)
}

export const deleteUserAPI = (id: number) => {
    return request.get(`v1/admin/user/delete?id=${id}`)
}

export const freezeUserAPI = (id: number) => {
    return request.get(`v1/admin/user/freeze?id=${id}`)
}

// 照片相关

export const getPhotoListAPI = (page: number, pageSize: number) => {
    return request.get(`v1/admin/photo/list?page=${page}&page_size=${pageSize}`)
}

export const deletePhotoAPI = (id: number) => {
    return request.get(`v1/admin/photo/delete?id=${id}`)
}

export const auditPhotoAPI = (id: number, status: number) => {
    return request.get(`v1/admin/photo/audit?id=${id}&status=${status}`)
}

// 评论相关

export const getCommentListAPI = (page: number, pageSize: number) => {
    return request.get(`v1/admin/comment/list?page=${page}&page_size=${pageSize}`)
}


// 分区相关

export const getPartitionListAPI = () => {
    return request.get('v1/partition/list')
}

export const createPartitionAPI = (name: string) => {
    return request.post('v1/partition/create', { name })
}

export const updatePartitionAPI = (id: number, name: string) => {
    return request.post('v1/partition/update', { id, name })
}

export const deletePartitionAPI = (id: number) => {
    return request.post(`v1/partition/delete`,{ id })
}

// 敏感词相关

export const getSensitiveWordListAPI = () => {
    return request.get('v1/public/sensitive/list')
}

export const addSensitiveWordAPI = (word: string) => {
    return request.post('v1/public/sensitive/add', {"keyword": word })
}