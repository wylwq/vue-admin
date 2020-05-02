import service from '@/utils/interceptor';
const requestUrl = {
    userList:"/admin/userList",
}
function loadingTable(request) {
    return service.request({
        method: request.method,
        url: request.url,
        data: request.data
    })
}
export{requestUrl, loadingTable}