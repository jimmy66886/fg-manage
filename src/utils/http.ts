// axios.js

import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建一个 Axios 实例
const instance = axios.create({
    baseURL: 'http://localhost:8080/admin', // 设置后端API的基本URL
});

// 在请求头中添加token
instance.interceptors.request.use((config) => {
    // 默认情况下需要token
    config.requiresToken = true;
    // 如果请求不需要token，将requiresToken设置为false
    if (config.url === '/user/login') {
        config.requiresToken = false;
    } else {
        if (JSON.parse(localStorage.getItem('userInfo')) != null) {
            var token = JSON.parse(localStorage.getItem('userInfo')).token; // 从本地存储中获取token
        }
    }

    // 如果请求需要token，添加token到请求头
    if (token && config.requiresToken) {
        config.headers['token'] = token;
    }
    return config;
});

// 设置Axios响应拦截器
instance.interceptors.response.use(
    (response) => {
        if (response.data.code === 0) {
            // 错误响应
            ElMessage({
                message: response.data.msg,
                type: 'error',
                plain: true
            })
            return Promise.reject(response);
        }
        return response.data;
    },
    (error) => {
        if (error.response.status === 401) {
            ElMessage({
                message: "账户已过期,请重新登录",
                type: 'error',
                plain: true
            })
            setTimeout(() => {
                window.location.href = '/'; // 更改路径到登录页面
            }, 1000);
        }
        return Promise.reject(error);
    }
);

export default instance;
