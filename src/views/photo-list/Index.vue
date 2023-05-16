<template>
    <div v-title data-title="全部视频">
        <n-affix class="header" :top="0">
            <header-bar></header-bar>
        </n-affix>
        <!-- 分区选择 -->
        <div class="content">
            <div class="partitions">
                <p v-for="item in partitionInfo.partitions" :key="item.id" @click="selectPartition(item.id)">
                    <span :class="partitionInfo.selectedPartition === item.id ? 'selected' : ''">
                        {{ item.name }}
                    </span>
                </p>
            </div>
        </div>

        <div class="card-list">
            <div v-for="(item, index) in photoList" :key="index">
                <picture-item :info="item"></picture-item>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NAffix } from "naive-ui";
import HeaderBar from "@/components/header-bar/Index.vue";
import PictureItem from '@/components/picture-item/Index.vue';
import { onBeforeMount, reactive, ref } from "vue";
import type { PartitionType } from "@/apis/types/partition-type";
import { getPartitionListAPI } from "@/apis/api/partition";
import { statusCode } from "@/utils/status-code";
import { useRoute, useRouter } from 'vue-router'
import type { PhotoType } from "@/apis/types/photo-type";
import { getPhotoListByPartitionAPI } from "@/apis/api/photo";
const router = useRouter();
const route = useRoute();
const partitionInfo = reactive({
    partitions: [] as PartitionType[], //分区内容
    selectedPartition: 0,//选中分区
});
const getPartitionList = () => {
    getPartitionListAPI().then((res) => {
        if (res.data.code === statusCode.success) {
            partitionInfo.partitions = res.data.data;
        }
    })
}
//设置分区
const selectPartition = (id: number) => {
    if (partitionInfo.selectedPartition === id) return;
    let newQuery = JSON.parse(JSON.stringify(route.query));
    newQuery.partition = id;
    partitionInfo.selectedPartition = id;
    router.replace({ query: newQuery });
    getPhotoList(true);
}
let page = 1;

const photoList = ref<Array<PhotoType>>([]);
const getPhotoList = (init = false) => {
    if (init) {
        page = 1;
        photoList.value = [];
    }
    const current = partitionInfo.selectedPartition;
    console.log(current);

    getPhotoListByPartitionAPI(current, page, 8).then((res) => {
        console.log(res.data);

        if (res.data.code === statusCode.success) {
            if (res.data.data) {
                photoList.value.push(...res.data.data);
                console.log(photoList.value);

            }
        }
    });
}

onBeforeMount(() => {
    partitionInfo.selectedPartition = Number(route.query.partition);
    getPartitionList();
    getPhotoList()
})
</script>

<style lang="less" scoped>
.header {
    z-index: 999;
    width: 100%;
}

.content {
    width: 90%;
    min-width: 700px;
    margin: 90px auto 10px auto;
}

.partitions {
    display: flex;
    margin-top: 20px;

    p {
        cursor: pointer;
        margin: 0 20px;

        span {
            padding: 3px 6px;
        }
    }

    .selected {
        color: #fff;
        border-radius: 6px;
        background-color: rgba(24, 143, 255, 0.5);
    }
}

.card-list {
    display: grid;
    gap: 0 16px;
    grid-template-columns: repeat(5, 1fr);
    width: 90%;
    margin: 20px auto;
}
</style>