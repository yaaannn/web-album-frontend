import type { UserInfoType } from "./user-type";

export interface BasePhotoType {
    id: number,
    name: string,
    desc: string,
    url: string,
    create_time: number,
    status:number,
}

export interface PhotoType extends BasePhotoType {
    click?: number,
    author: UserInfoType,
    album: number | null,

}

export interface UploadPhotoType extends BasePhotoType {
    is_public: boolean,
    album: number,
    partition : number
}

export interface UploadPhotoInfoType {
    name: string,
    desc: string,
    album_id?: null | number,
    url: string,
    is_public: boolean,
    is_watermark?: boolean,
}

export interface UpdatePhotoInfoType {
    id: number,
    name: string,
    desc: string,
    album_id?: null | number,
    is_public: boolean,
}