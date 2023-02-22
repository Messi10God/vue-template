<template>
  <div>
    <div class="session">
      <div class="title">
        设置session缓存
        <a-tooltip>
          <template #title>{{ tip }}</template>
          <ExclamationCircleOutlined />
        </a-tooltip>
      </div>
      <a-form :model="formSet" layout="inline">
        <a-form-item label="键：">
          <a-input v-model:value="formSet.key"></a-input>
        </a-form-item>
        <a-form-item label="值：">
          <a-input v-model:value="formSet.value"></a-input>
        </a-form-item>
        <a-form-item label="过期时间：">
          <a-input v-model:value.number="formSet.expire"></a-input>
        </a-form-item>
      </a-form>
      <div class="footer">
        <a-button type="primary" @click="setSession">设置</a-button>
      </div>
    </div>
    <div class="session">
      <div class="title">
        获取session缓存
        <a-tooltip>
          <template #title>{{ tip }}</template>
          <ExclamationCircleOutlined />
        </a-tooltip>
      </div>
      <a-form :model="formGet" layout="inline">
        <a-form-item label="键：">
          <a-input v-model:value="formGet.key"></a-input>
        </a-form-item>
        <a-form-item label="备用值：">
          <a-input v-model:value="formGet.value"></a-input>
        </a-form-item>
      </a-form>
      <div class="footer">
        <a-space>
          <a-button type="primary" @click="getSession">获取</a-button>
          <span>{{}}</span>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import storage from '@/utils/storage';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

const tip = ref<string>('对象格式为: a:1,b:2');
const formSet = reactive({
  key: '',
  value: '',
  expire: undefined,
});
const formGet = reactive({
  key: '',
  value: '',
});

const setSession = () => {
  let value = formSet.value;
  /** 如果值为对象 */
  if (value.indexOf(',') > -1) {
    value = str2obj(value);
  }
  storage.setSession(formSet.key, value, formSet.expire);
};
const getSession = () => {
  console.log(storage.getSession(formGet.key, formGet.value));
};

const str2obj = (value) => {
  value = value.replace(/\s/g, '');
  const valueArr = value.split(',');
  return valueArr.reduce((p, c) => {
    const arr = c.split(':');
    p[arr[0]] = arr[1];
    return p;
  }, {});
};
</script>

<style lang="less" scoped>
.session {
  border-radius: 8px;
  background: #fff;
  padding: 16px;
  margin-bottom: 20px;
  .title {
    font-weight: bold;
    font-size: 16px;
    color: #000;
    margin-bottom: 8px;
  }
  .footer {
    margin-top: 16px;
  }
}
</style>
