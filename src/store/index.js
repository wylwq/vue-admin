import Vue from "vue";
import Vuex from "vuex";
import Cookie from "js-cookie";
import appModel from './models/app.js';
import loginModel from './models/login.js';

Vue.use(Vuex);
//sessionStorage只能存储字符串
export default new Vuex.Store({
  // state: {
  //   // isCllapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  //   // count:10
  // },
  // getters:{
  //   // count: (state) => state.count + 10,
  // },
  // //同步方法
  // mutations: {
  //   // SET_COUNT(state, value) {
  //   //   state.count = value;
  //   //   Cookie.set('isCollapse', JSON.stringify(state.isCllapse));
  //   //   console.log(Cookie.get('isCollapse'));
  //   //   sessionStorage.setItem('isCollapse', JSON.stringify(state.isCllapse));
  //   // }
  // },
  // //异步方法
  // actions: {
  //   // setMenuStatus(content, data) {
  //   //   console.log(content.state, data);
  //   //   content.commit('SET_COUNT', 100);
  //   // }
  // },
  modules: {
    appModel,
    loginModel,
  }
});
