import { User } from "./screens/project-list/search-panel"

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

// fetch后面跟的这个url（`${apiUrl}/login`）的作用是：
// 当用户在前端页面输入用户名和密码并点击登录时，前端会将这些数据（data）通过POST请求发送到后端的登录接口（/login）。
// 后端收到请求后，会校验用户名和密码是否正确，并返回相应的用户信息和token。
// 前端拿到后端返回的数据后，进行后续处理（如保存token、设置登录状态等）。
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      // 这里的 return 作用是将处理后的用户信息（user对象）作为 login 函数的返回值返回出去。
      // 这样调用 login 的地方（比如 context/auth-context.tsx 里的 login 方法）就能拿到 user 数据，进行后续处理（如设置全局 user 状态）。
      // handleUserResponse 会把后端返回的数据中的 user 信息提取出来，并把 token 存到 localStorage，再把 user 返回。
      return handleUserResponse(await response.json());
    } else {
     
      return Promise.reject(data);
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
    
      return Promise.reject(data);
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
