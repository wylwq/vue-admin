import service from '@/utils/interceptor'
/**
 * 获取短信验证码接口
 */
export function getSms(request) {
    return service.request({
        method: 'get',
        url: 'getSms',
        data: request
    })
}

/**
  * 注册接口
  */
export function register(request) {
    return service.request({
        method:"post",
        url:"register",
        data:request
    })
}
 

/**
 * 获取用户角色接口 
 */

 /**
  * 登录接口
  */
 export function login(request) {
    console.log(request);
    return service.request({
        method:"post",
        url:"login",
        data:request
    })
}