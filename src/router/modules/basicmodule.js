/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const basicmoduleRouter = {
  path: '/BasicModuleManager',
  component: Layout,
  redirect: 'noredirect',
  name: 'BasicModuleManager',
  meta: {
    title: '基础数据管理',
    icon: 'component',
    roles: ['admin', 'editor']
  },
  children: [
    {
      path: 'UserManager',
      component: () => import('@/views/BasicModule/UserManager'),
      name: 'UserManager',
      meta: {
        title: '用户管理',
        roles: ['admin', 'editor']
      }
    },
    {
      path: 'RoleManager',
      component: () => import('@/views/BasicModule/RoleManager'),
      name: 'RoleManager',
      meta: { title: '角色管理' }
    },
    {
      path: 'ProductionLineManager',
      component: () => import('@/views/BasicModule/ProductionLineManager'),
      name: 'ProductionLineManager',
      meta: { title: '产线设置' }
    },
    {
      path: 'CustomerManager',
      component: () => import('@/views/BasicModule/CustomerManager'),
      name: 'CustomerManager',
      meta: { title: '客户信息管理' }
    }
  ]
}

export default basicmoduleRouter
