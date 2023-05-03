<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-title :data-title="`找回密码-${globalConfig.title}`">
    <header-bar></header-bar>
    <div class="find-password">
      <steps class="steps" :current="current" :title-list="['填写账号', '重置密码', '操作成功']"></steps>
      <div class="form" v-if="current === 1">
        <n-form :rules="rules" :model="modifyForm" label-width="auto">
          <n-form-item label="邮箱" path="email">
            <n-input placeholder="请输入绑定的邮箱" v-model:value="modifyForm.email"></n-input>
          </n-form-item>
          <n-button class="submit" type="primary" @click="sendEmailCode">发送验证码</n-button>
        </n-form>
      </div>
      <div v-else-if="current === 2">
        <n-form ref="formRef" :rules="rules" :model="modifyForm" label-width="auto">
          <n-form-item label="邮箱">
            <span>{{ modifyForm.email }}</span>
          </n-form-item>
          <n-form-item label="新密码" path="new_password">
            <n-input placeholder="请输入密码" type="password" v-model:value="modifyForm.new_password" />
          </n-form-item>
          <n-form-item label="验证码" path="code">
            <n-input placeholder="请输入验证码" v-model:value="modifyForm.code" />
          </n-form-item>
          <n-button class="submit" type="primary" @click="submitForm">保存</n-button>
        </n-form>
      </div>
      <div v-else-if="current === 3">
        <n-result status="success" title="成功" description="重置密码成功">
          <template #footer>
            <n-button @click="goHome">返回首页</n-button>
          </template>
        </n-result>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from "@/components/header-bar/Index.vue";
import Steps from "@/components/steps/Index.vue";
import { resetPasswordAPI, sendEmailAPI } from "@/apis/api/user";
import { NResult, NInput, NButton, NForm, NFormItem, useMessage, } from "naive-ui";
import { globalConfig } from "@/utils/global-config";
import { statusCode } from '@/utils/status-code';

import type { FormRules, FormInst } from "naive-ui";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const modifyForm = reactive({
  email: "",
  new_password: "",
  code: ""
})

const current = ref(1);
const message = useMessage();

const rules: FormRules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: ['blur', 'input'] },
    { type: "email", message: "请输入正确的邮箱地址", trigger: ['blur', 'input'] },
  ],
  new_password: [{ required: true, message: '请输入密码', trigger: ['input', 'blur'] }],
  code: { required: true, message: '请输入验证码', trigger: ['blur', 'input'] },
}

const sendEmailCode = () => {
  sendEmailAPI(modifyForm.email).then(
    (res) => {
      if (res.data.code === statusCode.success) {
        current.value = 2
      } else {
        message.error(res.data.msg)
      }
    }
  )
}
const formRef = ref<FormInst | null>(null);
const submitForm = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      resetPasswordAPI(modifyForm).then((res) => {
        if (res.data.code === statusCode.success) {
          current.value = 3;
          message.success("修改成功");
        } else {
          message.error(res.data.msg);
        }
      })
    } else {
      message.error("请检查输入的数据");
    }
  })
}
const goHome = () => {
  router.push({ name: "Home" });
}
</script>

<style lang="less" scoped>
.find-password {
  width: 800px;
  margin: 30px auto;

  .steps {
    width: 100%;
  }

  .form {
    width: 520px;
    margin-left: 160px;

    .submit {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>