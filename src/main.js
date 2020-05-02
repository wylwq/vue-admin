import Vue from "vue";
import VueCompositionApi from '@vue/composition-api'
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import global from './utils/global.js'
import './router/premit.js';
//自定义全局组件
import Icons from './icons/index.js';
//echarts
import echarts from 'echarts';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(global);
Vue.use(VueCompositionApi);
Vue.use(echarts);
Vue.prototype.$echarts = echarts




//runtime(运行模式)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
