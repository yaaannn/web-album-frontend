<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="space" v-title :data-title="`${userInfo.nickname}的个人中心`">
        <header-bar></header-bar>
        <div class="space-container">
            <div class="space-header">
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
                            </n-icon>
                        </p>
                    </div>
                </div>
            </div>
            <div class="user-menu">
                <p>公开照片</p>
            </div>
            <div class="user-content">
                <div class="card-list">
                    <div class="card-box" v-for="(item, index) in photoList" :key="index">
                        <div class="card" @click="goPhotoDetail(item.id)">
                            <img :src="getResourceUrl(item.url)" alt="" class="cover" />
                            <div class="info">
                                <p class="title">{{ item.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <n-pagination style="justify-content: center; " v-model:page="page" :item-count="count" :page-size="8"
                    @update-page="pageChange" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getPhotoListByUidAPI } from '@/apis/api/photo';
import { getUserInfoByIdAPI } from '@/apis/api/user';
import type { BasePhotoType } from '@/apis/types/photo-type';
import type { UserInfoType } from '@/apis/types/user-type';
import CommonAvatar from "@/components/common-avatar/Index.vue";
import PictureItem from "@/components/picture-item/Index.vue";
import HeaderBar from "@/components/header-bar/Index.vue";
import { getResourceUrl } from "@/utils/resource";
import { statusCode } from '@/utils/status-code';

import { NIcon, NPagination } from 'naive-ui';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const photoList = ref<Array<BasePhotoType>>([]);
const route = useRoute();
const router = useRouter();
const userInfo = ref<UserInfoType>({
    id: 0,
    username: "",
    avatar: "",
    birthday: "",
    email: "",

});
const getUserInfo = (uid: number) => {
    getUserInfoByIdAPI(uid).then((res) => {
        if (res.data.code === statusCode.success) {
            userInfo.value = res.data.data.user_info;
            document.title = `${userInfo.value.nickname}的个人中心`;
        }

    })
}
// const uid = ref(0);
const uid = Number(route.params.uid);
const page = ref(1);
const count = ref(0);
//页码改变
const pageChange = (target: number) => {
    page.value = target;
    getPhotoListByUid(uid, page.value, 8);
}

const getPhotoListByUid = (uid: number, page: number, pageSize: number) => {
    getPhotoListByUidAPI(uid, page, pageSize).then((res) => {
        if (res.data.code === statusCode.success) {
            count.value = res.data.total;
            photoList.value = res.data.data;
        }
    })
}
const goPhotoDetail = (id: number) => {
    let photoUrl = router.resolve({ name: "Photo", params: { id: id } });
    window.open(photoUrl.href, "_blank");
}
onBeforeMount(() => {
    getUserInfo(uid);
    getPhotoListByUid(uid, page.value, 8);

})


</script>

<style lang="less">
body {
    background: #f6f7f8;
}
</style>

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
    height: 220px;
    background-color: #999;

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

        .card-btn {
            width: 130px;
            display: flex;
            margin-right: 20px;
            justify-content: space-between;
        }
    }
}

.user-menu {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 0 1px #eee;
    background-color: #fff;

    p {
        // margin: 0 0 0 20px;
        // 居中
        margin: 0 auto;
        font-size: 16px;
        font-weight: 600;
        color: #ffc90c;
    }
}

.user-content {
    margin-top: 10px;
    min-height: 300px;
    background-color: #fff;
}

.card-list {
    width: calc(100% - 20px);
    margin-left: 10px;
    height: 360px;
    display: grid;
    grid-template-rows: repeat(2, 50%);
    grid-template-columns: repeat(4, 25%);

    .card-box {
        margin: 0 auto;
        height: 100%;
        width: calc(100% - 10px);

        .card {
            position: relative;
            width: 100%;
            height: 150px;
            margin-top: 15px;
            border-radius: 6px;
            cursor: pointer;

            .cover {
                width: 100%;
                height: 100%;
                border-radius: 6px;
                object-fit: contain;
            }

            .info {
                color: #fff;
                overflow: hidden;
                position: absolute;
                bottom: 0;
                width: 100%;
                border-bottom-left-radius: inherit;
                border-bottom-right-radius: inherit;
                background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), transparent);

                .title {
                    padding-left: 10px;
                    font-size: 14px;
                    line-height: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
}


.page-box {
    padding: 0 0 20px 10px;
    justify-content: center;
}

@media (min-width: 1400px) {
    .space-container {
        width: 1300px;
    }

    .space-header {
        height: 260px;
    }

    .card-list {
        height: 420px;

        .card-box {
            .card {
                height: 170px;
            }
        }
    }
}
</style>