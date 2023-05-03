<!-- eslint-disable vue/multi-word-component-names -->
<template>
    111
    <slidet-captcha v-model:show="show" @success="success"></slidet-captcha>
    <button @click="show = !show">toggle</button>
</template>

<script setup lang="ts">

import SlidetCaptcha from "@/components/slider-captcha/Index.vue";
import { ref } from "vue";
const show = ref(false);
const success = () => {
    console.log("success");
}
</script>