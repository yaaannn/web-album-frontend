import type { AlbumType } from "./album-info"
import type { UserInfoType } from "./user-type"
export interface PhotoType {
    id: number,
    name: string,
    desc: string,
    url: string,
    create_time: number,
    album?: AlbumType,
    clicks: number,
    author: UserInfoType,
    is_public: boolean,
}