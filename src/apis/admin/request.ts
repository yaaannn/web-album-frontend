import axios from "axios";
import type { AxiosInstance } from "axios";
import {
    globalConfig as config,
} from "@/utils/global-config";
import { storageData as storage } from "@/utils/stored-data";
const baseURL = config.domain ? `http${config.https ? 's' : ''}://${config.domain}` : '';

const service: AxiosInstance = axios.create({
    baseURL: `${baseURL}/api/`,
    timeout: 5000,
    headers: {},
});


//请求拦截器
service.interceptors.request.use((config) => {
    // config.headers = config.headers ? config.headers : {};
    if (!config.headers["Authorization"]) {
        config.headers.Authorization = `Bearer ${storage.get('access_token_manage')}`;
    }
    // }
    return config;
}), (error: any) => {
    return Promise.reject(error);
}



// 响应拦截器
service.interceptors.response.use((res) => {

    // token 过期
    if (res.data.msg === "detail:The token has been refreshed") {
        // 清除token
        storage.remove("access_token_manage");
        // 返回登录页面
        window.location.href = "/login";


    }
    return Promise.resolve(res);
}, (error) => {
    return Promise.reject(error);
});

export default service;