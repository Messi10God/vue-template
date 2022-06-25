<template>
  <div class="login">
    <a-card class="box" :bordered="false">
      <h2>后台管理系统模板</h2>
      <div class="input-box">
        <a-input
          placeholder="请输入用户名"
          v-model:value="user.userName"
          :bordered="false"
        ></a-input>
      </div>
      <br />
      <div class="input-box">
        <a-input-password
          placeholder="请输入密码"
          v-model:value="user.password"
          :bordered="false"
        ></a-input-password>
      </div>
      <br />
      <a-button style="width: 100%" type="primary" @click="handleLogin"
        >登录</a-button
      >
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { login, Login } from "@/api/login";
import { tokenStore } from "@/store/token";
import { message } from "ant-design-vue";

const { addToken } = tokenStore();
const user = ref<Login>({
  userName: "",
  password: "",
});
const handleLogin = async () => {
  const { code, data } = await login(user.value);
  if (code === 200) {
    addToken(data.token);
    message.success("登录成功");
  }
};
</script>

<style scoped lang="less">
.login {
  background: #f3f2f2;
  height: 100vh;
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
