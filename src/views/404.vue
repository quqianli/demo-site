<template>
  <div class="font-lg">404</div>
  <div class="font-sm">{{ t('tips404') }}</div>
  <p class="txt-c">
    <el-button type="text" @click="$router.push('/')">{{ t('backHome') }}</el-button>
  </p>
</template>
<script setup>
const { t } = useI18n();
</script>
<style lang="scss">
.font-lg {
  margin-top: 40px;
  font-size: 150px;
  font-weight: bold;
  text-align: center;
  color: var(--el-color-primary);
}
.font-sm {
  font-size: 26px;
  text-align: center;
}
</style>