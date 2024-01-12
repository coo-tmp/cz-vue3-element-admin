<template>
  <div class="login-form" :class="$style.root">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <div :class="$style.title">cz-admin</div>
      <el-form-item prop="account">
        <el-input v-model="ruleForm.account" placeholder="用户名/手机号/email" maxlength="30" clearable>
          <template v-slot:prefix>
            <SvgIcon name="basic-user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="密码" maxlength="30" show-password clearable>
          <template v-slot:prefix>
            <SvgIcon name="basic-lock" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 登&nbsp;&nbsp;&nbsp;&nbsp;录 </el-button>
      </el-form-item>
    </el-form>
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
import type { CreateTokenResponseV1 } from '@/api/modules/token/types';

interface RuleForm {
  account: string;
  password: string;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  account: '',
  password: '',
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
      account: 'Cooper',
      password: '123456',
    })
    .then((resp) => {
      const data = resp.data as CreateTokenResponseV1;
      userStore.updateToken({
        access_token: data.access_token,
        token_type: data.token_type,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        openid: data.openid,
      });
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
