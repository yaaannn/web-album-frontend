<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="upload" v-title data-title="上传图片">
        <header-bar></header-bar>
        <div class="upload-container">
            <div class="upload-router">
                <upload-photo />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/header-bar/Index.vue';
import UploadPhoto from './upload-photo/Index.vue';

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