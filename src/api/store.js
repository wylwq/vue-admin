import service from '@/utils/interceptor';

/**
 * 列表
 */
export function getStore(request) {
    return service.request({
        method:'post',
        url:'/store/queryStore',
        data:request
    })
}
/**
 *新增
 */
export function addStore(request) {
    console.log(request);
    return service.request({
        method:'post',
        url:'/store/addStore',
        data:request,
    })
}

/**
 * 编辑
 */
export function editStore(request) {
    console.log(request);
    return service.request({
        method:'post',
        url:'/store/editStore',
        data:request
    })
}
/**
 * 删除
 */
export function deleteStore(data) {
    return service.request({
        method:'get',
        url:'/store/delStore?ids='+data,
    })
}
export function getStoreById(data) {
    return service.request({
        method:'get',
        url:'/store/queryStoreById?id='+data,
    })
}