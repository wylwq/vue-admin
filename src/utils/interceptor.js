import axios from 'axios'
import {Message} from 'element-ui'
import {setToken, getToken, setUsername, removeToken} from './appstore.js'

//创建axios，附给变量service
//let BASEURL = process.env.NODE_ENV = 'production' ? '' : '/api';
const BASEURL = '/api';
const service = axios.create({
    baseURL : "http://127.0.0.1:10080",
    timeout: 10000,
});
//alert(process.env.VUE_APP_ABC)

//添加请求拦截器
service.interceptors.request.use(function (config){
    //在发请求之前做些什么
    config.headers['token'] = getToken();
    return config;
}, function(error){
    return Promise.reject(error);
});

//添加响应拦截器
service.interceptors.response.use(function (config){
    //对响应数据做些什么
    let data = config.data;
    if(data.code != 1001) {
        Message.error(data.msg);
        return Promise.reject(data);
    }
    return data;
}, function(error){
    return Promise.reject(error);
});

export default service;

/**
 * 使用export default时，但不能同时存在多个exprot，
 * 文件import不需要花括号
 */