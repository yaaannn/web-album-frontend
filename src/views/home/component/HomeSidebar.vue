<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div class="sidebar">
        <div class="menu-group">
            <span class="menu-item" @click="goSpace('Album')">
                <span class="menu-text">我的相册</span>
            </span>
            <span class="menu-item" @click="goSpace('Setting')">
                <span class="menu-text">个人设置</span>
            </span>
            <span class="menu-item" @click="goSpace('Space')">
                <span class="menu-text">个人中心</span>
            </span>
        </div>
        <div class="menu-group">
            <span class="menu-item menu-item-only-text" v-for="item in partitionList" @click="goPhotoList(item.id)">
                {{ item.name }}
            </span>
        </div>
        <div class="menu-group">

            <span class="menu-item" @click="goAdmin()">
                <span class="menu-text">登录后台</span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getPartitionListAPI } from "@/apis/api/partition";
import type { PartitionType } from "@/apis/types/partition-type";
import { statusCode } from "@/utils/status-code";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const partitionList = ref<Array<PartitionType>>([])
const getPartitionList = () => {
    getPartitionListAPI().then((res) => {
        if (res.data.code === statusCode.success) {
            partitionList.value = res.data.data;
        }
    })
}
// 前往个人空间
const goSpace = (name: string) => {
    router.push({ name: name });
}

// 前往后台
const goAdmin = () => {
    // 打开新标签页
    let adminUrl = router.resolve({ name: 'AdminLogin' })
    window.open(adminUrl.href, '_blank')
    // router.push({ name: 'AdminLogin' });
}
const goPhotoList = (id: number) => {
    router.push({ name: "PhotoList", query: { partition: id } });
}
onBeforeMount(() => {
    getPartitionList();
})
</script>

<style lang="less" scoped>
.sidebar {
    width: 220px;
    white-space: nowrap;
    overflow-x: hidden;
}



.menu-group {
    border-bottom: 1px solid rgba(0, 0, 0, .1);

    .menu-item {
        display: block;
        height: 30px;
        margin: 6px 10px;
        padding: 8px 0;
        padding-left: 20px;
        line-height: 30px;
        border-radius: 6px;
        // border: #ffc90c solid 1px;
        // background-color: #ffc90c;
        // color: white;
        cursor: pointer;

        &-only-text {
            padding-left: 30px;
        }

        &:hover {
            background-color: rgba(0, 0, 0, .1);
        }
    }

}
</style>