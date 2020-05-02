import service from '@/utils/interceptor';

/**
 * 列表
 */

/**
 *新增
 */
export function addCategory(request) {
    return service.request({
        method:'post',
        url:'/category/addCategory',
        data:request
    })
}

/**
 * 编辑
 */
export function editFirstCategory(request) {
    return service.request({
        method:'post',
        url:'/category/updateCategory',
        data:request
    })
}
/**
 * 删除
 */
export function deleteCategory(data) {
    return service.request({
        method:'get',
        url:'/category/delCategory?ids='+data,
    })
}
export function getFirstCategory() {
    return service.request({
        method:'get',
        url:'/category/getCategory'
    })
}

export function getChildren(id) {
    return service.request({
        method:'get',
        url:'/category/getChildren?id='+id
    })
}
