import service from '@/utils/interceptor';

/**
 * 订单列表
 */
export function orderList(request) {
    return service.request({
        method:'post',
        url:'/order/orderList',
        data:request
    })
}
/**
 *新增
 */
export function addOrder(request) {
    console.log(request);
    return service.request({
        method:'post',
        url:'/order/commitOrder',
        data:request,
    })
}
/**
 * 详情
 */
export function detailOrder(data) {
    return service.request({
        method:'get',
        url:'/order/queryOrderItem?orderItemId='+data,
    })
}

/**
 * 取消
 */
export function cancelOrder(request) {
    console.log(request);
    return service.request({
        method:'get',
        url:'/order/cancelOrder?orderId='+request,
    })
}
/**
 * 删除
 */
export function deleteOrder(data) {
    return service.request({
        method:'get',
        url:'/order/delOrder?orderId='+data,
    })
}

/**
 * 统计接口
 */
export function statisticsOrder() {
    return service.request({
        method:'get',
        url:'/order/statisticsOrder',
    })
}