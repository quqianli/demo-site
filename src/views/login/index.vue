<template>
  <div class="page flex-center">
    <div class="sign-box">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="86px">
        <h3 class="title">{{ t('login') }}</h3>
        <el-form-item :label="t('form.username')" prop="account">
          <el-input
            v-model="form.account"
            :placeholder="t('form.usernameHolder')"
            prefix-icon="user"
          ></el-input>
        </el-form-item>
        <el-form-item :label="t('form.password')" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            :placeholder="t('form.passwordHolder')"
            prefix-icon="lock"
          ></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button
            type="primary"
            :loading="loading"
            class="w100p"
            @click="doLogin"
          >{{ t('login') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { login } from '@/apis/login'
const router = useRouter();

const { t } = useI18n();
const formRef = ref();
const form = reactive({
  account: "",
  password: "",
})
const rules = computed(() => {
  return {
    account: [
      {
        required: true,
        message: t("form.usernameHolder"),
        trigger: ["change", "blur"],
      },
      {
        pattern: /^[a-zA-Z][a-zA-Z0-9_-]{3,31}$/,
        message: t('form.usernameError'),
        trigger: ["change", "blur"],
      },
    ],
    password: {
      required: true,
      min: 4,
      message: t('form.passwordError'),
      trigger: ["change", "blur"],
    },
  }
});
const loading = ref(false)
const store = useStore();
function doLogin() {
  formRef.value.validate((valid) => {
    if (!valid) return;
    loading.value = true;
    login(form).then((res) => {
      store.commit('user/setToken', res.data.token);
      store.dispatch('user/refreshInfo');
      store.commit("setRouteLoaded", false);
      // localStorage.setItem('pm_token', res.data.token)
      router.push("/");
    }).finally(() => {
      loading.value = false;
    })
  });
}
</script>
<style lang="scss">
.page {
  height: 100%;
  background: url(@/assets/bg.jpg) no-repeat;
  background-size: cover;
}
.sign-box {
  width: 400px;
  background: #fff;
  padding: 30px 50px 20px 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px #022c44;
}
.title {
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #000;
}
</style>