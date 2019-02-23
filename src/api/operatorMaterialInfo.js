import request from '@/utils/request'
var qs = require('qs')
//查询所有
export function fetchList(query) {
  return request({
    url: 'material_BaseInfo/getMaterial_BaseInfo',
    method: 'post',
    data: qs.stringify(query)
  })
}

//内容查询
export function ContentfetchList(query) {
  return request({
    url: 'material_BaseInfo/getMaterial_BaseInfobyContent',
    method: 'post',
    data: qs.stringify(query)
  })
}
//添加
export function createMater(data) {
  return request({
    url: 'material_BaseInfo/postMaterial_BaseInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}
//更新
export function updateMater(data) {
  return request({
    url: 'material_BaseInfo/putMaterial_BaseInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}
//删除
export function deleteMater(data) {
  return request({
    url: 'material_BaseInfo/deleteMaterial_BaseInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}
