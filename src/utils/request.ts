import axios from "axios";
import type { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { tokenStore } from "@/store/token";
const { token } = tokenStore();

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 200000,
});
const requestHandle = (config: AxiosRequestConfig): AxiosRequestConfig => {
  (config.headers as AxiosRequestHeaders)["Authorization"] = token;
  return config;
};

// 添加请求拦截器
axios.interceptors.request.use(requestHandle, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default api;
