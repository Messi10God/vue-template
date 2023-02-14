<template>
  <SearchOutlined @click="openSearchModal" class="header-icon" />
  <div class="mask" v-if="visible" @click.stop>
    <div class="search-box" ref="modal">
      <header class="search-bar">
        <div class="search-form">
          <SearchOutlined
            style="font-size: 24px; color: #1890ff"
          ></SearchOutlined>
          <input
            class="search-input"
            placeholder="搜索路由"
            v-model="searchText"
            @input="changeText"
          />
        </div>
      </header>
      <div class="search-content">
        <div class="search-list" v-if="searchText && !noData">
          <div
            class="search-list-item"
            v-for="item in list"
            :key="item.path"
            @click="goLink(item)"
          >
            <SvgIcon iconClass="link" className="link-style"></SvgIcon>
            <div>
              <div class="item-name">{{ item.meta.title }}</div>
              <div class="item-path">{{ item.path }}</div>
            </div>
          </div>
        </div>
        <div class="search-noData" v-if="searchText && noData">
          <SvgIcon iconClass="nodata" class="noData"></SvgIcon>
          <div class="search-noData-text">暂无结果</div>
        </div>
        <div class="search-noWords" v-if="!searchText">请输入关键字</div>
      </div>
      <footer class="search-tip"></footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { onClickOutside } from '@vueuse/core';
import { useRouter, RouteRecordRaw } from 'vue-router';

const router = useRouter();
/** 获取左侧菜单栏路由 */
const initRoutes = (
  list = router.options.routes.filter((route) => route.name === 'Layout')[0]
    .children
) => {
  let newList = [];
  for (let route of list) {
    newList.push(route);
    if (route.children?.length > 0) {
      newList = newList.concat(initRoutes(route.children));
    }
  }
  return newList.filter((t) => !t.meta.hidden);
};
const routes = initRoutes();
const noData = ref<boolean>(false);
const list = ref(routes);

const searchText = ref<string>('');
const changeText = (e: Event) => {
  let value = (e.target as HTMLInputElement).value;
  if (value) {
    list.value = routes.filter(
      (route) =>
        route.path.includes(value) ||
        (route.meta.title as string).includes(value)
    );
    noData.value = list.value?.length === 0;
  } else {
    noData.value = false;
    list.value = routes;
  }
};

const goLink = (route: RouteRecordRaw) => {
  router.push(route.path);
  visible.value = false;
};

const modal = ref(null);
const visible = ref<boolean>(false);
const openSearchModal = () => {
  visible.value = true;
};

/** 如果点击到外面，关闭弹窗 */
onClickOutside(modal, () => {
  visible.value = false;
});
</script>

<style scoped lang="less">
.mask {
  background-color: rgba(101, 108, 133, 0.8);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 200;
  .search-box {
    background: #f5f6f7;
    border-radius: 6px;
    box-shadow: inset 1px 1px 0 0 hsla(0, 0%, 100%, 0.5), 0 3px 8px 0 #555a64;
    flex-direction: column;
    margin: 60px auto auto;
    width: 560px;
    position: relative;
    .search-bar {
      padding: 12px 12px 0;
      .search-form {
        height: 56px;
        width: 100%;
        padding: 0 12px;
        display: flex;
        align-items: center;
        border-radius: 4px;
        border: 2px solid #1890ff;
        .search-input {
          border: none;
          outline: none;
          height: 100%;
          width: 100%;
          padding-left: 8px;
          background-color: transparent;
          font-size: 20px;
        }
      }
    }
    .search-list {
      max-height: 450px;
      overflow-y: auto;
      padding: 12px;
      .search-list-item {
        margin-bottom: 4px;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 1px 3px 0 #d4d9e1;
        display: flex;
        align-items: center;
        padding: 5px 12px;
        &:hover {
          background: #086367;
          cursor: pointer;
          .link-style {
            color: #fff;
          }
          .item-name {
            color: #fff;
          }
          .item-path {
            color: #fff;
          }
        }
        .link-style {
          color: #90a4b7;
          margin-right: 8px;
          font-size: 20px;
        }
        .item-name {
          line-height: 1.5em;
          color: #444750;
        }
        .item-path {
          line-height: 1.5em;
          color: #90a4b7;
        }
      }
    }
    .search-noData {
      height: 170px;
      text-align: center;
      .noData {
        font-size: 100px;
      }
      .search-noData-text {
        font-size: 16px;
        font-weight: bold;
        line-height: 1;
      }
    }
    .search-noWords {
      height: 100px;
      line-height: 100px;
      font-size: 12px;
      color: #90a4b7;
      text-align: center;
    }
    .search-tip {
    }
  }
}
</style>
