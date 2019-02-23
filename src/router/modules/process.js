/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const processRouter = {
  path: '/ProcessManager',
  component: Layout,
  redirect: 'noredirect',
  name: 'ProcessManager',
  meta: {
    title: '工艺管理',
    icon: 'table'
  },
  children: [
    {
      path: 'ProductionTypeManager',
      component: () => import('@/views/ProcessManager/ProductionTypeManager'),
      name: 'ProductionTypeManager',
      meta: { title: '产品类型管理' }
    },
    {
      path: 'ProcessParameterManager',
      component: () => import('@/views/ProcessManager/ProcessParameterManager'),
      name: 'ProcessParameterManager',
      meta: { title: '工艺参数管理' }
    },
    {
      path: 'ProcessFlowManager',
      component: () => import('@/views/ProcessManager/ProcessFlowManager'),
      name: 'ProcessFlowManager',
      meta: { title: '工艺流程管理' }
    },
    {
      path: 'BarCodeTemplateManager',
      component: () => import('@/views/ProcessManager/BarCodeTemplateManager'),
      name: 'BarCodeTemplateManager',
      meta: { title: '条码模板管理' }
    }
  ]
}
export default processRouter
