import request from "../request"
import type { UpdateAlbumType, CreateAlbumType } from "../types/album-type"
// 列出相册
export const listAlbumAPI = () => {
    return request.get("v1/album/list")
}

export const updateAlbumInfoAPI = (id: number, info: UpdateAlbumType) => {
    return request.post(`v1/album/update?id=${id}`, info)
}

export const createAlbumAPI = (info: CreateAlbumType) => {
    return request.post("v1/album/create", info)
}

export const deleteAlbumAPI = (id: number) => {
    return request.get(`v1/album/delete?id=${id}`)
}

export const getAlbumInfoAPI = (id: number) => {
    return request.get(`v1/album/detail?id=${id}`)
}