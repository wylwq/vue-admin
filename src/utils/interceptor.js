import axios from 'axios'

//创建axios，附给变量service
//let BASEURL = process.env.NODE_ENV = 'production' ? '' : '/api';
const BASEURL = '/api';
const service = axios.create({
    baseURL : "http://www.baidu.com",
    timeout: 1000,
});
//alert(process.env.VUE_APP_ABC)

//添加请求拦截器
service.interceptors.request.use(function (config){
    //在发请求之前做些什么
    return config;
}, function(error){
    return Promise.reject(error);
});

//添加响应拦截器
service.interceptors.response.use(function (config){
    //对响应数据做些什么
    return config;
}, function(error){
    return Promise.reject(error);
});

export default service;

/**
 * 使用export default时，但不能同时存在多个exprot，
 * 文件import不需要花括号
 */