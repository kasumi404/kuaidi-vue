import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";

/* Router Modules */

// import basicmodule from "./modules/basicmodule";
// import production from "./modules/production";
// import material from "./modules/material";
// import process from "./modules/process";
// import report from "./modules/report";

/* Router Modules */
// import chartsRouter from './modules/charts'
/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  {
    path: "/login",
    component: () => import("@/views/login/login"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/authredirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "首页",
        meta: { title: "首页", icon: "dashboard", noCache: true }
      }
    ]
  }
];
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  // basicmodule,
  // material,
  // process,
  // production,
  // report,
  {
    path: "/BasicModule",
    component: Layout,
    redirect: "/BasicModule",
    name: "基础数据管理",
    meta: {
      title: "基础数据管理",
      icon: "table"
    },
    children: [
      {
        path: "addBuild",
        component: () => import("@/views/BasicModule/addBuild"),
        name: "用户信息管理",
        meta: { title: "用户信息管理" }
      },
      {
        path: "addRoom",
        component: () => import("@/views/BasicModule/addRoom"),
        name: "快递信息管理",
        meta: { title: "快递信息管理" }
      },
      {
        path: "addHolder",
        component: () => import("@/views/BasicModule/addHolder"),
        name: "投诉信息管理",
        meta: { title: "投诉信息管理" }
      },
      {
        path: "addPark",
        component: () => import("@/views/BasicModule/addPark"),
        name: "快递员信息管理",
        meta: { title: "快递员信息管理" }
      },
    ]
  },
  {
    path: "/PropertyManager",
    component: Layout,
    redirect: "/PropertyManager",
    name: "快递管理",
    meta: {
      title: "快递管理",
      icon: "table"
    },
    children: [
      {
        path: "complaintManager",
        component: () => import("@/views/PropertyManager/complaintManager"),
        name: "快递录入",
        meta: { title: "快递录入" }
      },
    ]
  },
  {
    path: "/SystemManager",
    component: Layout,
    redirect: "/SystemManager",
    name: "系统管理",
    meta: {
      title: "系统管理",
      icon: "user"
    },
    children: [
      {
        path: "userManage",
        component: () => import("@/views/SystemManager/userManage"),
        name: "用户管理",
        meta: { title: "用户管理" }
      },
      {
        path: "resetPassword",
        component: () => import("@/views/SystemManager/resetPassword"),
        name: "修改密码",
        meta: { title: "修改密码" }
      },
    ]
  }

];

export const normalRouterMap = [
  // basicmodule,
  // material,
  // process,
  // production,
  // report,
  {
    path: "/BasicModule",
    component: Layout,
    redirect: "/BasicModule",
    name: "基础数据管理",
    meta: {
      title: "基础数据管理",
      icon: "table"
    },
    children: [
      {
        path: "addBuild",
        component: () => import("@/views/BasicModule/addBuild"),
        name: "用户信息管理",
        meta: { title: "用户信息管理" }
      },
      {
        path: "addRoom",
        component: () => import("@/views/BasicModule/addRoom"),
        name: "快递信息管理",
        meta: { title: "快递信息管理" }
      },
      {
        path: "addHolder",
        component: () => import("@/views/BasicModule/addHolder"),
        name: "投诉信息管理",
        meta: { title: "投诉信息管理" }
      },
      {
        path: "addPark",
        component: () => import("@/views/BasicModule/addPark"),
        name: "快递员信息管理",
        meta: { title: "快递员信息管理" }
      },
    ]
  },
  {
    path: "/PropertyManager",
    component: Layout,
    redirect: "/PropertyManager",
    name: "快递管理",
    meta: {
      title: "快递管理",
      icon: "table"
    },
    children: [
      {
        path: "complaintManager",
        component: () => import("@/views/PropertyManager/complaintManager"),
        name: "快递录入",
        meta: { title: "快递录入" }
      },
    ]
  },
  {
    path: "/SystemManager",
    component: Layout,
    redirect: "/SystemManager",
    name: "系统管理",
    meta: {
      title: "系统管理",
      icon: "user"
    },
    children: [
      {
        path: "resetPassword",
        component: () => import("@/views/SystemManager/resetPassword"),
        name: "修改密码",
        meta: { title: "修改密码" }
      },
    ]
  }

];
