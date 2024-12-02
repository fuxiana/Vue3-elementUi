import axios from "axios";
import { ElNotification } from "element-plus";
//创建axios实例
let request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
//请求拦截器
request.interceptors.request.use((config) => {
  return config;
});
//响应拦截器
request.interceptors.response.use(
  (response) => {
    if (response.data?.code !== 0) {
      const errorMessage = response.data;
      ElNotification({
        type: "error",
        title: errorMessage?.message || "Error",
        message: errorMessage.description || "系统异常",
        duration: 10000,
      });
    }
    return response.data;
  },
  (error) => {
    //处理网络错误
    let msg = "";
    let status = error.response.status;
    switch (status) {
      case 401:
        msg = "token过期";
        break;
      case 403:
        msg = "无权访问";
        break;
      case 404:
        msg = "请求地址错误";
        break;
      case 500:
        msg = "请求服务器失败";
        break;
      default:
        msg = "无网络";
    }
    ElNotification({
      type: "error",
      title: "Error",
      message: msg,
      duration: 10000,
    });
    return Promise.reject(error);
  }
);
export default request;
