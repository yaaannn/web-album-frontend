<template>
  <div class="space-cover-cropper">
    <div class="cropper-container">
      <pic-cropper
        ref="cropperRef"
        :key="props.file?.name"
        :file="props.file"
        :minHeight="360"
        :minWidth="640"
        fillColor="#e6e6e6"
        @change="imgChange"
      ></pic-cropper>
    </div>
    <div class="btn-container">
      <n-button type="primary" @click="uploadPicture">裁剪并上传</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PicCropper from "./PicCropper.vue";
import { NButton } from "naive-ui";
import { uploadFileAPI } from "@/apis/api/upload";

const props = defineProps<{
  file?: File;
}>();

const cropperRef = ref<InstanceType<typeof PicCropper> | null>(null);

const previewURL = ref("");
const imgChange = (url: string) => {
  previewURL.value = url;
};
const emits = defineEmits(["stateChange"]);
const uploadPicture = async () => {
  if (cropperRef.value) {
    const file = await cropperRef.value.getFile();
    uploadFileAPI({
      name: "image-" + Date.now(),
      // action: "v1/public/upload/ipfs",
      action: "v1/public/upload",
      file: file,
      onProgress: () => {},
      onError: () => {
        emits("stateChange", "error");
      },
      onFinish: (data?: string) => {
        emits("stateChange", "success", data);
      },
    });
  }
};
</script>

<style lang="less" scoped>
.space-cover-cropper {
  box-sizing: border-box;
  padding: 10px;
  max-width: 700px;
  max-height: 360px;

  .cropper-container {
    padding-top: 20px;
    width: 100%;
    height: 280px;
  }

  .btn-container {
    height: 60px;
    position: relative;

    button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
  }
}
</style>
