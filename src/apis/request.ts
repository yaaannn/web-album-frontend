import axios from "axios";
import type { AxiosInstance } from "axios";
// import { getAccessToken } from "./api/token";
import {
    globalConfig as config,
} from "@/utils/global-config";
import { storageData as storage } from "@/utils/stored-data";
const baseURL = `http://${config.domain}`;

const service: AxiosInstance = axios.create({
    baseURL: `${baseURL}/api/`,
    timeout: 5000,
    headers: {},
});


//请求拦截器
service.interceptors.request.use((config) => {
    if (!config.headers["Authorization"]) {
        config.headers.Authorization = `Bearer ${storage.get('access_token')}`;
    }
    return config;
}), (error: any) => {
    return Promise.reject(error);
}



// 响应拦截器
service.interceptors.response.use((res) => {
    return Promise.resolve(res);
}, (error) => {
    return Promise.reject(error);
});

export default service;