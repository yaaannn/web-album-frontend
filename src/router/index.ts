import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/Index.vue';
import { storageData } from "@/utils/stored-data";
import store from '@/stores';
import { useLoginStore } from '@/stores/login-store';
import { spaceRoutes } from './space-routes';
import { uploadRoutes } from './upload-routes';
import { adminRoutes } from './admin-routes';
const loginStore = useLoginStore(store);

const baseRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../views/login/Index.vue")
    },
    {
        path: '/findpassword',
        name: 'FindPassword',
        component: () => import("../views/find-password/Index.vue")
    },
    {
        path: '/album/:id',
        name: 'AlbumDetail',
        meta: { auth: true },
        component: () => import("../views/album/Index.vue")
    },
    {
        path: "/photo/:id",
        name: "Photo",
        component: () => import("../views/photo/Index.vue")
    },
    {
        path: "/photo/list",
        name: "PhotoList",
        component: () => import("../views/photo-list/Index.vue")
    },
    {
        path: "/user/:uid",
        name: "User",
        component: () => import("../views/user/Index.vue"),
    },
    {
        path: '/admin/login',
        name: 'AdminLogin',
        component: () => import("../views/admin/login/Index.vue"),
    },
    {
        path: '/404',
        name: '404',
        component: () => import("../views/result/page-not-found/Index.vue")
    },
    {
        path: '/:catchAll(.*)',
        redirect: {
            name: "404"
        }
    },
]

const routes = baseRoutes.concat(spaceRoutes, uploadRoutes,adminRoutes);

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

router.beforeEach((to, from, next) => {
    //是否需要登录
    if (to.meta.auth && !storageData.get('access_token')) {
        if (from.name !== "Home") {
            router.push({ name: 'Login' });
            next();
        } else {
            loginStore.setLoginState(true);
        }
    } else if (to.meta.admin && !storageData.get('access_token_manage')) {
        router.push({ name: 'AdminLogin' });
        next();
    } else {
        next();
    }
})

export default router
