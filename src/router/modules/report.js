/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const reportRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: '报表中心',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      // component: () => import("@/views/components-demo/tinymce"),
      name: 'TinymceDemo',
      meta: { title: '车次号' }
    },
    {
      path: 'markdown',
      // component: () => import("@/views/components-demo/markdown"),
      name: 'MarkdownDemo',
      meta: { title: '工序数据查询' }
    },
    {
      path: 'json-editor',
      // component: () => import("@/views/components-demo/jsonEditor"),
      name: 'JsonEditorDemo',
      meta: { title: '综合数据查询' }
    },
    {
      path: 'splitpane',
      // component: () => import("@/views/components-demo/splitpane"),
      name: 'SplitpaneDemo',
      meta: { title: '工单进度查询' }
    },
    {
      path: 'avatar-upload',
      // component: () => import("@/views/components-demo/avatarUpload"),
      name: 'AvatarUploadDemo',
      meta: { title: '出货记录查询' }
    }
  ]
}

export default reportRouter
