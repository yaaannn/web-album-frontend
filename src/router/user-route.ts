import type { RouteRecordRaw } from "vue-router";

export const userRoutes: Array<RouteRecordRaw> = [
    {
        path: "/user/:uusername",
        name: "User",
        component: () => import("../views/user/Index.vue"),
    },
]