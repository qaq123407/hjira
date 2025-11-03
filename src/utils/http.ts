import qs from 'qs'
import * as auth from "../auth-provider";
import { useAuth } from '../screens/context/auth-context';
import { useCallback } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      
      // 检查响应是否为空
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // 如果不是JSON响应，先尝试获取文本内容用于调试
        const text = await response.text();
        console.warn('API返回非JSON响应:', text);
        return Promise.reject({ 
          message: "API返回非JSON格式数据", 
          status: response.status, 
          text: text.substring(0, 100) + '...' // 只保留部分文本以便调试
        });
      }
      
      try {
        const data = await response.json();
        if (response.ok) {
          return data;
        } else {
          return Promise.reject(data);
        }
      } catch (jsonError) {
        console.error('JSON解析错误:', jsonError);
        return Promise.reject({ 
          message: "JSON解析失败", 
          originalError: jsonError instanceof Error ? jsonError.message : String(jsonError) 
        });
      }
    }).catch(error => {
      // 捕获并处理网络错误等
      console.error('HTTP请求错误:', error);
      return Promise.reject(error);
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  // TODO 讲解 TS 操作符
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};