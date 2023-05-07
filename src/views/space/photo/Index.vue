<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="photo-box">
        <p class="photo-title">我的照片</p>
        <div class="card-list">
            <div class="v-card" v-for="(item, index) in photoList" :key="index">
                <div class="card-item">
                    <img :src="getResourceUrl(item.url)" alt="" class="cover" @click="goPhotoDetail(item.id)">
                    <div class="info">
                        <p class="title">{{ item.name }}</p>
                        <p class="clicks" v-if="item.is_public">公开</p>
                        <p class="clicks" v-else>私密</p>
                    </div>
                </div>
                <div class="my-upload-card-btn">
                    <n-button text @click="modifyPhoto(item)">
                        编辑
                    </n-button>
                    <n-button text @click="deleteMyPhoto(item.id)">
                        删除
                    </n-button>
                </div>
            </div>
        </div>
        <n-pagination style="justify-content: center;" v-model:page="page" :item-count="count" :page-size="pageSize"
            @update-page="pageChange" />
    </div>
    <!-- 编辑照片抽屉 -->
    <n-modal v-model:show="updateActive" style="width: 500px;" preset="card">
        <n-form label-placement="left" label-width="auto">
            <n-form-item label="标题" required>
                <n-input v-model:value="photoInfo.name" placeholder="请输入标题" maxlength="50" show-count />
            </n-form-item>
            <n-form-item label="描述">
                <n-input v-model:value="photoInfo.desc" placeholder="简单介绍一下照片~" maxlength="200" :autosize="descSize"
                    show-count type="textarea" />
            </n-form-item>
            <n-form-item label="是否公开">
                <n-switch v-model:value="photoInfo.is_public" />
            </n-form-item>
            <n-form-item label="选择相册">
                <n-select class="select" placeholder="选择相册" label-field="name" value-field="id" remote
                    v-model:value="photoInfo.album_id" :options="albumList" />
            </n-form-item>
            <div class="upload-next-btn">
                <n-button type="primary" @click="updatePhotoInfo">确定</n-button>
            </div>
        </n-form>
    </n-modal>
</template>

<script setup lang="ts">
import type { AlbumType } from "@/apis/types/album-type";
import { deletePhotoAPI, getMyPhotoAPI, updatePhotoInfoAPI, } from '@/apis/api/photo';
import { listAlbumAPI, } from "@/apis/api/album";
import type { UploadPhotoType } from '@/apis/types/photo-type';
import { statusCode } from '@/utils/status-code';
import { getResourceUrl } from "@/utils/resource";

import { NButton, NForm, NFormItem, NInput, NModal, NPagination, NSelect, NSwitch, useNotification } from 'naive-ui';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();
const notification = useNotification();
const pageSize = 8;
const page = ref(1);
const count = ref(0);
const photoList = ref<Array<UploadPhotoType>>([]);
const goPhotoDetail = (id: number) => {
    let photoUrl = router.resolve({ name: "Photo", params: { id: id } });
    window.open(photoUrl.href, "_blank");
}
// const photoCountStore = usePhotoCountStore();
const getMyPhoto = () => {
    getMyPhotoAPI(page.value, pageSize).then((res) => {
        if (res.data.code === statusCode.success) {
            count.value = res.data.total;
            photoList.value = res.data.data;
            // photoCountStore.setPhotoCountState(count.value)
        }
    })
}
const pageChange = (target: number) => {
    page.value = target;
    getMyPhoto();
}
const deleteMyPhoto = (id: number) => {
    deletePhotoAPI(id).then((res) => {
        if (res.data.code === statusCode.success) {
            notification.success({
                title: '删除成功',
                description: '照片删除成功',
                duration: 2000
            })
            getMyPhoto();
        }
    })
}
const photoInfo = reactive({
    id: 0,
    name: '',
    desc: "",
    album_id: 0,
    is_public: true
});
const updateActive = ref(false);//显示编辑抽屉
//简介输入框大小
const descSize = {
    minRows: 3,
    maxRows: 5
}
const modifyPhoto = (item: UploadPhotoType) => {
    photoInfo.id = item.id;
    photoInfo.name = item.name;
    photoInfo.desc = item.desc;
    photoInfo.album_id = item.album;
    photoInfo.is_public = item.is_public;
    updateActive.value = true;
}
const albumList = ref<Array<AlbumType>>([]);

const ListAlbum = () => {
    listAlbumAPI().then((res) => {
        // let albumList: Array<AlbumType> = [];
        if (res.data.code === statusCode.success) {
            albumList.value = res.data.data;
        }
    })
}
const updatePhotoInfo = () => {
    updatePhotoInfoAPI(photoInfo).then((res) => {
        if (res.data.code === statusCode.success) {
            notification.success({
                title: '修改成功',
                description: '照片信息修改成功',
                duration: 2000
            })
            updateActive.value = false;
            getMyPhoto();
        } else {
            notification.error({
                title: '修改失败',
                description: res.data.msg,
                duration: 2000
            })
        }
    })

}
onBeforeMount(() => {
    getMyPhoto();
    ListAlbum();
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
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }

                .clicks {
                    font-size: 10px;
                }
            }
        }
    }
}

.my-upload-card-btn {
    width: calc(100% - 2px);
    border: 1px solid #d0d0d0;
    border-top: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    button {
        width: 50%;
        color: #6f6f6f;
    }

    .modify-menu {
        width: 180px;
        height: 92px;
        z-index: 999;
        position: absolute;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 30px rgba(18, 18, 18, 0.2);

        .menu-item {
            margin-top: 7px;
            width: 144px;
            height: 36px;
            margin-left: 20px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            .modify-btn {
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
}

@media (min-width: 1400px) {
    .photo-box {
        .card-list {
            height: 400px;

            .v-card {
                height: 200px;

                .card-item {
                    height: 150px;
                }
            }
        }
    }
}
</style>