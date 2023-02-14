<template>
  <div class="header">
    <a-row class="header" justify="space-between" align="middle">
      <a-col class="left logo-box">
        <img src="@/assets/logo.png" />
      </a-col>
      <a-col>
        <a-space :size="20" class="right">
          <Collapsed></Collapsed>
          <SearchPage></SearchPage>
          <FullScreen></FullScreen>
          <Setting></Setting>
          <SwitchLang></SwitchLang>
          <CodeCore></CodeCore>
          <a-dropdown>
            <div class="avatar">
              <a-space>
                <img
                  class="avatar-icon"
                  src="https://img1.baidu.com/it/u=2116210995,3117384250&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662138000&t=10d9f2b9f3563e8f9b4cdfaedee1ebd3"
                />
                <span class="avatar-name">黄琛</span>
                <DownOutlined />
              </a-space>
            </div>
            <template #overlay>
              <a-menu @click="selectMenu">
                <a-menu-item :key="UserOpeartion.USER_INFO"
                  >修改信息</a-menu-item
                >
                <a-menu-item :key="UserOpeartion.LOGIN_OUT"
                  >退出登录</a-menu-item
                >
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </a-col>
    </a-row>
    <UserInfo ref="userInfo"></UserInfo>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useToken } from '@/store/token';
import Collapsed from '@/components/header/header-toolbar/Collapsed.vue';
import SearchPage from '@/components/header/header-toolbar/SearchPage.vue';
import FullScreen from '@/components/header/header-toolbar/FullScreen.vue';
import CodeCore from '@/components/header/header-toolbar/CodeCore.vue';
import Setting from '@/components/header/header-toolbar/Setting.vue';
import SwitchLang from '@/components/header/header-toolbar/SwitchLang.vue';
import UserInfo from '@/components/header/header-toolbar/UserInfo.vue';
import type UserInfoType from '@/components/header/header-toolbar/UserInfo.vue';

const { clearToken } = useToken();
const router = useRouter();
const enum UserOpeartion {
  USER_INFO = '1',
  LOGIN_OUT = '2',
}

const userInfo = ref<InstanceType<typeof UserInfoType>>();
const selectMenu: MenuProps['onClick'] = ({ key }) => {
  if (key === UserOpeartion.LOGIN_OUT) {
    clearToken();
    router.replace('/login');
  } else if (key === UserOpeartion.USER_INFO) {
    userInfo.value?.showModal();
  }
};
</script>

<style scoped lang="less">
.header {
  height: 100%;
  .logo-box {
    width: 200px;
    img {
      height: 64px;
      transform: scale(0.75);
    }
  }
  .right {
    display: flex;
    align-items: center;
    &:deep(.ant-space-item) {
      display: flex;
    }
    .avatar {
      display: flex;
      align-items: center;
      .avatar-icon {
        border-radius: 50%;
        overflow: hidden;
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
      .avatar-name {
        font-size: 14px;
        color: #444b52;
      }
    }
  }
}
</style>
