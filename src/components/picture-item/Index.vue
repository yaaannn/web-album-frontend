<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="picture-item" :style="initTheme()">
        <div class="img">
            <img :src="getResourceUrl(props.info.url)" alt="">
        </div>
        <div class="picture-info">
            <span class="title" @click="goPhotoDetail(props.info.id)">{{ props.info.name }}</span>
            <div class="author">
                <div class="avatar">
                    <common-avatar :url="getResourceUrl(props.info.author.avatar || '')" :size="26"
                        :iconsize="16"></common-avatar>
                </div>
                <div class="name-date">
                    <span class="name" @click="goUserDetail(props.info.author.id)">{{ props.info.author.nickname
                    }}</span>
                    <span> · </span>
                    <n-time :time="new Date(props.info.create_time * 1000)" type="datetime" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import CommonAvatar from "../common-avatar/Index.vue";
import { NTime } from "naive-ui";
import type { PhotoType } from "@/apis/types/photo-type"
import { getResourceUrl } from "@/utils/resource";
import { useRouter } from "vue-router";
const props = defineProps<{
    info: PhotoType
}>()
const initTheme = () => {
    const theme = {
        primaryColor: "#ffc90c",
        primaryHoverColor: "#f8df72"
    }
    return {
        "--primary-color": theme.primaryColor
    }
}

const router = useRouter();
const goPhotoDetail = (id: number) => {
    let photoUrl = router.resolve({ name: "Photo", params: { id: id } });
    window.open(photoUrl.href, "_blank");
}

const goUserDetail = (id: number) => {
    let userUrl = router.resolve({ name: "User", params: { uid: id } });
    window.open(userUrl.href, "_blank");
}

</script>


<style lang="less" scoped>
.picture-item {
    width: 100%;
    height: 260px;
    // border: #18191c 1px solid;
    border-radius: 5%;
    box-shadow: 16px 16px 50px -12px rgba(0, 0, 0, 0.1);


    .img {
        width: 100%;
        height: 160px;
        border-radius: 10px;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0);

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .picture-info {
        margin-top: 8px;

        .title {
            height: 44px;
            color: #18191c;
            padding-right: 12px;
            font-size: 15px;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            text-align: center;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-weight: 500;
            cursor: pointer;

            &:hover {
                color: var(--primary-color);
            }
        }

        .author {
            display: flex;
            align-items: center;
            font-size: 13px;
            color: #9499a0;
            margin-top: 5px;

            .avatar {
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, .2);
            }

            .name-date {
                margin-left: 10px;

                .name {
                    cursor: pointer;

                    &:hover {
                        color: var(--primary-color);
                    }
                }
            }

        }
    }
}
</style>