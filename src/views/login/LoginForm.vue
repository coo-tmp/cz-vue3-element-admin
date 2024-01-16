<template>
  <div class="login-form" :class="$style.root">
    <ElForm ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <div :class="$style.title">cz-admin</div>
      <ElFormItem prop="account">
        <TwSensitiveInput v-model="ruleForm.account" placeholder="用户名/手机号/email" maxlength="30" clearable type="part" mode="middle" start="3" end="4">
          <template v-slot:prefix>
            <SvgIcon name="basic-user" />
          </template>
        </TwSensitiveInput>
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput v-model="ruleForm.password" placeholder="密码" maxlength="30" show-password clearable>
          <template v-slot:prefix>
            <SvgIcon name="basic-lock" />
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="submitForm(ruleFormRef)"> 登&nbsp;&nbsp;&nbsp;&nbsp;录 </ElButton>
      </ElFormItem>
      <ElFormItem> <span>用户名：Cooper 密码：123456</span></ElFormItem>
    </ElForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import SvgIcon from '@/components/SvgIcon/index.vue';
import HttpApi from '@/api/HttpApi';
import RouterService from '@/router/RouterService';
import { RoutePathEnum } from '@/router/RoutePathEnum';
import userStore from '@/stores/modules/userStore';
import type { TokenCreateResponse } from '@/api/modules/token/types';
import TwSensitiveInput from '@/components/TwSensitiveInput/index.vue';

interface RuleForm {
  account: string;
  password: string;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  account: 'Cooper',
  password: '123456',
});

const rules = reactive<FormRules<RuleForm>>({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
});

const submitForm = async (form: FormInstance | undefined) => {
  if (!form) {
    return;
  }

  await form.validate((success) => {
    if (!success) {
      return;
    }

    login();
  });
};

function login() {
  HttpApi.token
    .create({
      account: ruleForm.account,
      password: ruleForm.password,
    })
    .then((resp) => {
      const data = resp.data as TokenCreateResponse;
      userStore.updateToken(data);
      RouterService.router.push(RoutePathEnum.HOME);
    });
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 100%;
  .el-button {
    width: 100%;
  }
}
</style>

<style lang="scss" module>
.root {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    display: table;
    margin: 0 auto;
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 20px;
    // color: $dark_color;
  }
}
</style>
