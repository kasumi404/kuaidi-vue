import request from '@/utils/request'
var qs = require('qs')
export function fetchProductionLineList(query) {
  console.log(query)
  return request({
    url: 'productLine/getProductLine_BaseInfo',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function createProductionLine(data) {
  console.log(data)
  return request({
    url: 'productLine/postProductLine_BaseInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateProductionLine(data) {
  return request({
    url: 'productLine/putProductLine_BaseInfo',
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
