/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const materialRouter = {
  path: '/MaterialManager',
  component: Layout,
  redirect: 'noredirect',
  name: 'MaterialManager',
  meta: {
    title: '物料管理',
    icon: 'chart'
  },
  children: [
    {
      path: 'MaterialInfoManager',
      component: () => import('@/views/MaterialManager/MaterialInfoManager'),
      name: 'MaterialInfoManager',
      meta: { title: '物料信息管理', noCache: true }
    },
    {
      path: 'MaterialListManager',
      component: () => import('@/views/MaterialManager/MaterialListManager'),
      name: 'MaterialListManager',
      meta: { title: '物料清单管理', noCache: true }
    }
  ]
}

export default materialRouter
