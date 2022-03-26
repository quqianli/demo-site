<template>
  <div class="personal-side">
    <h2 class="txt-c">{{ t('personal.title') }}</h2>
    <el-menu :default-active="defaultActive" router class="menu">
      <el-menu-item v-for="(item, i) in navs" :key="i" :index="item.path">{{ item.label }}</el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
const { t } = useI18n();
const route = useRoute();
const navs = computed(() => [
  {
    path: '/personal/profile',
    label: t('personal.Profile')
  },
  {
    path: '/personal/changepsw',
    label: t('personal.ChangePsw')
  },
  {
    path: '/personal/message',
    label: t('personal.Messages')
  },
])
const defaultActive = computed(() => route.path)
</script>
<style lang="scss" scoped>
.personal-side {
  h2 {
    line-height: 40px;
    margin: 0;
    font-size: 18px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .menu {
    border-right: 0;
  }
}
</style>