<template>
    <div class="photo-author">
        <div class="photo-author-box">
            <div class="author-avatar">
                <common-avatar :url="getResourceUrl(authorInfo.avatar || '')" :size="50" :iconsize="16"></common-avatar>
            </div>
            <div class="author-info">
                <p>{{ authorInfo.nickname }}</p>
                <p>{{ authorInfo.regions }}</p>
            </div>
            <div class="follow-btn">
                <n-button size="small" v-if="1" type="primary">
                    已关注
                </n-button>
                <n-button size="small" v-else type="error">
                    关注
                </n-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getResourceUrl } from "@/utils/resource";
import CommonAvatar from "@/components/common-avatar/Index.vue";

import { NButton } from "naive-ui";
import type { UserInfoType } from "@/apis/types/user-type";
import { ref } from "vue";
const props = defineProps<{
    author?: UserInfoType,
}>()
const authorInfo = ref(Object.assign({}, props.author));
</script>

<style lang="less" scoped>
.photo-author {
    width: 100%;
    height: 90px;
    border-radius: 6px;
    background-color: #f1f2f3;

    .photo-author-box {
        display: flex;
        height: 100%;
        align-items: center;

        .author-avatar {
            width: 50px;
            height: 50px;
            padding-left: 10px;
        }

        .author-info {
            height: 50px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: calc(100% - 160px);
            padding-left: 16px;

            p {
                width: 100%;
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;

                &:nth-child(1) {
                    color: #222;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 500;
                }

                &:nth-child(2) {
                    color: #999;
                    font-size: 12px;
                }
            }
        }

        .follow-btn {
            width: 80px;
            text-align: center;
        }
    }
}
</style>