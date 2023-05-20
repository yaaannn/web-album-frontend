<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
    <n-card class="card">
        <div class="info-header">
            <n-button type="primary" @click="showAdd = true">新增</n-button>
        </div>
        <n-table class="table" striped>
            <thead class="table-head">
                <tr>
                    <th>敏感词</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr v-for="item in keywords">
                    <td>{{ item }}</td>
                </tr>
            </tbody>
        </n-table>
        <n-modal style="width: auto;" v-model:show="showAdd" preset="card" title="新增敏感词">
            <n-input v-model:value="keyword" placeholder=""></n-input>
            <n-button type="primary" @click="addKeyword()">确定</n-button>
        </n-modal>
    </n-card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { getSensitiveWordListAPI, addSensitiveWordAPI } from '@/apis/admin/api/admin';
import {
    statusCode
} from '@/utils/status-code';
import {
    NButton, NCard,
    NTable,
    useMessage, NModal, NInput
} from 'naive-ui';

const keyword = ref<string>('');

const message = useMessage();//通知
const showAdd = ref(false);
const keywords = ref<Array<string>>([]);
const getSensitiveWordList = () => {
    getSensitiveWordListAPI().then((res) => {
        if (res.data.code === statusCode.success) {
            keywords.value = res.data.data.keywords;
        } else {
            message.error(res.data.message);
        }
    });
};

const addKeyword = () => {
    addSensitiveWordAPI(keyword.value).then((res) => {
        if (res.data.code === statusCode.success) {
            message.success(res.data.msg);
            getSensitiveWordList();
            showAdd.value = false;
        } else {
            message.error(res.data.msg);
        }
    });

}

onBeforeMount(() => {
    getSensitiveWordList();
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