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
                                <svg v-if="userInfo.gender === '0'" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M41.9517 15.0483V6.04834H32.9517" stroke="currentColor" stroke-width="4"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M10.4135 38.0007C15.8808 43.4681 24.7451 43.4681 30.2125 38.0007C32.9462 35.2671 34.313 31.6841 34.313 28.1012C34.313 24.5183 32.9462 20.9354 30.2125 18.2017C24.7451 12.7344 15.8808 12.7344 10.4135 18.2017C4.94615 23.6691 4.94615 32.5334 10.4135 38.0007Z"
                                        fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
                                    <path d="M30.0002 17.9999L39.9517 8.04838" stroke="currentColor" stroke-width="4"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <!-- <male v-if="userInfo.gender === '0'"></male> -->
                                <svg v-else-if="userInfo.gender === '1'" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#icon-b54561bccbbd09)">
                                        <path
                                            d="M38.3785 9.85132C32.9112 4.38398 24.0468 4.38398 18.5795 9.85132C15.8458 12.585 14.479 16.1679 14.479 19.7508C14.479 23.3337 15.8458 26.9166 18.5795 29.6503C24.0468 35.1176 32.9112 35.1176 38.3785 29.6503C43.8458 24.183 43.8458 15.3187 38.3785 9.85132Z"
                                            fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
                                        <path d="M18.4642 29.5353L5.73633 42.2632" stroke="currentColor" stroke-width="4"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M19.1714 41.5562L6.44346 28.8282" stroke="currentColor" stroke-width="4"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="icon-b54561bccbbd09">
                                            <rect width="48" height="48" fill="currentColor" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <!-- <female v-else-if="userInfo.gender === '1'"></female> -->
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