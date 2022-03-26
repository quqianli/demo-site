<template>
  <el-config-provider :locale="elementLocales[locale]">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { elementLocales } from '@/i18n'
const { locale } = useI18n();
locale.value = localStorage.getItem('locale') || 'zh-cn';
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  overflow: hidden;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cursor {
  cursor: pointer;
}
.txt-c {
  text-align: center;
}
.w100p {
  width: 100%;
}
</style>