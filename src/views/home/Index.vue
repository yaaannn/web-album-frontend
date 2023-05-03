<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-v-for -->
<template>
    <div class="home" :style="initTheme()" v-title :data-title="`${globalConfig.title}`">
        <home-header class="home-header"></home-header>
        <div class="home-content">
            <div class="home-left">
                <home-sidebar class="home-sidebar"></home-sidebar>
            </div>
            <div class="home-right">

                <div class="home-recommended">
                    <picture-item v-for="item in pictureList" :info="item"></picture-item>
                </div>
                <n-pagination style="justify-content: center; " v-model:page="page" :item-count="count" :page-size="8"
                    @update-page="pageChange" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import HomeHeader from "./component/HomeHeader.vue";
import HomeSidebar from './component/HomeSidebar.vue';
import { globalConfig } from "@/utils/global-config";
import { statusCode } from '@/utils/status-code';

import PictureItem from '@/components/picture-item/Index.vue';
import type { PhotoType } from '@/apis/types/photo-type';
import { getPublicPhotoAPI } from '@/apis/api/photo';
import { NPagination } from 'naive-ui';
const page = ref(1);
const count = ref(0);
const pageSize = 8;
const pictureList = ref<Array<PhotoType>>([]);
const getPublicPicture = (page: number, pageSize: number) => {
    getPublicPhotoAPI(page, pageSize).then((res) => {
        if (res.data.code === statusCode.success) {
            pictureList.value = res.data.data;
            count.value = res.data.total;
        }
    })
}

const pageChange = (target: number) => {
    page.value = target;
    getPublicPicture(page.value, pageSize);
}
const initTheme = () => {
    const theme = {
        primaryColor: "#ffc90c",
        primaryHoverColor: "#f8df72"
    }
    return {
        "--primary-color": theme.primaryColor
    }
}



onBeforeMount(() => {
    getPublicPicture(page.value, pageSize);
})
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    min-width: 1200px;
    height: 100vh;


    .home-header {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
        background-color: #fff;
    }
}

.home-content {
    display: flex;
    margin-top: 60px;

    .home-left {
        width: 220px;
        transition: width .25s;

        .home-sidebar {
            position: fixed;
        }
    }


    .home-right {
        flex: 1;
    }
}

.home-recommended {
    display: grid;
    margin-left: 20px;
    width: calc(100% - 50px);
    gap: 0 16px;
    grid-template-columns: repeat(4, 1fr);
    // height: 1040px;
    height: 550px;
    overflow: hidden;
}
</style>