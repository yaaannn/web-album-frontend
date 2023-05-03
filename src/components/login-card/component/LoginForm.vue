<template>
  <div class="login-form">
    <!-- 用户名登录 -->
    <n-tabs default-value="account" size="large" justify-content="space-evenly">
      <n-tab-pane class="form-container" name="account" tab="账号登录">
        <n-form ref="accountFormRef" :rules="rules" :model="loginForm" label-placement="left" label-width="70">
          <n-form-item label="用户名" path="username">
            <n-input placeholder="用户名" v-model:value="loginForm.username" />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input placeholder="密码" v-model:value="loginForm.password" type="password">
              <template #suffix>
                <n-button type="primary" text @click="findPassword">找回密码</n-button>
              </template>
            </n-input>
          </n-form-item>

          <!-- <n-form-item label="验证码" path="code">
            <n-input placeholder="验证码" v-model:value="loginForm.code">
            </n-input>
            <n-image width="75" :src=captchaUrl preview-disabled />
          </n-form-item> -->
          <n-form-item>
            <n-button type="primary" block secondary strong @click="checkSliderCaptcha">点击进行人机验证</n-button>
          </n-form-item>
        </n-form>
        <n-button v-if="!is_login_checked" type="primary" block secondary disabled>未认证</n-button>
        <n-button v-else type="primary" block secondary strong @click="sendLoginRequest">登录</n-button>
      </n-tab-pane>
      <!-- 注册 -->
      <n-tab-pane class="form-container" name="register" tab="注册">
        <n-form ref="registerFormRef" :rules="rules" :model="registerForm" label-placement="left" label-width="70">
          <n-form-item label="用户名" path="username">
            <n-input placeholder="用户名" v-model:value="registerForm.username" />
          </n-form-item>
          <n-form-item label="密码" path="password">
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
import type { FormInst, FormRules } from 'naive-ui';
import { NButton, NForm, NFormItem, NImage, NInput, NTabPane, NTabs, useNotification } from 'naive-ui';
import router from "@/router";
import SilderCaptcha from "@/components/slider-captcha/Index.vue";
const emits = defineEmits(["changeForm", "success"]);
const show = ref(false);
const is_login_checked = ref(false);
const is_reg_checked = ref(false);
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

// 验证码URL
const captchaUrl = "http://127.0.0.1:8000/api/v1/public/generate_code"

//校验规则
const rules: FormRules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: ['blur', 'input'] },
    { type: "email", message: "请输入正确的邮箱地址", trigger: ['blur', 'input'] },
  ],
  username: { required: true, message: '请输入用户名', trigger: ['blur', 'input'] },
  password: { required: true, message: '请输入密码', trigger: ['blur', 'input'] },
  code: { required: true, message: '请输入验证码', trigger: ['blur', 'input'] },
}

const checkSliderCaptcha = () => {
  show.value = true;
}

const passCheck = () => {
  is_login_checked.value = true;
  is_reg_checked.value = true;

}

//登录相关
const accountFormRef = ref<FormInst | null>(null);
const registerFormRef = ref<FormInst | null>(null);
//登录
const sendLoginRequest = () => {
  let currentRef = accountFormRef.value;
  currentRef?.validate((err) => {
    if (!err) {
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
    } else {
      notification.error({
        title: '请检查输入的数据',
        duration: 3000,
      })
    }
  });
}

// 注册
const sendRegisterRequest = () => {
  let currentRef = registerFormRef.value;
  currentRef?.validate((err) => {
    if (!err) {
      registerAPI(registerForm).then((res) => {
        if (res.data.code === statusCode.success) {
          notification.info({
            title: res.data.msg,
            duration: 3000,
          })
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
    } else {
      notification.error({
        title: '请检查输入的数据',
        duration: 3000,
      })
    }
  });
}

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