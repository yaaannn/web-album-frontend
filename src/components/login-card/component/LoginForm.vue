<template>
  <div class="login-form">
    <!-- 用户名登录 -->
    <n-tabs default-value="account" size="large" justify-content="space-evenly" @update:value="changTab">
      <n-tab-pane class="form-container" name="account" tab="账号登录">
        <n-form :rules="rules" :model="loginForm" label-placement="left" label-width="70">
          <n-form-item path="username" label="用户名" required>
            <n-input placeholder="用户名" v-model:value="loginForm.username" />
          </n-form-item>
          <n-form-item path="password" label="密码" required>
            <n-input placeholder="密码" v-model:value="loginForm.password" type="password">
              <template #suffix>
                <n-button type="primary" text @click="findPassword">找回密码</n-button>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" block secondary strong @click="checkSliderCaptcha">点击进行人机验证</n-button>
          </n-form-item>
        </n-form>
        <n-button v-if="!is_login_checked" type="primary" block secondary disabled>未认证</n-button>
        <n-button v-else type="primary" block secondary strong @click="sendLoginRequest">登录</n-button>
      </n-tab-pane>
      <!-- 注册 -->
      <n-tab-pane class="form-container" name="register" tab="注册">
        <n-form :rules="rules" :model="registerForm" label-placement="left" label-width="70">
          <n-form-item path="username" label="用户名">
            <n-input placeholder="用户名" v-model:value="registerForm.username" />
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input placeholder="密码" v-model:value="registerForm.password" type="password" />
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <n-input placeholder="邮箱" v-model:value="registerForm.email" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" block secondary strong @click="checkSliderCaptcha">点击进行人机验证</n-button>
          </n-form-item>
        </n-form>

        <n-button v-if="!is_reg_checked" type="primary" block secondary disabled>未认证</n-button>
        <n-button v-else type="primary" block secondary strong @click="sendRegisterRequest">
          注册
        </n-button>
      </n-tab-pane>
    </n-tabs>


  </div>
  <silder-captcha v-model:show="show" @success="passCheck"></silder-captcha>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { UserLoginType, UserRegisterType } from "@/apis/types/user-type";
import { getUserInfoAPI, loginAPI, registerAPI } from "@/apis/api/user";
import { statusCode } from '@/utils/status-code';
import { storageData } from "@/utils/stored-data";
import type { FormRules } from 'naive-ui';
import { NButton, NForm, NFormItem, NInput, NTabPane, NTabs, useNotification } from 'naive-ui';
import router from "@/router";
import SilderCaptcha from "@/components/slider-captcha/Index.vue";
const emits = defineEmits(["changeForm", "success"]);
const show = ref(false);
const is_login_checked = ref(false);
const is_reg_checked = ref(false);

const currentTabName = ref("account");
const changTab = (tabName: string) => {
  currentTabName.value = tabName;
}
//通知组件
const notification = useNotification();

//登录表单
const loginForm = reactive<UserLoginType>({
  username: "",
  code: "",
  password: "",
});
// 注册表单
const registerForm = reactive<UserRegisterType>({
  username: "",
  password: "",
  email: ""
})

//校验规则
const rules: FormRules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: ['blur', 'input'] },
    { type: "email", message: "请输入正确的邮箱地址", trigger: ['blur', 'input'] },
  ],
  username: { required: true, message: '请输入用户名', trigger: ['blur', 'input'] },
  password: { required: true, message: '请输入密码', trigger: ['blur', 'input'] },
}

const checkSliderCaptcha = () => {
  show.value = true;
}

const passCheck = () => {
  if (currentTabName.value === "account") {
    is_login_checked.value = true;
    console.log(currentTabName.value);
  } else {
    is_reg_checked.value = true;
    console.log(currentTabName.value);
  }
}

//登录
const sendLoginRequest = () => {
  loginAPI(loginForm).then((res) => {
    if (res.data.code === statusCode.success) {
      storageData.set("access_token", res.data.data.token, 600);
      getUserInfoAPI().then((infoRes) => {
        if (infoRes.data.code === statusCode.success) {
          storageData.set("user_info", infoRes.data.data.user_info, 14 * 24 * 60);
        }
        emits("success");
      })
    }
    // break;
    else {
      notification.error({
        title: res.data.msg,
        duration: 3000,
      });
    }
  });
}

// 注册
const sendRegisterRequest = () => {
  registerAPI(registerForm).then((res) => {
    if (res.data.code === statusCode.success) {
      notification.info({
        title: "注册成功",
        duration: 3000,
      })
      // 切换到登录
      changTab("account");
    }
    // break;
    else {
      notification.error({
        title: res.data.msg,
        duration: 3000,
      })
      //   清空表单
      registerForm.username = ""
      registerForm.password = ""
      registerForm.email = ""
    }


  });
}

// 找回密码
const findPassword = () => {
  let findPasswordUrl = router.resolve({ name: "FindPassword" });
  window.open(findPasswordUrl.href, '_blank');
}
</script>

<style lang="less" scoped>
.login-form {
  .form-container {
    box-sizing: border-box;
    padding: 40px 30px 0 30px;
  }

  .login-btn {
    display: flex;
    justify-content: space-between;
    margin: 20px 30px 0;

    button {
      width: 160px;
    }
  }
}
</style>