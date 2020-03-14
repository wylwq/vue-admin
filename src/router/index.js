import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/index.vue";
import Layout from "../views/Layout/index.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta:{
      name:'主页'
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: Login,
    meta:{
      name:'登录'
    }
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta:{
      name:'控制台',
      icon:'el-icon-setting'
    },
    component: Layout,
    children:[
      {
        path:'/index',
        name:'index',
        meta:{
          name:'首页'
        },
        component:() => import("../views/Console/index.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    meta:{
      name:'用户管理',
      icon:'el-icon-s-custom'
    },
    component: Layout,
    children:[
      {
        path:'/addUser',
        name:'AddUser',
        meta:{
          name:'新增用户'
        },
        component:() => import("../views/User/add.vue")
      },
      {
        path:'/indexUser',
        name:'IndexUser',
        meta:{
          name:'查询用户'
        },
        component:() => import("../views/User/index.vue")
      },
      {
        path:'/updateUser',
        name:'UpdateUser',
        meta:{
          name:'修改用户'
        },
        component:() => import("../views/User/update.vue")
      }
    ]
  },
  {
    path: "/store",
    name: "Store",
    meta:{
      name:'库存管理',
      icon:'el-icon-coin'
    },
    component: Layout,
    children:[
      {
        path:'/addStore',
        name:'AddStore',
        meta:{
          name:'新增库存'
        },
        component:() => import("../views/Store/add.vue")
      },
      {
        path:'/indexStore',
        name:'IndexStore',
        meta:{
          name:'查询库存',
        },
        component:() => import("../views/Store/index.vue")
      },
      {
        path:'/updateStore',
        name:'UpdateStore',
        meta:{
          name:'修改库存'
        },
        component:() => import("../views/Store/update.vue")
      }
    ]
  }

];

const router = new VueRouter({
  routes
});

export default router;
