<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="home" v-title data-title="后台管理系统">
        <div class="home-menu">
            <span class="title">{{ globalConfig.title }}</span>
            <n-menu :default-value="defaultKey" :options="menuOptions" />
        </div>
        <div class="home-box">
            <header-bar></header-bar>
            <div class="home-router">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { h, ref, onBeforeMount } from "vue";
import { RouterLink, useRoute } from 'vue-router';
import { globalConfig } from '@/utils/global-config';
import { NMenu } from "naive-ui";
import HeaderBar from '@/views/admin/home/components/header-bar/Index.vue';

const route = useRoute();

const defaultKey = ref("");
const menuOptions = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: "AdminUser",
                    }
                },
                { default: () => '用户管理' }
            ),
        key: "admin_user",
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: "AdminPhoto",
                    }
                },
                { default: () => '照片管理' }
            ),
        key: "admin_photo",
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: "AdminComment",
                    }
                },
                { default: () => '评论管理' }
            ),
        key: "admin_comment",
    },
];

const routeNameToKey = () => {
    switch (route.name) {
        case "AdminUser":
            return "admin_user";
        case "AdminPhoto":
            return "admin_photo";
        case "AdminComment":
            return "admin_comment";
        default:
            return "";
    }
}

onBeforeMount(() => {
    defaultKey.value = routeNameToKey();
})
</script>

<style lang="less" scoped>
.home {
    display: flex;
    background: #f7f7f7;

    .home-box {
        width: calc(100% - 220px);
    }

    .home-menu {
        .title {
            display: block;
            height: 60px;
            font-size: 18px;
            color: var(--title-color);
            line-height: 60px;
            text-align: center;
            border-bottom: 1px solid rgba(60, 60, 67, .12);
        }

        width: 220px;
        height: 100vh;
        position: relative;
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .3);
    }

    .home-router {
        width: 100%;
        min-height: 500px;
        min-width: 1000px;
    }
}
</style>