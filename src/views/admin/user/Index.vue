<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
    <n-card class="card">
        <n-table class="table" striped>
            <thead class="table-head">
                <tr>
                    <th>ID</th>
                    <th>头像</th>
                    <th>用户名</th>
                    <th>昵称</th>
                    <th>性别</th>
                    <th>邮箱</th>
                    <th>注册时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr v-for="item in userList">
                    <td>{{ item.id }}</td>
                    <td>
                        <common-avatar :url="getResourceUrl(item.avatar || '')"></common-avatar>
                    </td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.nickname }}</td>
                    <td v-if="item.gender === '0'">男</td>
                    <td v-else-if="item.gender === '1'">女</td>
                    <td v-else>保密</td>

                    <td>{{ item.email }}</td>
                    <td>
                        <n-time :time="new Date(item.create_time * 1000)" />
                    </td>

                    <td class="btn-list">
                        <n-button text @click="deleteUser(item.id)">删除</n-button>
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
import { getUserListAPI, deleteUserAPI } from '@/apis/admin/api/admin';
import type { UserInfoType } from '@/apis/admin/types/user-type';
import { getResourceUrl } from '@/utils/resource';
import {
    statusCode
} from '@/utils/status-code';
import CommonAvatar from '@/components/common-avatar/Index.vue';
import {
    NButton, NCard,
    NPagination,
    NTable,
    NTime,
    useMessage
} from 'naive-ui';


const message = useMessage();//通知

const page = ref(1);
const count = ref(0);
const userList = ref<Array<UserInfoType>>([]);
const getUserList = () => {
    getUserListAPI(page.value, 6).then((res) => {
        if (res.data.code === statusCode.success) {
            count.value = res.data.data.total;
            userList.value = res.data.data;
        } else {
            message.error(res.data.msg);
        }
    }).catch(() => {
        message.error('加载失败');
    });
}

//页码改变
const pageChange = (target: number) => {
    page.value = target;
    getUserList();
}

// 删除
const deleteUser = (id: number) => {
    deleteUserAPI(id).then((res) => {
        if (res.data.code === statusCode.success) {
            message.success('删除成功');
            getUserList();
        } else {
            message.error(res.data.msg);
        }
    }).catch(() => {
        message.error('删除失败');
    });
}

onBeforeMount(() => {
    getUserList();
})
</script>

<style lang="less" scoped>
.card {
    margin: 10px;
    width: calc(100% - 20px);
    border-radius: 10px;

    .info-header {
        float: right;
        height: 30px;
        width: 300px;
        margin-bottom: 20px;
    }

    .table {

        .table-head {
            text-align: center;
        }

        .table-body {
            text-align: center;

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