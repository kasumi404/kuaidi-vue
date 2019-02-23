import request from '@/utils/request'
var qs = require('qs')
export function fetchList(query) {
  return request({
    url: 'Material_Baseinfo/Getmaterial_baseinfo',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function createMater(data) {
  return request({
    url: 'Material_Baseinfo/Postmaterial_baseinfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateMater(data) {
  return request({
    url: 'Material_Baseinfo/Putmaterial_baseinf',
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
