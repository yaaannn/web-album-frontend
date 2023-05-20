import type { RouteRecordRaw } from "vue-router";

export const adminRoutes: RouteRecordRaw = {

    path: "/admin",
    name: "AdminHome",
    meta: { admin: true },
    component: () => import("../views/admin/home/Index.vue"),
    redirect: "/admin/user",
    children: [
        {
            path: "/admin/user",
            name: "AdminUser",
            meta: { admin: true },
            component: () => import("../views/admin/user/Index.vue"),
        },
        {
            path: "/admin/photo",
            name: "AdminPhoto",
            meta: { admin: true },
            component: () => import("../views/admin/photo/Index.vue"),
        },
        {
            path: "/admin/comment",
            name: "AdminComment",
            meta: { admin: true },
            component: () => import("../views/admin/comment/Index.vue"),
        },
        {
            path: "/admin/partition",
            name: "AdminPartition",
            meta: { admin: true },
            component: () => import("../views/admin/partition/Index.vue"),
        },
        {
            path: "/admin/keywords",
            name: "AdminKeywords",
            meta: { admin: true },
            component: () => import("../views/admin/keywords/Index.vue"),
        }
    ]
}
