<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
    <n-card class="card">
        <n-table class="table" striped>
            <thead class="table-head">
                <tr>
                    <th>评论ID</th>
                    <th>评论内容</th>
                    <th>评论时间</th>
                    <th>评论用户</th>
                    <th>关联视频ID</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr v-for="item in commentList">
                    <td>{{ item.id }}</td>
                    <td>{{ item.content }}</td>
                    <td>
                        <n-time :time="new Date(item.create_time * 1000)" />
                    </td>
                    <td>{{ item.author.username }}</td>
                    <td>{{ item.photo }}</td>
                    <td class="btn-list">
                        <n-button text @click="deleteComment(item.id)">删除</n-button>
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
import type { CommentType } from '@/apis/admin/types/comment-type';
import { NCard, NTable, NPagination, NTime, NButton, useNotification } from 'naive-ui';
import { onBeforeMount, ref } from 'vue';
import { getCommentListAPI } from '@/apis/admin/api/admin';
import { statusCode } from '@/utils/status-code';
const page = ref(1);
const count = ref(0);
const notification = useNotification();
const commentList = ref<Array<CommentType>>([]);

//页码改变
const pageChange = (target: number) => {
    page.value = target;
    getCommentList();
}
const getCommentList = () => {
    getCommentListAPI(page.value, 5).then((res) => {
        if (res.data.code === statusCode.success) {
            commentList.value = res.data.data;
            count.value = res.data.count;
        }
    })
}

const deleteComment = (id: number) => {
    console.log(id);

    notification.info({
        title: "提示",
        description: "暂时不支持删除评论",
        duration: 2000
    })
}

onBeforeMount(() => {
    getCommentList();
});
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