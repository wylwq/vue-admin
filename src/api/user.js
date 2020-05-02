import service from '@/utils/interceptor';

/**
 * 列表
 */
export function getRole(request) {
    return service.request({
        method:'post',
        url:'/store/queryStore',
        data:request
    })
}

export function addUser(request) {
    return service.request({
        method:'post',
        url:'/admin/saveUser',
        data:request
    })
}

export function editUser(request) {
    return service.request({
        method:'post',
        url:'/admin/editUser',
        data:request
    })
}
/**
 * 删除用户
 * @param {*} request 
 */
export function DelUser(request) {
    return service.request({
        method:'get',
        url:'/admin/delUser?userId='+request,
    })
}