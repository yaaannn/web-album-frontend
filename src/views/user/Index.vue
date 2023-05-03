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
                                <male v-if="userInfo.gender === '0'"></male>
                                <female v-else-if="userInfo.gender === '1'"></female>
                                <!-- <div v-else>秘密</div> -->
                            </n-icon>
                        </p>
                    </div>
                </div>
            </div>
            <div class="user-menu"></div>
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
import HeaderBar from "@/components/header-bar/Index.vue";
import { Female, Male } from '@/icons';
import { statusCode } from '@/utils/status-code';
import { getResourceUrl } from "@/utils/resource";

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

    .menu-right {
        width: 160px;
        display: flex;

        div {
            color: #fff;
            width: 70px;
            font-size: 12px;
            text-align: center;

            .data-title {
                margin: 0;
                color: #999;
            }

            .data-content {
                margin: 0 0 5px 0;
                color: #222;
            }
        }
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