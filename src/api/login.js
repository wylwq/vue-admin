import service from '@/utils/interceptor'
/**
 * 获取短信验证码接口
 */
export function getSms() {
    service.request({
        method: 'get',
        url: 'getSms',
        data: {}
    })
}
 /**
  * 注册接口
  */

/**
 * 获取用户角色接口 
 */

 /**
  * 登录接口
  */