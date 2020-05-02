import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/index.vue";
import Layout from "../views/Layout/index.vue"

Vue.use(VueRouter);

/**
 * 1.默认路由
 */
export const defaultRouter = [
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
  }
]

const routes = [

];
/**
 * 动态路由
 */
export const dynamicRouter = [
  {
    path: "/user",
    name: "User",
    meta:{
      role: '用户管理',
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
          keepAlive: true,
          name:'查询用户'
        },
        component:() => import("../views/User/index.vue")
      },
      {
        path:'/updateUser',
        name:'UpdateUser',
        hidden: true,
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
      role:'库存管理',
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
      }
    ]
  },
  {
    path: "/order",
    name: "Order",
    meta:{
      role: '订单管理',
      name:'订单管理',
      icon:'el-icon-s-order'
    },
    component: Layout,
    children:[
      {
        path:'/addOrder',
        name:'AddOrder',
        hidden: true,
        meta:{
          name:'订单预定'
        },
        component:() => import("../views/Order/add.vue")
      },
      {
        path:'/indexOrder',
        name:'IndexOrder',
        meta:{
          name:'订单查询'
        },
        component:() => import("../views/Order/index.vue")
      }
    ]
  },
  // {
  //   path: "/page404",
  //   hidden:true,
  //   meta:{
  //     name:'404',
  //     icon:'404'
  //   },
  //   component: Layout,
  //   children:[
  //     {
  //       path:'/404',
  //       meta:{
  //         name:'404'
  //       },
  //       component:() => import("../views/404.vue")
  //     }
  //   ]
  // },
  // {
  //   path:"*",
  //   redirect:"/404",
  //   hidden:true
  // }
]

const router = new VueRouter({
  routes:defaultRouter
});

export default router;
