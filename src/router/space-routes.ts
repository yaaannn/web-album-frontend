import type { RouteRecordRaw } from "vue-router";

export const spaceRoutes: RouteRecordRaw = {
    path: "/space",
    name: "Space",
    redirect: "/space/photo",
    component: () => import("../views/space/Index.vue"),
    children: [
        {
            path: '/space/setting',
            name: 'Setting',
            meta: { auth: true },
            component: () => import("../views/space/setting/Index.vue"),
            redirect: "/space/setting/info",
            children: [
                {
                    path: '/space/setting/info',
                    name: 'InfoSetting',
                    meta: { auth: true },
                    component: () => import("../views/space/setting/info/Index.vue"),
                },
                {
                    path: '/space/setting/security',
                    name: 'SecuritySetting',
                    meta: { auth: true },
                    component: () => import("../views/space/setting/security/Index.vue"),
                },
            ]
        },
        {
            path: '/space/album',
            name: 'Album',
            meta: { auth: true },
            component: () => import("../views/space/album/Index.vue"),
        },
        {
            path: '/space/photo',
            name: 'SpacePhoto',
            meta: { auth: true },
            component: () => import("../views/space/photo/Index.vue"),
        },
    ]
}