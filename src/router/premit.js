import router from "./index.js";
import {getToken, removeToken} from '../utils/appstore.js'

const whiteRouter = ['/login'];
//路由守卫,在路由跳转之前进行执行
router.beforeEach((to, from, next) =>{
    if(getToken()) {
        if(to.path === whiteRouter[0]) {
            removeToken();
            next();
        } else {
            next();
        }
    } else {
        if(whiteRouter.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
        }
    }
  })