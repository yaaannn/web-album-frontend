import type { UserInfoType } from "./user-type";

export interface CommentType {
    id: number,
    author: UserInfoType,
    replies: Array<ReplyType>,
    content: string,
    create_time: number,
}

export interface ReplyType {
    id: number,
    content: string,
    author: UserInfoType,
    create_time: number,
}

export interface createCommentType {
    photo_id: number,
    content: string,
}

export interface createReplyType {
    comment_id: number,
    content: string,
}