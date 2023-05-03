import requset from "../request";
import type { createCommentType, createReplyType } from "../types/comment-type";
// 获取评论列表
export const getCommentListAPI = (photo_id: number) => {
    return requset.get(`v1/comment/list?photo_id=${photo_id}`)
}

// 添加评论
export const createCommentAPI = (Comment: createCommentType) => {
    return requset.post('v1/comment/create', Comment)
}

// 添加回复
export const createReplyAPI = (Reply: createReplyType) => {
    return requset.post('v1/comment/reply', Reply)
}
