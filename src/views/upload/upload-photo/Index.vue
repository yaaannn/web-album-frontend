<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="upload-picture-info">
        <cover-uploader class="upload" :cover="photoInfo.url" @finish="finishUpload" />
        <n-form class="info-form" label-placement="left" label-width="auto">
            <n-form-item label="标题">
                <n-input v-model:value="photoInfo.name" placeholder="请输入标题" maxlength="50" show-count />
            </n-form-item>
            <n-form-item label="描述">
                <n-input v-model:value="photoInfo.desc" placeholder="简单介绍一下照片~" maxlength="200" :autosize="descSize"
                    show-count type="textarea" />
            </n-form-item>
            <n-form-item label="是否公开">
                <n-switch v-model:value="photoInfo.is_public" />

            </n-form-item>
            <n-form-item label="选择相册">
                <n-select class="select" placeholder="选择相册" label-field="name" value-field="id" remote
                    v-model:value="photoInfo.album_id" :options="albumList" />
            </n-form-item>
            <n-form-item label="选择分区">
                <n-select class="select" placeholder="选择分区" label-field="name" value-field="id" remote
                    v-model:value="photoInfo.partition_id" :options="partitionList" />
            </n-form-item>
            <div class="upload-next-btn">
                <n-button type="primary" @click="uploadPhotoInfo">确定</n-button>
            </div>
        </n-form>
    </div>
</template>

<script setup lang="ts">
import { listAlbumAPI } from '@/apis/api/album';
import { getPartitionListAPI } from "@/apis/api/partition";
import { UploadPhotoInfoAPI, } from "@/apis/api/photo";
import type { AlbumType } from "@/apis/types/album-type";
import type { PartitionType } from "@/apis/types/partition-type";
import { statusCode } from '@/utils/status-code';
import { NButton, NForm, NFormItem, NInput, NSelect, NSwitch } from 'naive-ui'; //表单相关
import { onBeforeMount, reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import CoverUploader from "./component/CoverUploader.vue";
const router = useRouter();
//简介输入框大小
const descSize = {
    minRows: 3,
    maxRows: 5
}
const photoInfo = reactive({
    name: "",
    desc: "",
    album_id: null,
    partition_id: null,
    url: "",
    is_public: true,
})

//封面上传完成
const finishUpload = (url: string) => {
    photoInfo.url = url
}
// 页面跳转
const goPage = (name: string) => {
    router.push({ name: name });
}
//上传视频信息
const uploadPhotoInfo = () => {
    UploadPhotoInfoAPI(photoInfo).then((res) => {
        if (res.data.code === statusCode.success) {
            goPage("Space")
        }
    })

}
const albumList = ref<Array<AlbumType>>([]);
const ListAlbum = () => {
    listAlbumAPI().then((res) => {
        // let albumList: Array<AlbumType> = [];
        if (res.data.code === statusCode.success) {
            albumList.value = res.data.data;
        }
    })
}

const partitionList = ref<Array<PartitionType>>([]);
const ListPartition = () => {
    getPartitionListAPI().then((res) => {
        // let albumList: Array<AlbumType> = [];
        if (res.data.code === statusCode.success) {
            partitionList.value = res.data.data;
        }
    })
}

onBeforeMount(() => {
    ListAlbum()
    ListPartition()
},

)

</script>

<style lang="less" scoped>
.upload {
    margin: 50px auto;
}

.info-form {
    width: calc(100% - 260px);
    margin-left: 130px;

    .upload-next-btn {
        float: right;
        margin-bottom: 20px;

        button {
            width: 160px;
            height: 40px;
        }
    }
}
</style>