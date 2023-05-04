<!-- eslint-disable vue/multi-word-component-names -->
<template>
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
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { storageData } from '@/utils/stored-data';
import type { AdminInfoType } from '@/apis/admin/types/admin-type';

const router = useRouter();

const logout = () => {
    storageData.remove("access_token_manage");
    storageData.remove('admin_info');
    router.push({ name: 'Login' });
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
</script>

<style lang="less" scoped>
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

            .avatar-box {
                padding-top: 5px;
                margin-right: 6px;
            }

            .upload-btn {
                margin-left: 6px;
            }
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
        width: 180px;
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
        width: 150px;
        height: 36px;
        margin-left: 16px;
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

@keyframes menu {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }

    100% {
        opacity: 1;
    }
}
</style>