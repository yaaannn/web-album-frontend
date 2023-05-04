<template>
    <div class="comment-box">
        <!-- 头像 -->
        <common-avatar :url="getResourceUrl(userInfo.avatar || '')"></common-avatar>
        <!-- 输入框 -->
        <n-input class="comment-input" placeholder="在这里写点什么吧~" maxlength="255" show-count type="textarea"
            :autosize="descSize" v-model:value="commentForm.content" />
        <n-button v-if="!userInfo.username" disabled>未登录</n-button>
        <n-button v-else type="primary" @click="createComment">发布</n-button>
    </div>
    <div class="comment-item" v-for="(item, index) in commentList" :key="index">
        <!-- 头像和昵称 -->
        <div class="comment-user">
            <common-avatar :url="getResourceUrl(item.author.avatar || '')"></common-avatar>
            <div class="user-name">
                <span>{{ item.author.nickname }}</span>

            </div>
            <n-time class="comment-time" type="relative" :time="new Date(item.create_time * 1000)"></n-time>
            <div class="comment-btn">
                <n-button v-if="userInfo.username" text @click="reply(item.id)">回复</n-button>
                <n-button v-if="item.author.username === userInfo.username" text @click="deleteComment(item.id)">
                    删除
                </n-button>
            </div>
        </div>
        <!-- 评论内容 -->
        <div class="comment-content">
            <span>{{ item.content }}</span>
        </div>
        <!--回复-->
        <div class="reply-list" v-if="item.replies">
            <div class="reply-item" v-for="(reply, i) in item.replies" :key="i">
                <!-- 头像和昵称 -->
                <div class="reply-user">
                    <div class="info">
                        <common-avatar :url="getResourceUrl(reply.author.avatar || '')" :size="26"
                            :iconsize="18"></common-avatar>
                        <div class="reply-user-name">
                            <span>{{ reply.author.nickname }}</span>
                        </div>
                        <n-time class="reply-time" type="relative" :time="new Date(reply.create_time * 1000)"></n-time>
                    </div>
                    <div class="reply-btn">
                        <n-button v-if="reply.author.username === userInfo.username" text @click="deleteReply(reply.id)">删除
                        </n-button>
                    </div>
                </div>
                <!-- 二级评论内容 -->
                <div class="reply-content">
                    <span>{{ reply.content }}</span>
                </div>
            </div>
        </div>

    </div>
    <!-- 发表回复模态框 -->
    <n-modal v-model:show="isReply" title="发表回复" preset="card" style="width: auto;">
        <div style="display: flex; align-items: center; ">
            <n-input style="width: 500px;" placeholder="在这里写点什么吧~" maxlength="255" show-count type="textarea"
                v-model:value="replyForm.content" :autosize="descSize" />
            <n-button type="primary" @click="createReply">发布</n-button>
        </div>

    </n-modal>
</template>

<script setup lang="ts">
import { getCommentListAPI, createCommentAPI, deleteCommentAPI, createReplyAPI, deleteReplyAPI } from '@/apis/api/comment';
import CommonAvatar from "@/components/common-avatar/Index.vue";

import { statusCode } from '@/utils/status-code';
import { getResourceUrl } from "@/utils/resource";

import { storageData } from "@/utils/stored-data";

import { NInput, NButton, NTime, NModal, useNotification } from "naive-ui";
import { onBeforeMount, reactive, ref } from 'vue';
import type { CommentType, createCommentType, createReplyType, } from '@/apis/types/comment-type';
import type { UserInfoType } from '@/apis/types/user-type';
const notification = useNotification();
const commentList = ref<Array<CommentType>>([]);
const props = defineProps<{
    id: number
}>();
//输入框大小
const descSize = {
    minRows: 3,
    maxRows: 3
}
const userInfo = ref<UserInfoType>({
    id: 0,
    username: '',
    email: '',
    nickname: '',
    avatar: '',
    birthday: '',
});

// 发表评论
const commentForm = reactive<createCommentType>({
    photo_id: props.id,
    content: '',
})
const createComment = () => {
    if (!commentForm.content) {
        notification.error({
            title: '评论内容不能为空',
            duration: 2000
        });
    } else {
        createCommentAPI(commentForm).then(res => {
            if (res.data.code === statusCode.success) {
                notification.success({
                    title: '评论成功',
                    duration: 2000
                });
                commentForm.content = '';
                getCommnetList(props.id);
            }
        })
    }
}

const deleteComment = (id: number) => {
    deleteCommentAPI(id).then(res => {
        if (res.data.code === statusCode.success) {
            notification.success({
                title: '删除成功',
                duration: 2000
            });
            getCommnetList(props.id);
        }
    })
}
// 发表回复
const replyForm = reactive<createReplyType>({
    comment_id: 0,
    content: '',
})
const isReply = ref(false)
const reply = (id: number) => {
    isReply.value = true;
    replyForm.comment_id = id;
}
const createReply = () => {
    if (!replyForm.content) {
        notification.error({
            title: '回复内容不能为空',
            duration: 2000
        });
    } else {
        createReplyAPI(replyForm).then(res => {
            if (res.data.code === statusCode.success) {
                notification.success({
                    title: '回复成功',
                    duration: 2000
                });
                replyForm.content = '';
                isReply.value = false;
                getCommnetList(props.id);
            }
        })
    }
}
const deleteReply = (id: number) => {
    deleteReplyAPI(id).then(res => {
        if (res.data.code === statusCode.success) {
            notification.success({
                title: '删除成功',
                duration: 2000
            });
            getCommnetList(props.id);
        }
    })
}

// 获取评论列表
const getCommnetList = (id: number) => {
    getCommentListAPI(id).then(res => {
        commentList.value = res.data.data;
    })
}

onBeforeMount(() => {
    if (storageData.get('user_info')) {
        userInfo.value = storageData.get('user_info');
    }
    getCommnetList(props.id);
});
</script>

<style lang="less" scoped>
.comment-box {
    margin-top: 10px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e3e4e5;

    .comment-input {
        width: calc(100% - 200px);
    }

    button {
        width: 90px;
    }

}

.comment-item {
    margin-top: 10px;

    .comment-user {
        position: relative;

        .user-name {
            position: absolute;
            top: 0;
            left: 60px;
            font-weight: 500;
            cursor: pointer;
            color: #6d757a;
            font-size: 14px;
        }

        .comment-time {
            position: absolute;
            color: #969996;
            top: 26px;
            left: 60px;
            font-size: 12px;
        }

        .comment-btn {
            float: right;

            button {
                font-size: 10px;
                color: #969996;
                margin-left: 6px;

                &:hover {
                    color: var(--hover-color);
                }
            }
        }
    }

    .comment-content {
        margin: 6px 0 6px 60px;
        font-size: 14px;
        line-height: 16px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e3e4e5;
    }
}

/**动态回复框 */
.reply-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 10px 0 10px 60px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e3e4e5;

    .reply-input {
        width: calc(100% - 180px);
    }

    button {
        width: 80px;
    }
}

.reply-list {
    border-bottom: 1px solid #e3e4e5;

    .reply-item {
        .reply-user {
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-left: 60px;

            .info {
                display: inline-flex;
                align-items: center;

                .reply-user-name {
                    cursor: pointer;
                    color: #666;
                    font-size: 12px;
                    padding: 0 10px;
                }

                .reply-time {
                    color: #969996;
                    font-size: 10px;
                    line-height: 30px;
                }
            }

            .reply-btn {
                float: right;

                button {
                    font-size: 10px;
                    color: #969996;
                    margin-left: 6px;

                    &:hover {
                        color: var(--hover-color);
                    }
                }
            }
        }

        .reply-content {
            color: #222;
            display: block;
            margin: 6px 0 0 96px;
            padding-bottom: 10px;
        }
    }

    .more {
        button {
            font-size: 12px;
            color: #969996;
            margin: 10px 60px;

            &:hover {
                color: var(--hover-color);
            }
        }
    }
}

.content-text {
    display: inline-block;

    .mention-user {
        color: var(--primary-color);
        cursor: pointer;
        padding: 0 2px;
    }
}
</style>