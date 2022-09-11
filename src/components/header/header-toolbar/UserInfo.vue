<template>
  <a-modal v-model:visible="visible" title="用户信息">
    <a-form :model="form">
      <a-form-item label="姓名" v-bind="validateInfos.name">
        <a-input v-model:value="form.name"></a-input>
      </a-form-item>
      <a-form-item label="年龄" v-bind="validateInfos.age">
        <a-input v-model:value="form.age"></a-input>
      </a-form-item>
      <a-form-item label="岗位">
        <a-input v-model:value="form.work"></a-input>
      </a-form-item>
      <a-form-item label="住址">
        <a-input v-model:value="form.address"></a-input>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="handleCancel">关闭</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk"
        >提交</a-button
      >
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import { useForm } from 'ant-design-vue/lib/form';

const form = ref({
  name: '黄琛',
  age: '27',
  work: '前端',
  address: '深圳',
});

const rules = ref({
  name: [
    {
      required: true,
      message: '请输入姓名',
    },
  ],
  age: [
    {
      required: true,
      message: '请输入年龄',
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(form, rules);

const loading = ref<boolean>(false);
const handleOk = () => {
  validate().then(() => {
    // 校验成功后逻辑
    resetFields();
    visible.value = false;
  });
};
const handleCancel = () => {
  resetFields();
  visible.value = false;
};

const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;
};

defineExpose({
  showModal,
});
</script>

<style scoped lang="less"></style>
