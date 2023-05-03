<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <login-card @success="loginSuccess"></login-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import LoginCard from '@/components/login-card/Index.vue';

const router = useRouter();

const loginSuccess = () => {
    router.push({ name: "Home" });
}
</script>

<style lang="less" scoped>
.login-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;

    img {
        width: 100%;
        height: 100%;
        border: 0px;
    }
}
</style>