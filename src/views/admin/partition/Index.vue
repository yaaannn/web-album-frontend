<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
    <n-card class="card">
        <div class="info-header">
            <n-button type="primary" @click="showCreate = true">新建分区</n-button>
        </div>
        <n-table class="table" striped>
            <thead class="table-head">
                <tr>
                    <th>ID</th>
                    <th>分区名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr v-for="item in partitionList">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td class="btn-list">
                        <n-button text @click="deletePartition(item.id)">删除</n-button>
                        <n-button text @click="beforeUpdatePartition(item)">修改</n-button>
                    </td>
                </tr>
            </tbody>
        </n-table>
        <!--新增分区-->
        <n-drawer v-model:show="showCreate" :width="500" placement="right">
            <n-drawer-content title="新建分区">
                <n-form class="info-form">
                    <n-form-item label="分区名">
                        <n-input v-model:value="partitionForm.name" placeholder="请输入名称" maxlength="20" show-count />
                    </n-form-item>
                    <n-button type="primary" @click="createPartition">保存</n-button>
                </n-form>
            </n-drawer-content>
        </n-drawer>
        <!-- 修改分区 -->
        <n-drawer v-model:show="showUpdate" :width="500" placement="right">
            <n-drawer-content title="修改分区">
                <n-form class="info-form">
                    <n-form-item label="分区名">
                        <n-input v-model:value="partitionForm.name" placeholder="请输入名称" maxlength="20" show-count />
                    </n-form-item>
                    <n-button type="primary" @click="updatePartition">保存</n-button>
                </n-form>
            </n-drawer-content>
        </n-drawer>
    </n-card>
</template>

<script setup lang="ts">
import { createPartitionAPI, deletePartitionAPI, getPartitionListAPI, updatePartitionAPI } from '@/apis/admin/api/admin';
import type { PartitionType } from '@/apis/admin/types/partition-type';
import { statusCode } from '@/utils/status-code';
import { NButton, NCard, NDrawer, NDrawerContent, NForm, NFormItem, NInput, NTable, useNotification } from 'naive-ui';
import { onBeforeMount, ref } from 'vue';
const notification = useNotification();
const showCreate = ref(false);
const showUpdate = ref(false);
const partitionList = ref<Array<PartitionType>>([]);


const getPartitionList = () => {
    getPartitionListAPI().then((res) => {
        if (res.data.code === statusCode.success) {
            partitionList.value = res.data.data;
        }
    })
}

const partitionForm = ref({
    id: 0,
    name: '',
});

const createPartition = () => {
    createPartitionAPI(partitionForm.value.name).then((res) => {
        console.log(res);
        if (res.data.code === statusCode.success) {
            showCreate.value = false;
            getPartitionList();
            notification.success({
                title: '成功',
                description: '创建成功',
                duration: 2000,
            });
        } else {
            notification.error({
                title: '失败',
                description: res.data.msg,
                duration: 2000,
            });
        }
    })
}

const beforeUpdatePartition = (item: PartitionType) => {
    partitionForm.value = item;
    showUpdate.value = true;
}

const updatePartition = () => {
    updatePartitionAPI(partitionForm.value.id, partitionForm.value.name).then((res) => {
        console.log(res);
        if (res.data.code === statusCode.success) {
            showUpdate.value = false;
            getPartitionList();
            notification.success({
                title: '成功',
                description: '修改成功',
                duration: 2000,
            });
        } else {
            notification.error({
                title: '失败',
                description: res.data.msg,
                duration: 2000,
            });
        }
    })
}

const deletePartition = (id: number) => {
    deletePartitionAPI(id).then((res) => {
        console.log(res);
        if (res.data.code === statusCode.success) {
            getPartitionList();
            notification.success({
                title: '成功',
                description: '删除成功',
                duration: 2000,
            });
        } else {
            notification.error({
                title: '失败',
                description: res.data.msg,
                duration: 2000,
            });
        }
    })
}

onBeforeMount(() => {
    getPartitionList();
});
</script>

<style lang="less" scoped>
.card {
    margin: 10px;
    width: calc(100% - 20px);
    border-radius: 10px;

    .info-header {
        float: right;
        height: 30px;
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
</style>