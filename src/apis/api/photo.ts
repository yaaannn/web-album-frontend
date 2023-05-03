import requset from "../request";
import type { UploadPhotoInfoType, UpdatePhotoInfoType } from "../types/photo-type"

export const getPublicPhotoAPI = (page: number, pageSize: number) => {
    return requset.get(`v1/photo/public?page=${page}&page_size=${pageSize}`)
}

export const UploadPhotoInfoAPI = (UploadPhotoInfo: UploadPhotoInfoType) => {
    return requset.post('v1/photo/upload', UploadPhotoInfo)
}

// 获取我的照片
export const getMyPhotoAPI = (page: number, pageSize: number) => {
    return requset.get(`v1/photo/list?page=${page}&page_size=${pageSize}`)
}

// 删除照片
export const deletePhotoAPI = (photoId: number) => {
    return requset.get(`v1/photo/delete?id=${photoId}`)
}

// 获取相册照片
export const getAlbumPhotoAPI = (albumId: number, page: number, pageSize: number) => {
    return requset.get(`v1/photo/album/list?album_id=${albumId}&page=${page}&page_size=${pageSize}`)
}

// 删除相册照片
export const deleteAlbumPhotoAPI = (photoId: number) => {
    return requset.get(`v1/photo/album/delete?id=${photoId}`)
}

// 获取照片信息
export const getPhotoInfoAPI = (photoId: number) => {
    return requset.get(`v1/photo/info?id=${photoId}`)
}

// 获取用户公开照片
export const getPhotoListByUidAPI = (uid: number, page: number, pageSize: number) => {
    return requset.get(`v1/photo/public/id?id=${uid}&page=${page}&page_size=${pageSize}`)
}

export const updatePhotoInfoAPI = (info: UpdatePhotoInfoType) => {
    return requset.post('v1/photo/update', info)
}