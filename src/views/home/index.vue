<template>
  <div class="home">
    <a-row :gutter="10" class="card-group">
      <a-col :span="3">
        <div class="card">
          <div class="card-title">
            <a-space>
              <UserOutlined />
              用户数量
            </a-space>
          </div>
          <div class="card-content">
            <CountTo :startVal="0" :endVal="666666" :duration="1000"></CountTo>
          </div>
        </div>
      </a-col>
      <a-col :span="3">
        <div class="card">
          <div class="card-title card-title-blue">
            <a-space>
              <UserOutlined />
              访问数量
            </a-space>
          </div>
          <div class="card-content">
            <CountTo :startVal="0" :endVal="5201314" :duration="1000"></CountTo>
          </div>
        </div>
      </a-col>
      <a-col :span="3">
        <div class="card">
          <div class="card-title card-title-green">
            <a-space>
              <UserOutlined />
              停车数量
            </a-space>
          </div>
          <div class="card-content">
            <CountTo :startVal="0" :endVal="117118" :duration="1000"></CountTo>
          </div>
        </div>
      </a-col>
    </a-row>

    <a-row class="chart-group" :gutter="10">
      <a-col :span="12">
        <div class="chart">
          <Line id="line1" :option="option"></Line>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="chart">
          <Line id="line2" :option="option"></Line>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import Line from '@/components/charts/line/index.vue';
import CountTo from '@/components/count-to/index.vue';
import { ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';

const option = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
});
</script>

<style scoped lang="less">
.home {
  min-height: 100%;
  .card-group {
    border-radius: 10px;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .chart-group {
    margin-top: 20px;
    .chart {
      border-radius: 10px;
      background: #fff;
      padding: 10px;
      box-sizing: border-box;
    }
  }
  .card {
    overflow: hidden;
    border-radius: 10px;
    background: #fff;
    height: 100px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 8px 0px rgba(53, 54, 55, 0.58);
    .card-title {
      background: rgb(224, 17, 17);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-basis: 50px;
      &-blue {
        background: rgb(12, 163, 222);
      }
      &-green {
        background: rgb(23, 212, 35);
      }
    }
    .card-content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      font-weight: bold;
    }
  }
}
</style>
