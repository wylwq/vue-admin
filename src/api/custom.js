import service from '@/utils/interceptor';

/**
 * 订单列表
 */
export function customList(request) {
    return service.request({
        method:'post',
        url:'/custom/customList',
        data:request
    })
}
/**
 *新增
 */
export function addCustom(request) {
    console.log(request);
    return service.request({
        method:'post',
        url:'/custom/saveCustom',
        data:request,
    })
}
/**
 * 详情
 */
export function detailCustom(request) {
    return service.request({
        method:'get',
        url:'/custom/findById?id='+request,
    })
}
/**
 * 根据电话号码查询
 * @param {} data 
 */
export function findOneCustom(request) {
    return service.request({
        method:'get',
        url:'/custom/findOneCustom?cusPhone='+request,
    })
}

/**
 * 删除
 */
export function deleteCustom(data) {
    return service.request({
        method:'get',
        url:'/custom/delCustom?id='+data,
    })
}