<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header-bar" :style="themeStyle()">
    <div class="header-content">
      <div class="header-left">
        <h1 class="title" @click="goPage('Home')">{{ globalConfig.title }}</h1>
      </div>
      <div class="header-right">
        <div v-if="isLogin" class="avatar-box">
          <div @click="goPage('Space')">
            <common-avatar :url="getResourceUrl(userInfo.avatar || '')" :size="40" :iconSize="22"></common-avatar>
            <!-- {{ userInfo.username }} -->
          </div>
          <div class="header-menu">
            <div class="menu-item">
              <span class="btn" @click="goPage('Space')">{{ userInfo.username }}</span>
            </div>
            <div class="menu-item">
              <span class="btn" @click="logout">退出登录</span>
            </div>
          </div>
          <!-- <span class="btn" @click="logout">退出登录</span> -->
        </div>
        <div v-else>
          <n-button class="login-btn" text @click="goPage('Login')">
            登录/注册
          </n-button>

        </div>
        <!-- 投稿按钮 -->
        <n-button type="primary" class="upload-btn" @click="goPage('Upload')">
          上传
        </n-button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { UserInfoType } from '@/apis/types/user-type';
import { globalConfig } from "@/utils/global-config";

import { storageData } from "@/utils/stored-data";
import { NButton } from "naive-ui";
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import CommonAvatar from "../common-avatar/Index.vue";
import { getResourceUrl } from "@/utils/resource";
const router = useRouter();
// const route = useRoute();
const isLogin = ref(false);
const userInfo = ref<UserInfoType>({
  id: 0,
  username: "",
  email: "",
  avatar: "",
  birthday: ""
});
const goPage = (name: string) => {
  router.push({ name: name });
}
const logout = () => {
  storageData.remove("access_token");
  storageData.remove('user_info');
  isLogin.value = false;
}
const themeStyle = () => {
  const theme = {
    primaryColor: "#ffc90c",
    primaryHoverColor: "#f8df72"
  }
  return {
    "--header-bar-btn-active-color": theme.primaryColor
  }
}
onBeforeMount(() => {
  const tmpUserInfo = storageData.get("user_info");
  if (!tmpUserInfo) return;
  userInfo.value = tmpUserInfo;
  isLogin.value = true;
})
</script>

<style lang="less" scoped>
.header-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  // min-width: 1100px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 3px #c8c8c8;
  -moz-box-shadow: 0px 0px 3px #c8c8c8;
  box-shadow: 0px 0px 3px #c8c8c8;

  .header-content {
    margin: 0 auto;
    width: 1100px;
    height: 50px;
    display: flex;
    justify-content: space-between;

    .header-left {
      display: flex;
      align-items: center;
      width: 260px;

      .title {
        color: rgba(0, 0, 0, .85);
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        vertical-align: top;
        cursor: pointer;
      }
    }




    .header-right {
      display: flex;
      align-items: center;
      width: 210px;

      .avatar-box {
        padding-top: 5px;
        margin-right: 6px;
      }

      .login-btn {
        width: 80px;
      }

      .upload-btn {
        margin-left: 6px;
        width: 120px;
      }
    }
  }
}


.avatar-box {
  position: relative;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    .header-menu {
      display: block;
    }
  }

  .header-menu {
    display: none;
    width: 200px;
    height: 100px;
    top: 40px;
    left: -80px;
    position: absolute;
    z-index: 999;
    background-color: #fff;
    border-radius: 10px;
    animation: menu .3s ease-in;
    box-shadow: 0 0 30px rgba(0, 0, 0, .1);
  }

  .menu-item {
    margin-top: 7px;
    width: 160px;
    height: 36px;
    margin-left: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .btn {
      display: block;
      color: #18191b;
      line-height: 36px;
      text-align: left;
      border-radius: 6px;
      padding-left: 6px;

      &:hover {
        background-color: #c9ccd0;
      }
    }

  }
}

@keyframes menu {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
  }
}

@media (min-width: 1400px) {
  .header-bar {
    .header-content {
      width: 1300px;
    }
  }
}
</style>