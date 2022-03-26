<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="150px" class="form">
    <el-form-item :label="t('form.currPassword')" prop="password">
      <el-input v-model="form.password" type="password" :placeholder="t('form.currPassword')"></el-input>
    </el-form-item>
    <el-form-item :label="t('form.npassword')" prop="npassword">
      <el-input v-model="form.npassword" type="password" :placeholder="t('form.npassword')"></el-input>
    </el-form-item>
    <el-form-item :label="t('form.cfpassword')" prop="cfpassword">
      <el-input v-model="form.cfpassword" type="password" :placeholder="t('form.cfpassword')"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="w100p" @click="submit">{{ t('action.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { changePsw } from '@/apis/personal';

const { t } = useI18n();
const formRef = ref();
const form = reactive({
  password: '',
  npassword: '',
  cfpassword: ''
})

// computed
const rules = computed(() => {
  return {
    password: {
      required: true,
      min: 4,
      message: t('form.passwordError'),
      trigger: "blur",
    },
    npassword: [
      {
        required: true,
        min: 4,
        message: t('form.passwordError'),
        trigger: "blur",
      }
    ],
    cfpassword: [
      {
        required: true,
        min: 4,
        message: t('form.passwordError'),
        trigger: "blur",
      },
      {
        validator: (rule, value, callback) => {
          if (value !== form.npassword) {
            callback(new Error(t('form.cfpasswordError')));
          } else {
            callback();
          }
        },
        trigger: "blur",
      },
    ]
  }
})

// methods
function submit() {
  formRef.value.validate(valid => {
    if (!valid) return;
    const { password, npassword } = form;
    changePsw({ password, npassword }).then(() => {
      ElMessage.success(t('tips.success'));
      formRef.value.resetFields();
    })
  })
}
</script>
<style lang="scss" scoped>
.form {
  width: 450px;
}
</style>