<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="album" :style="initTheme()" v-title data-title="相册详情">
        <header-bar></header-bar>
        <div class="album-main">
            <div class="content-left">
                <div class="card-item" v-for="(item, index) in photoList" :key="index">
                    <div class="card-left">
                        <img v-if="item.url" :src="getResourceUrl(item.url)" alt="收藏夹封面">
                        <div class="card-no-cover" v-else>
                            <img src="@/assets/album.png" alt="默认封面">
                        </div>
                    </div>
                    <div class="card-center">
                        <p class="title" @click="goPhotoDetail(item.id)">{{ item.name }}</p>
                        <span class="desc">上传时间: <n-time type="date"
                                :time="new Date(item.create_time * 1000)"></n-time></span>
                        <span class="desc">简介: {{ item.desc }}</span>
                    </div>
                    <div class="card-right">
                        <span class="edit" @click="deletePhotoFromAlbum(item.id)">删除</span>
                    </div>

                </div>
                <div class="page-box">
                    <n-pagination v-model:page="page" :item-count="count" :page-size="1" @update-page="pageChange" />
                </div>
            </div>
            <div class="content-right">
                <div class="cover">
                    <img v-if="album[0].cover" :src="getResourceUrl(album[0].cover)" alt="相册封面">
                    <div class="no-cover" v-else>
                        <img src="@/assets/album.png" alt="默认封面">
                    </div>
                </div>
                <div class="info">
                    <span class="title">{{ album[0].name }}</span>
                    <span class="desc">相册简介：{{ album[0].desc }}</span>
                    创建时间： <n-time type="date" :time="new Date(album[0].create_time * 1000)"></n-time>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import HeaderBar from '@/components/header-bar/Index.vue';
import { getAlbumInfoAPI } from '@/apis/api/album';
import { deleteAlbumPhotoAPI, getAlbumPhotoAPI, } from '@/apis/api/photo';
import type { PhotoType, } from "@/apis/types/photo-type"
import type { AlbumType } from "@/apis/types/album-type"
import { statusCode } from '@/utils/status-code';
import { getResourceUrl } from "@/utils/resource";

import { useNotification, NTime, NPagination } from 'naive-ui';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const photoList = ref<Array<PhotoType>>([])
const id = ref(0);
const route = useRoute();
const notification = useNotification();
const initTheme = () => {
    const theme = {
        primaryColor: "#ffc90c",
        primaryHoverColor: "#f8df72"
    }
    return {
        "--hover-color": theme.primaryColor
    }
}
const page = ref(1);
const pageSize = 8;
const count = ref(0);
const album = ref<Array<AlbumType>>([]);
const goPhotoDetail = (id: number) => {
    let photoUrl = router.resolve({ name: "Photo", params: { id: id } });
    window.open(photoUrl.href, "_blank");
}
// 获取相册中的图片
const getAlbumPhoto = () => {
    getAlbumPhotoAPI(id.value, page.value, pageSize).then((res: any) => {

        if (res.data.code === statusCode.success) {
            count.value = res.data.count
            photoList.value = res.data.data
        }
    })
}
// 获取相册信息
const getAlbumInfo = () => {
    getAlbumInfoAPI(id.value).then((res: any) => {
        if (res.data.code === statusCode.success) {
            album.value = res.data.data;
        }
    })
}

// 从相册中删除图片
const deletePhotoFromAlbum = (id: number) => {
    deleteAlbumPhotoAPI(id).then((res: any) => {
        if (res.data.code === statusCode.success) {
            getAlbumPhoto();
            notification.success({
                title: '删除成功',
                duration: 2000
            })
        } else {
            notification.error({
                title: res.data.msg || '删除失败',
                duration: 2000
            })
        }
    })
}

//页码改变
const pageChange = (target: number) => {
    page.value = target;
    getAlbumPhoto();
}

onBeforeMount(() => {
    id.value = Number(route.params.id);
    getAlbumPhoto();
    getAlbumInfo();

})
</script>

<style lang="less" scoped>
.album {
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    position: fixed;
    overflow-y: scroll;
    background-color: #f5f6f7;
}

.album-main {
    // padding: 20px 20px 16px;
    width: calc(100% - 200px);
    box-sizing: border-box;
    margin: 20px auto 0 auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}

.content-left {
    padding-top: 20px;
    width: calc(100% - 380px);
    min-width: 680px;
    background: #fff;
}

.card-item {
    width: 100%;
    height: 80px;
    margin-bottom: 12px;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 12px;

    .card-left {
        float: left;
        width: 120px;
        height: 80px;
        margin-right: 10px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 2px;
        }

        .card-no-cover {
            width: 100%;
            height: 100%;
            background-color: #e6e6e6;
            border-radius: 2px;

            img {
                position: absolute;
                width: 50px;
                height: 50px;
                margin: 15px 35px;
                filter: grayscale(100%);
                opacity: 50%;
            }
        }
    }

    .card-center {
        float: left;
        width: calc(100% - 230px);

        .title {
            font-size: 14px;
            color: #212121;
            line-height: 18px;
            margin: 0 0 26px;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;

            &:hover {
                color: var(--hover-color);
            }
        }

        .desc {
            font-size: 12px;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
    }

    .card-right {
        float: left;
        // width: 90px;
        height: 100%;
        text-align: center;


        .edit {
            color: #999;
            cursor: pointer;
            line-height: 90px;
            margin-right: 20px;

            &:hover {
                color: var(--hover-color);
            }
        }
    }
}



/**右半部分 */
.content-right {
    width: 350px;
    height: 600px;
    min-width: 350px;
    padding: 10px;
    background: #fff;

    .cover {
        width: 100%;
        height: 200px;
        margin-bottom: 12px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 2px;
        }

        .no-cover {
            width: 100%;
            height: 100%;
            background-color: #e6e6e6;
            border-radius: 2px;

            img {
                position: absolute;
                width: 100px;
                height: 100px;
                margin: 50px 125px;
                filter: grayscale(100%);
                opacity: 50%;
            }
        }
    }

    .info {
        .title {
            display: block;
            height: auto;
            font-size: 16px;
            color: #212121;
            line-height: 18px;
            margin-bottom: 20px;
        }

        .desc {
            display: block;
            font-size: 12px;
            font-size: 14px;
            color: #666;
            margin: 2px 0;

            .author {
                float: right;
                cursor: pointer;

                &:hover {
                    color: var(--hover-color);
                }
            }
        }


    }
}
</style>