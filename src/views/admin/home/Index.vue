<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="home" v-title data-title="后台管理系统">
        <div class="home-menu">
            <span class="title">{{ globalConfig.title }}后台管理系统</span>
            <n-menu :default-value="defaultKey" :options="menuOptions" />
        </div>
        <div class="home-box">
            <div class="header-bar">
                <div class="header-content">
                    <div class="header-left">
                    </div>
                    <div class="header-right">
                        <span>{{ adminInfo.username }}</span>
                        &nbsp;&nbsp;
                        <span style="cursor: pointer;" @click="logout">退出登录</span>

                    </div>
                </div>
            </div>
            <div class="home-router">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { globalConfig } from '@/utils/global-config';
import { NMenu } from "naive-ui";
import { h, onBeforeMount, ref } from "vue";
import { RouterLink, useRoute } from 'vue-router';
import type { AdminInfoType } from '@/apis/admin/types/admin-type';
import { storageData } from '@/utils/stored-data';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    storageData.remove("access_token_manage");
    storageData.remove('admin_info');
    router.push({ name: 'Home' });
}

const adminInfo = reactive<AdminInfoType>({
    id: 0,
    username: "",
    email: "",
})

onBeforeMount(() => {
    const adminInfo1 = storageData.get('admin_info');
    console.log(adminInfo1);

    if (adminInfo) {
        adminInfo.id = adminInfo1.id;
        adminInfo.username = adminInfo1.username;
        adminInfo.email = adminInfo1.email;
    }
    console.log(adminInfo);


})
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
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: "AdminPartition",
                    }
                },
                { default: () => '分区管理' }
            ),
        key: "admin_partition",
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: "AdminKeywords",
                    }
                },
                { default: () => '敏感词管理' }
            ),
        key: "admin_keywords",
    }
];

const routeNameToKey = () => {
    switch (route.name) {
        case "AdminUser":
            return "admin_user";
        case "AdminPhoto":
            return "admin_photo";
        case "AdminComment":
            return "admin_comment";
        case "AdminPartition":
            return "admin_partition";
        case "AdminKeywords":
            return "admin_keywords";
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

.header-bar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    min-width: 1000px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .3);

    .header-content {
        margin: 0 auto;
        width: 1200px;
        height: 50px;
        display: flex;
        justify-content: space-between;

        .header-left {
            display: flex;
            align-items: center;
            padding-top: 5px;
        }

        .header-right {
            display: flex;
            align-items: center;
        }

    }
}
</style>