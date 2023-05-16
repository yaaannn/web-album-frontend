<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="login" v-title :data-title="`后台登录-${globalConfig.title}`">

        <div class="login-form">
            <n-form :model="loginForm" label-placement="left" label-width="70">
                <n-form-item label="账号" required>
                    <n-input placeholder="请输入账号" v-model:value="loginForm.username" />
                </n-form-item>
                <n-form-item label="密码" required>
                    <n-input placeholder="请输入密码" v-model:value="loginForm.password" type="password" />
                </n-form-item>
            </n-form>
            <div class="login-btn">
                <n-button type="primary" @click="sendLoginRequest">登录</n-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { globalConfig } from '@/utils/global-config';
import { reactive } from 'vue';

import type { AdminLoginType } from '@/apis/admin/types/admin-type';
import { adminLoginAPI, getAdminInfoAPI } from '@/apis/admin/api/admin';
import { NForm, NFormItem, NInput, NButton, useNotification } from 'naive-ui';
import { statusCode } from '@/utils/status-code';
import { storageData } from '@/utils/stored-data';

const router = useRouter();

const notification = useNotification();

//登录表单
const loginForm = reactive<AdminLoginType>({
    username: "",
    password: "",
});

//登录
const sendLoginRequest = () => {
    adminLoginAPI(loginForm).then((res) => {
        if (res.data.code === statusCode.success) {

            storageData.set("access_token_manage", res.data.data.token, 600);
            getAdminInfoAPI().then((infoRes) => {
                if (infoRes.data.code === statusCode.success) {

                    storageData.set("admin_info", infoRes.data.data.admin_info, 14 * 24 * 60);
                    router.push({ name: "AdminHome" });
                }
            })
        }
        else {
            notification.error({
                title: "请检查输入的用户名密码",
                duration: 3000,
            });
        }
    });

}

</script>

<style lang="less" scoped>
.login {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100vh;



}

.login-form {
    // 居中
    position: absolute;
    left: 50%;
    margin-left: -100px;

    .login-btn {
        display: flex;
        width: 100%;
        margin: 20px 30px 0;

        button {
            width: calc(100% - 60px);
        }
    }
}
</style>