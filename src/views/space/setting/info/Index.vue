<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <n-form label-placement="left" label-width="80px">
            <div class="avatar-box">
                <p class="avatar-label">头像:</p>
                <common-avatar class="avatar" :url="getResourceUrl(userInfo.avatar || '')" :size="60"
                    @click="avatarClick"></common-avatar>
            </div>
            <!-- <n-form-item label="用户名:">
                <p class="uid form-item">{{ userInfo.username }}</p>
            </n-form-item> -->
            <n-form-item label="昵称:">
                <n-input class="form-input name" v-model:value="userInfo.nickname" placeholder="请输入昵称" maxlength="10"
                    show-count />
            </n-form-item>
            <n-form-item label="性别:">

                <n-radio-group class="form-item" v-model:value="userInfo.gender">
                    <n-radio-button value="0">男</n-radio-button>
                    <n-radio-button value="1">女</n-radio-button>
                    <n-radio-button value="2">秘密</n-radio-button>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="地区:">
                <n-select class="form-item" style="width: 100px;" v-model:value="userInfo.regions" :options="level1" />
            </n-form-item>
            <n-form-item label="生日:">
                <n-date-picker class="form-item" placeholder="选择出生日期" type="date" :value="userInfoBirthday"
                    @update-value="updateBirthday" />
            </n-form-item>
            <div class="setting-save-btn">
                <n-button type="primary" @click="modifyUserInfo">确认修改</n-button>
            </div>
        </n-form>
        <leaf-cropper ref="cropperRef">
            <template #content="fileSlot">
                <avatar-cropper :file="fileSlot.file" @state-change="changeUpload"></avatar-cropper>
            </template>
        </leaf-cropper>
    </div>
</template>


<script setup lang="ts">
import districts from '@/assets/districts';
import LeafCropper from "@/components/leaf-cropper/Index.vue";
import AvatarCropper from "@/components/leaf-cropper/component/AvatarCropper.vue";
import { getUserInfoAPI, modifyUserInfoAPI, } from "@/apis/api/user";
import type { ModifyUserInfoType, UserInfoType } from "@/apis/types/user-type"
import CommonAvatar from "@/components/common-avatar/Index.vue";

import { statusCode } from '@/utils/status-code';
import { storageData } from "@/utils/stored-data";
import { getResourceUrl } from "@/utils/resource";

import { NButton, NDatePicker, NForm, NFormItem, NInput, NRadioButton, NRadioGroup, NSelect, useNotification } from 'naive-ui';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const level1 = districts.map((item) => {
    return {
        label: item.name,
        value: item.name,
    };
});
//上传变化的回调
const notification = useNotification();
const changeUpload = (status: string, data: any) => {
    switch (status) {
        case "success":
            userInfo.value.avatar = data.data.url;
            notification.success({
                title: '上传完成',
                duration: 3000,
            });
            break;
        case "error":
            notification.error({
                title: '文件上传失败',
                duration: 5000,
            });
            break;
    }
    cropperRef.value?.closeCropper();
}
const userInfo = ref<UserInfoType>({
    id: 0,
    username: "",
    email: "",
    avatar: "",
    nickname: "",
    gender: "",
    birthday: "",
    regions: "",
});

const cropperRef = ref<InstanceType<typeof LeafCropper> | null>(null);
const avatarClick = () => {
    cropperRef.value?.open();
}
//用户生日信息
const userInfoBirthday = ref(0);
const updateBirthday = (value: number, formattedValue: string) => {
    userInfoBirthday.value = value;
    userInfo.value.birthday = formattedValue;
}
const getUserInfo = () => {
    getUserInfoAPI().then((res) => {
        storageData.update("user_info", res.data.data.user_info);
    });
}
const modifyUserInfo = () => {
    const modifyForm: ModifyUserInfoType = {
        avatar: userInfo.value.avatar || '',
        nickname: userInfo.value.nickname || '',
        gender: userInfo.value.gender || '2',
        birthday: userInfo.value.birthday || '1970-01-01',
        regions: userInfo.value.regions || '',
    }

    modifyUserInfoAPI(modifyForm).then((res) => {
        if (res.data.code === statusCode.success) {
            getUserInfo();
            notification.success({
                title: '修改成功',
                duration: 3000,
            });
            // 等待2秒后刷新页面
            setTimeout(() => {
                router.go(0);
            }, 2000);

        } else {
            notification.error({
                title: '修改失败',
                duration: 5000,
            });
        }
    });
}
onBeforeMount(() => {
    const info = storageData.get("user_info");
    userInfo.value = Object.assign(userInfo.value, info);
    userInfoBirthday.value = Date.parse(info.birthday);
});
</script>

<style lang="less" scoped>
.avatar-box {
    height: 60px;
    margin: 20px 0;
    display: flex;
    position: relative;

    .avatar-label {
        box-sizing: border-box;
        width: 80px;
        margin: 0;
        padding: 0 12px 0 0;
        text-align: right;
        font-size: 14px;
        line-height: 60px;
    }

    .upload-avatar {
        display: none;
    }

    .avatar {
        margin-left: 36px;

        &:hover::after {
            display: block;
        }

        //头像遮罩
        &::after {
            font-size: 10px;
            display: none;
            position: absolute;
            content: "更换头像";
            line-height: 60px;
            vertical-align: middle;
            width: 100%;
            height: 100%;
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.3);
        }
    }
}

.uid {
    margin: 0;
}

.form-item {
    padding-left: 20px;
}

.name {
    width: 200px;

    &:deep(.n-input__input-el) {
        height: auto;
    }
}

.form-input {
    margin-left: 20px;
}

.setting-save-btn {
    float: right;
    // margin-top: 30px;

    button {
        width: 120px;
        height: 40px;
    }
}
</style>