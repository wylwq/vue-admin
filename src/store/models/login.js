import {login} from '@/api/login.js'
import {setToken, getToken, setUsername, removeToken} from '../../utils/appstore.js'
const loginModel = {
    state: {
      token: getToken() || '',
    },
    getters: {

    },
    //同步方法
    mutations: {
    },
    //异步方法
    actions: {
        loginActions(content, requestLogin) {
            setToken('sdfaegasdgegea');
            setUsername('wangyu');
            return new Promise((resolve, reject) =>{
               login(requestLogin).then(response =>{
                 resolve(response)
               }).catch(error =>{
                 reject(error)
               })
            })
        },
        exitActions(content) {
            return new Promise((resolve, reject) =>{
                removeToken();
                resolve()
            });
            
        }
    }
}
export default loginModel;