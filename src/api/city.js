import service from '@/utils/interceptor';
export function loadingcity(request) {

    return service.request({
        method:'post',
        url:'/city/loadingCity',
        data:request
    })

}