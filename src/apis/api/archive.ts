import request from '../request';

export const getLikeCountAPI = (id: number) => {
    return request.get(`v1/archive/count?photo_id=${id}`);
}

export const getIsLikeAPI = (id: number) => {
    return request.get(`v1/archive/is_like?photo_id=${id}`);
}

export const likeAPI = (id: number) => {
    return request.post(`v1/archive/like`, { photo_id: id });
}

export const cancelLikeAPI = (id: number) => {
    return request.post(`v1/archive/cancel`, { photo_id: id });
}

export const getLikeListAPI = (page: number, pageSize: number) => {
    return request.get(`v1/archive/list?page=${page}&page_size=${pageSize}`);
}