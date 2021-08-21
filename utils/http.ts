import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { Message } from 'element-ui';
import { getTokenCache } from '@/utils/storage';
import { apiUrl, loginPath } from '@/config';

const http = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

http.interceptors.request.use(
  (config) => {
    if (config.url?.startsWith('/api/auth')) {
      return config;
    }
    const token = getTokenCache();
    if (token) {
      config.headers.token = getTokenCache();
    } else {
      window.$nuxt.$router.push(loginPath);
      config.cancelToken = new axios.CancelToken((cancel) => cancel('登录信息已过期'));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse<BaseResult<any>>) => {
    const data = response.data;
    data.success = data.code === 200;
    if (!data.success) {
      Message.error(data.msg);
    }
    return response;
  },
  (error) => {
    const code = error.response?.status;
    if (code === 401) {
      Message.error('登录信息失效，请重新登录');
      window.$nuxt.$router.push(loginPath);
    } else if (code) {
      Message.error(error.message);
    }
    return Promise.reject(error);
  }
);

export function get<T = any>(url: string, config?: AxiosRequestConfig) {
  return http.get(url, config) as Promise<AxiosResponse<BaseResult<T>>>;
}

export function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return http.post(url, data, config) as Promise<AxiosResponse<BaseResult<T>>>;
}

export default http;
