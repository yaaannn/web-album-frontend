<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="upload" v-title data-title="上传图片">
        <header-bar></header-bar>
        <div class="upload-container">
            <n-menu class="upload-menu" :options="menuOptions" :default-value="defaultOption" />
            <div class="upload-router">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/header-bar/Index.vue';
import { h, ref, onBeforeMount } from "vue";
import { NIcon, NMenu } from "naive-ui";
import { RouterLink, useRoute } from 'vue-router';
import { Upload, Comment } from '@/icons';
const route = useRoute();
const defaultOption = ref('');//默认激活菜单
function renderIcon(icon: any, color?: string) {
    return () => h(NIcon, { color: color }, { default: () => h(icon) });
}
const menuOptions = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: "UploadPhoto",
                    }
                },
                { default: () => "图片管理" }
            ),
        key: "upload",
        icon: renderIcon(Upload),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: "CommentManage",
                    }
                },
                { default: () => "评论管理" }
            ),
        key: "comment",
        icon: renderIcon(Comment),
    },
];

onBeforeMount(() => {
    // defaultOption.value = route.name as string;
});
</script>

<style lang="less" scoped>
.upload {
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow-y: scroll;
    background: #f7f7f7;

    .upload-container {
        display: flex;
        width: 1100px;
        margin: 20px auto;
    }

    .upload-menu {
        width: 220px;
        height: 500px;
        min-width: 200px;
        background-color: #fff;
    }

    .upload-router {
        flex: 1;
        min-width: 700px;
        min-height: 500px;
        margin-left: 20px;
        background-color: #fff;
    }
}


@media (min-width: 1400px) {
    .upload {
        .upload-container {
            width: 1300px;
        }
    }
}
</style>