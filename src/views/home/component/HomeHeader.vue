<template>
    <div class="header-bar">
        <div class="sidebar-title">
            <span>{{ globalConfig.title }}</span>
        </div>
        <div class="header-search"></div>
        <div class="header-user-info">
            <!-- 用户头像 -->
            <div v-if="isLogin" class="avatar-box">
                <div @click="goPage('Space')">
                    <common-avatar :url="getResourceUrl(userInfo.avatar || '')" :size="40" :iconSize="22"></common-avatar>
                </div>
                <div class="header-menu">
                    <div class="menu-item">
                        <span class="btn" @click="goPage('Space')">{{ userInfo.username }}</span>
                    </div>
                    <div class="menu-item">
                        <span class="btn" @click="logout">退出登录</span>
                    </div>
                </div>
            </div>
            <div v-else>
                <n-button text @click="showLogin = true">
                    登录/注册
                </n-button>
            </div>
            <!-- 投稿按钮 -->
            <n-button type="primary" class="upload-btn" @click="goPage('Upload')">
                上传
            </n-button>
        </div>
        <login-dialog v-if="showLogin" @close="loginClose"></login-dialog>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { globalConfig } from "@/utils/global-config";
import { storageData } from "@/utils/stored-data";

import { useRouter } from 'vue-router';
import { NButton } from 'naive-ui';
import CommonAvatar from "@/components/common-avatar/Index.vue";
import { getResourceUrl } from "@/utils/resource";
import type { UserInfoType } from "@/apis/types/user-type";
import { useLoginStore } from '@/stores/login-store';
import LoginDialog from "@/components/login-dialog/Index.vue";
import { storeToRefs } from 'pinia';


const isLogin = ref(false);
const router = useRouter();

const loginStore = useLoginStore();
const { showLogin } = storeToRefs(loginStore);

// 用户信息
const userInfo = ref<UserInfoType>({
    id: 0,
    username: "",
    email: "",
    birthday: "",
    gender: "",
    create_time: 0,
    avatar: "",

});

// 加载用户信息
const loadUserInfo = () => {
    const info = storageData.get('user_info');
    if (info) {
        userInfo.value = Object.assign(userInfo.value, info);
        isLogin.value = true;
    }
}
// 退出登录
const logout = () => {
    storageData.remove("access_token");
    storageData.remove('user_info');
    isLogin.value = false;
}
// 页面跳转
const goPage = (name: string) => {
    router.push({ name: name });
}

const loginClose = () => {
    loadUserInfo();
    loginStore.setLoginState(false);
}


onBeforeMount(() => {
    loadUserInfo();
})
</script>

<style lang="less" scoped>
.header-bar {
    display: flex;
    align-items: center;
    width: 54;
    height: 60px;
    display: flex;
    align-items: center;
    box-shadow: inset 0 -1px #f1f2f3;

    .sidebar-title {
        display: flex;
        align-items: center;
        height: 100%;
        width: 220px;
        padding-left: 20px;
    }


    .header-search {
        flex: 1;

        .search-input {
            width: 60%;
            margin-left: 60px;
        }
    }

    .header-user-info {
        width: 280px;
        display: flex;
        align-items: center;

        .avatar-box {
            padding-top: 5px;
            margin-right: 6px;
        }

        .upload-btn {
            margin: 0 36px;
        }
    }
}

.avatar-box {
    position: relative;
    cursor: pointer;
    margin: 0 10px;

    &:hover {
        .header-menu {
            display: block;
        }
    }

    .header-menu {
        display: none;
        width: 200px;
        height: 100px;
        top: 40px;
        left: -80px;
        position: absolute;
        z-index: 999;
        background-color: #fff;
        border-radius: 10px;
        animation: menu .3s ease-in;
        box-shadow: 0 0 30px rgba(0, 0, 0, .1);
    }

    .menu-item {
        margin-top: 7px;
        width: 160px;
        height: 36px;
        margin-left: 20px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        .btn {
            display: block;
            color: #18191b;
            line-height: 36px;
            text-align: left;
            border-radius: 6px;
            padding-left: 6px;

            &:hover {
                background-color: #c9ccd0;
            }
        }

    }
}
</style>