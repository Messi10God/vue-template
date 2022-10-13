import { TableResponse } from '@/api/typing';
import { clearObj } from '@/utils';
import { reactive } from 'vue';
type Api = (query?: RequestParam) => Promise<TableResponse>;

interface State<T = unknown> {
  data: T[];
  loading: boolean;
  [key: string]: any;
}
export interface PageInfo {
  pageIndex: number;
  pageSize: number;
  total?: number;
}
export interface RequestParam {
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
  total: 0,
  pageSize: 5,
};

export function fetchByApi(
  api: Api,
  query: any,
  options: Options = { immediate: true }
) {
  const state = reactive<State>({
    data: [],
    loading: false,
    ...defaultPageInfo,
  });

  const getList = async () => {
    state.loading = true;
    const params = Object.assign({}, query, {
      pageIndex:
        query.pageIndex || options.pageIndex || defaultPageInfo.pageIndex,
      pageSize: query.pageSize || options.pageSize || defaultPageInfo.pageSize,
    });
    try {
      const { data, total, pageIndex, pageSize } = await api(params);
      state.data = data;
      state.total = total;
      /** 为了改变page组件的属性 */
      state.pageIndex = pageIndex;
      state.pageSize = pageSize;
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
    query.pageIndex = pageInfo?.pageIndex || defaultPageInfo.pageIndex;
    query.pageSize = pageInfo?.pageSize || defaultPageInfo.pageSize;
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
