<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="album-list" :style="initTheme()">

        <div class="create-title">
            相册
            <div class="create-button">
                <n-button type="primary" @click="createActive = true">创建相册</n-button>
            </div>
        </div>
        <n-scrollbar style="max-height: 550px;">
            <div class="card-item" v-for="(item, index) in albumList" :key="index">
                <div class="card-left">
                    <img v-if="item.cover" :src="getResourceUrl(item.cover)" alt="收藏夹封面">
                    <div class="no-cover" v-else>
                        <img src="@/assets/album.png" alt="默认封面">
                    </div>
                </div>
                <div class="card-center">
                    <p class="title" @click="goAlbumDetails(item.id)">{{ item.name }}</p>
                    <span class="desc">描述：{{ item.desc }}</span>
                    <span class="desc">
                        创建时间：
                        <n-time :time="new Date(item.create_time * 1000)" />
                    </span>
                </div>
                <div class="card-right">
                    <n-icon class="edit" size="20" @click="beforeEdit(item)">
                        <edit></edit>
                    </n-icon>
                    <n-popconfirm negative-text="取消" positive-text="确认" @positive-click="deleteClick(item.id)">
                        <template #trigger>
                            <n-icon class="edit" size="20">
                                <delete></delete>
                            </n-icon>
                        </template>
                        是否删除这个收藏夹
                    </n-popconfirm>
                </div>
            </div>
        </n-scrollbar>
    </div>
    <!-- 修改相册信息抽屉 -->
    <n-drawer v-model:show="updateActive" :width="500" placement="right">
        <n-drawer-content title="编辑相册">
            <!-- 封面图片上传 -->
            <cover-uploader :cover="albumInfo.cover" @finish="finishUpload"></cover-uploader>
            <!-- 表单内容 -->
            <n-form>
                <n-form-item label="相册名称">
                    <n-input v-model:value="albumInfo.name" placeholder="请输入相册名称"></n-input>
                </n-form-item>
                <n-form-item label="相册描述">
                    <n-input v-model:value="albumInfo.desc" placeholder="请输入相册描述"></n-input>
                </n-form-item>

                <n-button type="primary" @click="updateAlbumInfo">保存</n-button>

            </n-form>
        </n-drawer-content>
    </n-drawer>

    <!-- 创建相册模态框 -->
    <n-modal style="width: auto;" v-model:show="createActive" preset="card" title="创建相册">
        <!-- 封面图片上传 -->
        <cover-uploader :cover="createAlbumInfo.cover" @finish="finishUpload"></cover-uploader>
        <!-- 表单内容 -->
        <n-form>
            <n-form-item label="相册名称">
                <n-input v-model:value="createAlbumInfo.name" placeholder="请输入相册名称"></n-input>
            </n-form-item>
            <n-form-item label="相册描述">
                <n-input v-model:value="createAlbumInfo.desc" placeholder="请输入相册描述"></n-input>
            </n-form-item>

            <n-button type="primary" @click="createAlbum">保存</n-button>

        </n-form>
    </n-modal>
</template>

<script setup lang="ts">
import { createAlbumAPI, deleteAlbumAPI, updateAlbumInfoAPI, } from "@/apis/api/album";
import type { AlbumType, CreateAlbumType, UpdateAlbumType } from '@/apis/types/album-type';
import { Delete, Edit } from "@/icons";
import { getResourceUrl } from "@/utils/resource";
import { statusCode } from '@/utils/status-code';

import { NButton, NDrawer, NDrawerContent, NForm, NFormItem, NIcon, NInput, NModal, NPopconfirm, NScrollbar, NTime, useNotification } from 'naive-ui';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import CoverUploader from "./component/CoverUploader.vue";

import { listAlbumAPI } from '@/apis/api/album';
const albumList = ref<Array<AlbumType>>([])

const notification = useNotification();
const initTheme = () => {
    const theme = {
        primaryColor: "#ffc90c",
        primaryHoverColor: "#f8df72"
    }

    return {
        "--hover-color": theme.primaryHoverColor
    }
}

const albumInfo = reactive<UpdateAlbumType>({
    id: 0,
    name: "",
    desc: "",
    cover: "",
})

const createAlbumInfo = reactive<CreateAlbumType>({
    name: "",
    desc: "",
    cover: "",
})

const updateActive = ref(false);//显示编辑抽屉
const createActive = ref(false);//显示创建模态框

const beforeEdit = (item: AlbumType) => {
    albumInfo.id = item.id;
    albumInfo.name = item.name;
    albumInfo.desc = item.desc;
    albumInfo.cover = item.cover;
    updateActive.value = true;

}
// 列出相册
const listAlbum = () => {
    listAlbumAPI().then((res) => {
        if (res.data.code === statusCode.success) {
            albumList.value = res.data.data
        }
    })
}

//封面上传完成
const finishUpload = (cover: string) => {
    albumInfo.cover = cover;
    createAlbumInfo.cover = cover;
}

//删除相册
const deleteClick = (id: number) => {
    deleteAlbumAPI(id).then((res) => {
        if (res.data.code === statusCode.success) {
            listAlbum()
            notification.success({
                title: "删除成功",
                duration: 2000
            })

        }
    })
}

// TODO: 跳转到相册详情
const router = useRouter();
const goAlbumDetails = (id: number) => {
    router.push({ name: "AlbumDetail", params: { id: id } });
}

// 更新相册信息
const updateAlbumInfo = () => {
    updateAlbumInfoAPI(albumInfo.id, albumInfo).then((res) => {
        if (res.data.code === statusCode.success) {
            listAlbum()
            updateActive.value = false;
            notification.success({
                title: "更新成功",
                duration: 2000
            })

        }
    })
}

// 创建相册
const createAlbum = () => {
    createAlbumAPI(createAlbumInfo).then((res) => {
        if (res.data.code === statusCode.success) {
            listAlbum()
            createActive.value = false;
            notification.success({
                title: "创建成功",
                duration: 2000
            })

        }
    })
}

onBeforeMount(() => {
    listAlbum();
})
</script>

<style lang="less" scoped>
.album-list {
    margin: 0 26px;

    .create-title {
        line-height: 30px;
        font-size: 20px;
        user-select: none;
        // p标签默认样式
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    .create-button {
        // line-height: 30px;
        // 顶部居右
        float: right;
        // 置顶
        z-index: 1;


    }

    .card-item {
        width: 100%;
        height: 80px;
        margin-bottom: 12px;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 12px;
    }
}

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

    .no-cover {
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
    width: 90px;
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
</style>
