/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const productionRouter = {
  path: '/ProductionManager',
  component: Layout,
  redirect: 'noredirect',
  name: 'ProductionManager',
  meta: {
    title: '生产过程管理',
    icon: 'component'
  },
  children: [
    {
      path: 'WorkerOrderManager',
      component: () => import('@/views/ProductionManager/WorkerOrderManager'),
      name: 'WorkerOrderManager',
      meta: { title: '工单管理' }
    },
    {
      path: 'SingleBoxTesting',
      component: () => import('@/views/ProductionManager/SingleBoxTesting'),
      name: 'SingleBoxTesting',
      meta: { title: '单箱检测' }
    },
    {
      path: 'OldTesting',
      component: () => import('@/views/ProductionManager/OldTesting'),
      name: 'OldTesting',
      meta: { title: '老化检测' }
    },
    {
      path: 'BatteryPackTesting',
      component: () => import('@/views/ProductionManager/BatteryPackTesting'),
      name: 'BatteryPackTesting',
      meta: { title: '电池包复测' }
    },
    {
      path: 'AirTightnessTesting',
      component: () => import('@/views/ProductionManager/AirTightnessTesting'),
      name: 'AirTightnessTesting',
      meta: { title: '气密测试' }
    }
    // {
    //   path: "splitpane",
    //   component: () => import("@/views/ProductionManager/splitpane"),
    //   name: "SplitpaneDemo",
    //   meta: { title: "元件信息录入" }
    // },
    // {
    //   path: "splitpane",
    //   component: () => import("@/views/ProductionManager/splitpane"),
    //   name: "SplitpaneDemo",
    //   meta: { title: "售后/返修登记" }
    // }
  ]
}

export default productionRouter
