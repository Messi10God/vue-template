import { Response } from '@/api/typing';
import { clearObj } from '@/utils';
import { reactive } from 'vue';
type Api = (query?: RequestParam) => Promise<Response>;

interface State<T = unknown> {
  data: T[];
  loading: boolean;
}
interface PageInfo {
  pageIndex: number;
  pageSize: number;
}
interface RequestParam {
  pageIndex: number;
  pageSize: number;
  [key: string]: unknown;
}
interface Options {
  immediate: boolean;
  pageIndex?: number;
  pageSize?: number;
}

const defaultPageInfo: PageInfo = {
  pageIndex: 1,
  pageSize: 20,
};

export function fetchByApi(
  api: Api,
  query: any,
  options: Options = { immediate: true }
) {
  const state = reactive<State>({
    data: [],
    loading: false,
  });
  const params: RequestParam = Object.assign(query || {}, {
    pageIndex: options.pageIndex || defaultPageInfo.pageIndex,
    pageSize: options.pageSize || defaultPageInfo.pageSize,
  });
  const getList = async () => {
    state.loading = true;
    try {
      const { data } = await api(params);
      state.data = data;
      state.loading = false;
    } catch (error) {
      state.loading = false;
    }
  };
  if (options.immediate) {
    getList();
  }

  const reload = () => {
    getList();
  };
  const setPageInfo = (pageInfo?: PageInfo) => {
    params.pageIndex = pageInfo?.pageIndex || defaultPageInfo.pageIndex;
    params.pageSize = pageInfo?.pageSize || defaultPageInfo.pageSize;
  };
  const reset = () => {
    clearObj(query);
    setPageInfo();
    reload();
  };
  return {
    state,
    reload,
    setPageInfo,
    reset,
  };
}
