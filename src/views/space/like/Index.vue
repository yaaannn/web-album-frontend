<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="photo-box">
        <p class="photo-title">我的点赞</p>
        <div class="card-list">
            <div class="v-card" v-for="(item, index) in photoList" :key="index">
                <div class="card-item">
                    <img :src="getResourceUrl(item.photo.url)" alt="" class="cover" @click="goPhotoDetail(item.photo.id)">
                    <div class="info">
                        <p class="title">{{ item.photo.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <n-pagination style="justify-content: center;" v-model:page="page" :item-count="count" :page-size="pageSize"
        @update-page="pageChange" />
</template>

<script setup lang="ts">
import { getResourceUrl } from "@/utils/resource";
import { statusCode } from '@/utils/status-code';

import { getLikeListAPI } from "@/apis/api/archive";
import { NPagination } from 'naive-ui';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();
const pageSize = 8;
const page = ref(1);
const count = ref(0);
const photoList = ref<Array<{
    photo: {
        id: number;
        name: string;
        url: string;
    }
}>>([]);
const goPhotoDetail = (id: number) => {
    let photoUrl = router.resolve({ name: "Photo", params: { id: id } });
    window.open(photoUrl.href, "_blank");
}
// const photoCountStore = usePhotoCountStore();
const getLikeList = () => {
    getLikeListAPI(page.value, pageSize).then((res) => {
        console.log(res.data);

        if (res.data.code === statusCode.success) {
            count.value = res.data.total;
            console.log(res.data.data);

            photoList.value = res.data.data;
            console.log(photoList.value);

            // photoCountStore.setPhotoCountState(count.value)
        }
    })
}
const pageChange = (target: number) => {
    page.value = target;
}



onBeforeMount(() => {
    getLikeList();
})
</script>

<style lang="less" scoped>
.photo-box {
    padding: 0 20px;

    .photo-title {
        font-size: 18px;
        margin-top: 20px;
    }
}

.card-list {
    width: 100%;
    height: 360px;
    display: grid;
    grid-template-rows: repeat(2, 50%);
    grid-template-columns: repeat(4, 25%);

    .v-card {
        padding: 5px;
        height: 170px;
        width: calc(100% - 10px);

        .card-item {
            position: relative;
            width: 100%;
            height: 130px;

            .cover {
                width: 100%;
                height: 100%;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                object-fit: contain;
                cursor: pointer;

            }

            .info {
                color: #fff;
                position: absolute;
                bottom: 0;
                width: 100%;
                background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), transparent);

                p {
                    margin: 0;
                    padding-left: 10px;
                }

                .title {
                    font-size: 14px;
                    line-height: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    position: relative;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }

            }
        }
    }
}
</style>