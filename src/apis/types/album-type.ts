export interface AlbumType {
    id: number
    name: string
    create_time: number
    cover?: string
    desc?: string
}

export interface UpdateAlbumType {
    id: number
    name: string
    cover?: string
    desc?: string
}

export interface CreateAlbumType {
    name: string
    cover?: string
    desc?: string
}