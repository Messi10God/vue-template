<template>
  <div class="login">
    <a-card class="box" :bordered="false">
      <h2>后台管理系统模板</h2>
      <a-form>
        <a-form-item v-bind="validateInfos.userName">
          <div class="input-box">
            <a-input
              placeholder="admin"
              v-model:value="user.userName"
              aria-autocomplete="off"
              :bordered="false"
            ></a-input>
          </div>
        </a-form-item>
        <a-form-item v-bind="validateInfos.password">
          <div class="input-box">
            <a-input-password
              placeholder="12345"
              v-model:value="user.password"
              aria-autocomplete="off"
              :bordered="false"
            ></a-input-password>
          </div>
        </a-form-item>
      </a-form>

      <a-button style="width: 100%" type="primary" @click="beforeLogin"
        >登录</a-button
      >
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, Login } from '@/api/login';
import { tokenStore } from '@/store/token';
import { message } from 'ant-design-vue';
import { useForm } from 'ant-design-vue/lib/form';

const router = useRouter();
const { addToken } = tokenStore();
const user = ref<Login>({
  userName: '',
  password: '',
});
const rules = {
  userName: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
};
const { validate, validateInfos } = useForm(user, rules);
const beforeLogin = () => {
  validate().then(() => {
    handleLogin();
  });
};
const handleLogin = async () => {
  const { success, data } = await login(user.value);
  if (success) {
    addToken(data.token);
    message.success('登录成功');
    router.push('/home');
  } else {
    message.error('账号或密码错误');
  }
};
</script>

<style scoped lang="less">
.login {
  background: #f3f2f2;
  height: 100vh;
  h2 {
    text-align: center;
  }
  .box {
    min-width: 400px;
    width: 30vw;
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translate(-50%, 0);
    .input-box {
      border-bottom: 1px solid #d9d9d9;
    }
  }
}
</style>
