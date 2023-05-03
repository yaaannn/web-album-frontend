<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="photo" :style="initTheme()">
        <HeaderBar class="header" />
        <div class="photo-main">
            <div class="content-left">
                <div class="photo-player">
                    <div class="photo-title-box">
                        <p class="photo-title">{{ photoInfo!.name }}</p>
                    </div>
                    <div class="player-container">
                        <!-- <img class="player1" :src="getResourceUrl(photoInfo!.url)" /> -->
                        <img class="player2" :src="getResourceUrl(photoInfo!.url)" />
                    </div>
                    <!-- <div class="photo-title-box">
                        <p class="photo-title">{{ photoInfo!.name }}</p>
                    </div> -->
                    <div class="photo-toolbar">
                        <div class="toolbar-left">
                            <div class="archive-item">
                                <n-icon :class="[likeAnimation, is_like ? 'active' : 'icon']" @click="likeClick">
                                    <Like></Like>
                                </n-icon>
                                <p>{{ like }}</p>
                            </div>
                        </div>
                        <div class="toolbar-right">
                            <span>1 人在看</span>
                            <span>{{ photoInfo?.click }} 浏览量</span>
                            <span>上传时间
                                <n-time :time="new Date(photoInfo!.create_time * 1000)"></n-time>
                            </span>
                        </div>
                    </div>
                    <div class="desc">
                        简介:{{ photoInfo!.desc }}
                    </div>
                    <comment-list :id="photoInfo!.id"></comment-list>
                </div>
            </div>
            <div class="content-right">
                <!-- 作者信息 -->
                <author-card :author="photoInfo?.author"></author-card>
                <!-- 其他照片 -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/header-bar/Index.vue';
import { cancelLikeAPI, getIsLikeAPI, getLikeCountAPI, likeAPI, } from '@/apis/api/archive';
import { getPhotoInfoAPI } from '@/apis/api/photo';
import type { PhotoType } from '@/apis/types/photo-type';
import { Like } from '@/icons';
import { statusCode } from '@/utils/status-code';
import { getResourceUrl } from "@/utils/resource";

import { NIcon, NTime } from 'naive-ui';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import AuthorCard from './component/AuthorCard.vue';
import CommentList from './component/CommentList.vue';

const route = useRoute();
const id = parseInt(route.params.id.toString());
const is_like = ref(false);
const like = ref(0);
const likeAnimation = ref('');
const initTheme = () => {
    const theme = {
        primaryColor: "#ffc90c",
        primaryHoverColor: "#f8df72"
    }

    return {
        "--primary-color": theme.primaryColor,
        "--hover-color": theme.primaryHoverColor
    }
}
const photoInfo = ref<PhotoType>();
const getPhotoInfo = (id: number) => {
    getPhotoInfoAPI(id).then((res) => {
        photoInfo.value = res.data.data;
    })
}
//点赞点赞按钮
const likeClick = () => {
    if (!is_like.value) {
        //调用点赞接口
        likeAPI(id).then((res) => {
            if (res.data.code === statusCode.success) {
                likeAnimation.value = 'like-active';
                like.value++;
            }
        })
        // likeAnimation.value = 'like-active';
        // like.value++;
    } else {
        cancelLikeAPI(id);
        like.value--;
    }
    is_like.value = !is_like.value;
}
onBeforeMount(() => {
    getPhotoInfo(id);
    getLikeCountAPI(id).then((res) => {
        like.value = res.data.data.count;
    })

    getIsLikeAPI(id).then((res) => {
        is_like.value = res.data.data.is_like;

    })
})
</script>

<style lang="less" scoped>
.archive-item {
    float: left;
    user-select: none;
    margin-right: 20px;

    i {
        font-size: 26px;
        line-height: 30px;
        cursor: pointer;
    }

    p {
        font-size: 16px;
        float: right;
        margin: 0 6px;
        line-height: 30px;
    }

    .icon:hover {
        color: var(--primary-color);
    }

    .active {
        color: var(--primary-color);
    }

    .like-active {
        animation: scaleDraw .3s ease-in-out;
    }
}

.photo {
    min-height: 100%;
    width: 100%;
}

.header {

    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    background-color: #fff;

}

.photo-main {
    width: calc(100% - 100px);
    background: #fff;
    margin: 70px auto 0 auto;
    display: flex;
    flex-wrap: nowrap;
}

.content-left {
    width: calc(100% - 350px);
    min-width: 680px;

    .photo-player {
        margin: 0 auto;
        width: calc(100% - 120px);
        /*16:9*/
        min-width: 680px;
        min-height: 382px;
    }

    .photo-title-box {
        width: 100%;
        height: 36px;
        display: flex;

        .photo-title {
            width: calc(100% - 160px);
            margin: 0;
            font-size: 25px;
            color: #303030;
            line-height: 30px;
            font-weight: 500;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .copyright {
            width: 180px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 12px;
            color: #636363;

            .icon {
                padding: 0 6px;
            }
        }
    }

    //骨架占位
    .player-skeleton {
        margin: 0 auto;
        width: calc(100% - 120px);
    }
}

.photo-toolbar {
    color: #505050;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e5e9f0;

    .toolbar-right {
        display: inline-block;

        span {
            margin-left: 20px;
        }
    }
}

//简介
.desc {
    // max-height: none;
    font-size: 14px;
    color: #212121;
    line-height: 18px;
    // overflow: auto;
    white-space: pre-line;
    transition: height 0.3s;



}

/**右半部分 */
.content-right {
    width: 350px;
    height: 600px;
    min-width: 350px;
}

.player-container {
    height: 0;
    width: 100%;
    padding-bottom: 56.25%;
    position: relative;
    background-color: #e5e9f0;
    // margin-bottom: 40px;

    .player1 {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: gray;
        // object-fit: fill;
        filter: blur(5px);
    }

    .player2 {
        width: 100%;
        height: 100%;
        position: absolute;
        // background-color: gray;
        object-fit: contain;
    }

}
</style>