import router from "./index.js";
import store from "@/store";
import {getToken, removeToken, getAdminFlag} from '../utils/appstore.js'

const whiteRouter = ['/login'];
//路由守卫,在路由跳转之前进行执行

router.beforeEach((to, from, next) =>{
    if(getToken()) {
        if(to.path === whiteRouter[0]) {
            removeToken();
            next();
        } else {
            /**
             * 动态分配路由权限
             */
            if(store.getters['addRouters'].length == 0) {
                let roles = getAdminFlag();
                store.dispatch('createRouter', roles).then(response =>{
                let addRouters = store.getters['addRouters'];
                let allRouters = store.getters['allRouters'];
                //路由更新
                router.options.routes = allRouters; 
                //添加动态路由
                router.addRoutes(addRouters);
                next({...to, replace: true})
                }).catch(error =>{
            
                })
            } else {
                next();
            }
        }
    } else {
        if(whiteRouter.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
        }
    }
  })