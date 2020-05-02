import {login} from '@/api/login.js'
import {setToken, getToken, setUsername, removeToken, setAdminFlag} from '../../utils/appstore.js'
import {defaultRouter, dynamicRouter} from '@/router/index.js'
const loginModel = {
    state: {
      token: getToken() || '',
      allRouters: defaultRouter,
      addRouters:[],
      roles:[]
    },
    getters: {
        addRouters: state => state.addRouters,
        allRouters: state => state.allRouters,
    },
    //同步方法
    mutations: {
        SET_ROUTER(state, router) {
            state.addRouters = router;
            state.allRouters = defaultRouter.concat(router);
        },
        CLEAR_ROUTER(state, router) {
            state.addRouters = router;
        }
    },
    //异步方法
    actions: {
        loginActions(content, requestLogin) {
            return new Promise((resolve, reject) =>{
               login(requestLogin).then(response =>{
                let data = response.data;
                setUsername(data.username);
                setToken(data.token);
                setAdminFlag(data.adminFlag);
                resolve(data)
               }).catch(error =>{
                reject(error)
               })
            })
        },
        exitActions(content) {
            return new Promise((resolve, reject) =>{
                removeToken();
                console.log("移除成功");
                content.commit('CLEAR_ROUTER', '');
                resolve()
            });
            
        },

        createRouter(content, rolesResp) {
            const roles = rolesResp.split(",");
            return new Promise((resolve, reject) => {
                const addRouters = dynamicRouter.filter(item => {
                    if(roles.includes(item.meta.role)) {
                        return item;
                    }
                })
                //addRouters.push(dynamicRouter[dynamicRouter.length - 1]);
                content.commit('SET_ROUTER', addRouters);
                resolve();
            }) 
        }
    }
}
export default loginModel;