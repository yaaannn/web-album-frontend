<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
    <n-card class="card">
        <n-table class="table" striped>
            <thead class="table-head">
                <tr>
                    <th>ID</th>
                    <th>预览</th>
                    <th>标题</th>
                    <th>简介</th>
                    <th>隐私</th>
                    <th>作者</th>
                    <th>上传时间</th>
                    <th>审核状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr v-for="item in photoList">
                    <td>{{ item.id }}</td>
                    <td>
                        <img class="cover" :src="getResourceUrl(item.url)" alt="图片封面">
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.desc }}</td>
                    <td v-if="item.is_public === true">公开</td>
                    <td v-else>私密</td>
                    <td>{{ item.author.username }}</td>
                    <td>
                        <n-time :time="new Date(item.create_time * 1000)" />
                    </td>
                    <td>
                        <span v-if="item.status === 0">正常</span>
                        <span v-else-if="item.status === 1">审核中</span>
                        <span v-else>审核不通过</span>
                    </td>
                    <td class="btn-list">

                        <n-popconfirm positive-text="通过" negative-text="不通过" @positive-click="auditPhoto(item.id, 0)"
                            @negative-click="auditPhoto(item.id, 2)">
                            <template #trigger>
                                <n-button text>审核</n-button>
                            </template>
                            是否通过审核
                        </n-popconfirm>
                        <n-button text @click="deletePhoto(item.id)">删除</n-button>
                    </td>
                </tr>
            </tbody>
        </n-table>
        <div class="pagination">
            <n-pagination v-model:page="page" :item-count="count" :page-size="6" @update-page="pageChange" />
        </div>
    </n-card>
</template>

<script setup lang="ts">

import { onBeforeMount, ref } from 'vue';
import { NTable, NButton, NCard, NTime, NPagination, useNotification, NPopconfirm } from 'naive-ui';
import { auditPhotoAPI, deletePhotoAPI, getPhotoListAPI } from '@/apis/admin/api/admin';
import { getResourceUrl } from '@/utils/resource';
import { statusCode } from '@/utils/status-code';
import type { PhotoType } from '@/apis/admin/types/photo-type';


const notification = useNotification();//通知

const page = ref(1);
const count = ref(0);

const photoList = ref<Array<PhotoType>>([]);
const getPhotoList = () => {
    getPhotoListAPI(page.value, 5).then((res) => {
        if (res.data.code === statusCode.success) {
            count.value = res.data.total;
            photoList.value = res.data.data;
        }
    }).catch(() => {
        notification.error({
            title: '加载视频失败',
            duration: 5000,
        })
    });
}

const deletePhoto = (id: number) => {
    deletePhotoAPI(id).then((res) => {
        if (res.data.code === statusCode.success) {
            notification.success({
                title: '删除成功',
                duration: 5000,
            })
            getPhotoList();
        }
    }).catch(() => {
        notification.error({
            title: '删除失败',
            duration: 5000,
        })
    })
}

const auditPhoto = (id: number, status: number) => {
    auditPhotoAPI(id, status).then((res) => {
        if (res.data.code === statusCode.success) {
            notification.success({
                title: '审核成功',
                duration: 5000,
            })
            getPhotoList();
        }
    }).catch(() => {
        notification.error({
            title: '审核失败',
            duration: 5000,
        })
    })
}

//页码改变
const pageChange = (target: number) => {
    page.value = target;
    getPhotoList();
}




onBeforeMount(() => {
    getPhotoList();
})
</script>

<style lang="less" scoped>
.card {
    margin: 10px;
    width: calc(100% - 20px);
    border-radius: 10px;

    .info-header {
        display: flex;
        height: 30px;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        .search {
            width: 300px;
        }
    }

    .table {
        .table-head {
            text-align: center;
        }

        .table-body {
            text-align: center;

            .cover {
                height: 60px;
                width: 100px;
                object-fit: contain;
                background-color: white;
            }

            .btn-list {
                button {
                    margin: 0 6px;
                }
            }
        }
    }
}

.pagination {
    margin-top: 20px;
}
</style>