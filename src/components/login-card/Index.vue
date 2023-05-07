<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-card">
    <n-icon size="20" class="card-close" v-show="props.close" @click="closeClick">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </n-icon>
    <div class="card-left"></div>
    <div class="card-right">
      <div v-if="isLogin" key="login">
        <login-form @change-form="isLogin = false" @success="success"></login-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NIcon } from 'naive-ui';
import LoginForm from './component/LoginForm.vue'

const emits = defineEmits(["close", "success"]);
const props = withDefaults(defineProps<{
  close?: boolean,
}>(), {
  close: false
});

// 是否为登录
const isLogin = ref(true);

const closeClick = () => {
  emits("close");
}
const success = () => {
  emits("success");
}
</script>

<style lang="less" scoped>
.login-card {
  position: absolute;
  display: grid;
  grid-template-columns: 330px auto;
  grid-template-rows: auto 60px;
  top: 50%;
  left: 50%;
  margin: -220px 0 0 -410px;
  width: 820px;
  height: 400px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 16px 16px 50px -12px rgba(0, 0, 0, 0.8);

  .card-close {
    right: 26px;
    top: 16px;
    cursor: pointer;
    position: absolute;

    &:hover {
      color: #808080;
    }
  }

  // 插画部分
  .card-left {
    width: 330px;
    grid-row: 1 / span 2;
    background-color: #63b5fb;
  }

  // 表单部分
  .card-right {
    padding: 40px 30px 0 0px;
  }

}
</style>