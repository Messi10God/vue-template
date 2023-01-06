import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { addPendingRequest, removePendingRequest } from '@/requestUtil/cancelRepeatRquest';
import { againRequest } from '@/requestUtil/againRequest';
import { useToken } from '@/store/token';
const { token } = useToken();

const isMock = true;

const api = axios.create({
  baseURL:
    process.env.VUE_APP_API_BASE_URL + (isMock && process.env.VUE_APP_MOCK_API),
  timeout: 200000,
});
const requestHandle = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers['Authorization'] = token;

  addPendingRequest(config);
  return config;
};

// 添加请求拦截器
api.interceptors.request.use(requestHandle, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
api.interceptors.response.use(
  function (response: AxiosResponse) {
    // 对响应数据做点什么
    removePendingRequest(response);
    return response.data;
  },
  function (error: AxiosError) {
    removePendingRequest(error);
      // 需要特殊处理请求被取消的情况
      if (!axios.isCancel(error)) {
        // 请求重发
        return againRequest(error, axios);
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default api;
