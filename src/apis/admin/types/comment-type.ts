import type { UserInfoType } from "./user-type"

export interface CommentType {
    id: number,
    content: string,
    photo: number,
    author: UserInfoType,
    create_time: number
}
