<template>
  <div class="main-body">
    <div class="container">
      <div class="left">
        <sidemenu />
      </div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import Sidemenu from './Sidemenu.vue'
</script>
<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 30px;

  .left {
    width: 200px;
    background-color: #fff;
    margin-right: 20px;
  }
  .right {
    flex: 1;
    overflow: hidden;
    background-color: #fff;
    padding: 20px;
  }
}
</style>