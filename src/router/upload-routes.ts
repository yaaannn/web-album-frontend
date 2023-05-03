import type { RouteRecordRaw } from "vue-router";

export const uploadRoutes: RouteRecordRaw = {
    path: '/upload',
    name: 'Upload',
    component: () => import("../views/upload/Index.vue"),
    redirect: "/upload/photo",
    children: [
        {
            path: '/upload/photo',
            name: 'UploadPhoto',
            meta: { auth: true },
            component: () => import("../views/upload/upload-photo/Index.vue"),
        },
        {
            path: '/upload/comment/manage',
            name: 'CommentManage',
            meta: { auth: true },
            component: () => import("../views/upload/comment-manage/Index.vue"),
        },
    ]
}
