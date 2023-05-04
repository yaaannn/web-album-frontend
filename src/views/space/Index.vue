<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="space" v-title :data-title="`${userInfo.nickname}的个人中心`">
        <header-bar />
        <div class="sapce-container">
            <div class="space-header">
                <button class="upload-btn">上传封面图片</button>
                <img class="cover" v-if="userInfo.cover" :src="getResourceUrl(userInfo.cover)" alt="用户封面图">
                <img class="cover" v-else src="@/assets/cover.png" alt="用户封面图">
                <div class="header-content">
                    <!-- 用户头像 -->
                    <common-avatar :url="getResourceUrl(userInfo.avatar || '')" :size="70" :iconsize="36" />
                    <div class="content-name">
                        <p class="name">{{ userInfo.nickname }}
                            <n-icon :color="userInfo.gender === '0' ? '#1890ff' : '#eb2f96'" size="20">
                                <male v-if="userInfo.gender === '0'"></male>
                                <female v-else-if="userInfo.gender === '1'"></female>
                                <!-- <div v-else>秘密</div> -->
                            </n-icon>
                        </p>
                    </div>
                </div>


            </div>
            <div class="space-content">
                <n-menu class="space-menu" :options="menuOptions" :default-value="defaultOption" />
                <div class="space-router">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderBar from "@/components/header-bar/Index.vue";
import CommonAvatar from "@/components/common-avatar/Index.vue";

import { h, onBeforeMount, ref } from "vue";
import { RouterLink } from "vue-router";
import { Video, Collection, Setting, Male, Female, Like, } from "@/icons";
import { NMenu, NIcon } from "naive-ui";
import type { UserInfoType } from "@/apis/types/user-type";
import { storageData } from "@/utils/stored-data";
import { getResourceUrl } from "@/utils/resource";
const userInfo = ref<UserInfoType>({
    id: 0,
    username: "",
    nickname: "",
    avatar: "",
    email: "",
    birthday: '',
    cover: ""
});
function renderIcon(icon: any, color?: string) {
    return () => h(NIcon, { color: color }, { default: () => h(icon) });
}
const defaultOption = ref('');//默认激活菜单
const menuOptions = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: "SpacePhoto",
                    }
                },
                { default: () => "我的照片" }
            ),
        key: "photo",
        icon: renderIcon(Video, '#e3c0aa'),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: "Like",
                    }
                },
                { default: () => "我的点赞" }
            ),
        key: "like",
        icon: renderIcon(Like, '#e3c0aa'),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: "Album",
                    }
                },
                { default: () => "我的相册" }
            ),
        key: "album",
        icon: renderIcon(Collection, '#e3c0aa'),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: "Setting",
                    }
                },
                { default: () => "个人设置" }

            ),
        key: "setting",
        icon: renderIcon(Setting, '#e3c0aa'),
    }
];

onBeforeMount(() => {
    userInfo.value = storageData.get("user_info");
})
</script>
<style lang="less" scoped>
.space {
    width: 100%;
}

.space-container {
    width: 1100px;
    margin: 0 auto;
}

.space-header {
    position: relative;
    width: 100%;
    height: 180px;
    background-color: #999;

    .upload-btn {
        position: absolute;
        top: 12px;
        right: 20px;
        width: 120px;
        height: 32px;
        color: #d3d3d3;
        background-color: transparent;
        cursor: pointer;
        border-radius: 3px;
        border: 1px solid rgba(255, 255, 255, .2);

        &:hover {
            border-color: #d3d3d3;
        }
    }

    .cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .header-content {
        width: 100%;
        height: 100px;
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px;

        .content-name {
            flex: 1;
            padding-left: 20px;

            .name {
                color: #fff;
                font-size: 18px;
                font-weight: 600;
                margin: 0 0;
            }

            .sign {
                font-size: 12px;
                color: #ccd0d7;
                margin: 6px 0 0 0;
            }
        }

        .user-data {
            width: 236px;
            display: flex;

            div {
                color: #fff;
                width: 78px;
                text-align: center;

                .data-title {
                    margin-bottom: 6px;
                    font-weight: bold;
                }

                .data-content:hover {
                    cursor: pointer;
                }
            }
        }
    }
}


.space-content {
    display: flex;
    margin: 10px auto 30px;


    .space-menu {
        width: 200px;
        height: 260px;
        background-color: #fff;
        border: 1px solid #efeff5;
    }

    .space-router {
        margin-left: 10px;
        width: calc(100% - 210px);
        // 和页面高度有关
        // min-height: 630px;
        background-color: #fff;
    }
}

@media (min-width: 1400px) {
    .space-container {
        width: 1300px;
    }

    .space-header {
        height: 260px;
    }
}
</style>