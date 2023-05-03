<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="security-info">
        <div>
            <p>用户名:&nbsp;&nbsp;{{ userInfo.username }}</p>
        </div>
        <div>
            <p>邮箱:&nbsp;&nbsp;{{ userInfo.email }}</p>
            <n-button @click="modify">修改邮箱</n-button>
        </div>
        <div>
            <p>密码:&nbsp;&nbsp;********</p>
            <n-button @click="modifyPwd">修改密码</n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotification, NButton } from 'naive-ui';
import type { UserInfoType } from "@/apis/types/user-type"
import { storageData } from "@/utils/stored-data";


const router = useRouter();

const userInfo = ref<UserInfoType>({
    id: 0,
    username: '',
    email: '',
    birthday: '',
});

const notification = useNotification();//通知

const modify = () => {
    notification.info({
        title: '暂不支持修改',
        duration: 3000,
    });
}

const modifyPwd = () => {
    let findPasswordUrl = router.resolve({ name: "FindPassword" });
    window.open(findPasswordUrl.href, '_blank');
}

onBeforeMount(() => {
    userInfo.value = storageData.get('user_info');
})
</script>

<style lang="less" scoped>
.security-info {
    div {
        height: 60px;
        width: 300px;
        display: flex;
        margin-left: 30px;
        justify-content: space-between;
        align-items: center;

        p {
            margin: 0;
        }

    }
}
</style>