import request from '@/utils/request'
var qs = require('qs')
// 查询所有
export function fetchCustomerList(query) {
  return request({
    url: 'customer/getSystem_Customer',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 增加
export function createCustomer(data) {
  return request({
    url: 'customer/postSystem_Customer',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 更新
export function updateCustomer(data) {
  return request({
    url: 'customer/putSystem_Customer',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 删除
export function deleteCustomer(data) {
  return request({
    url: 'customer/deleteSystem_Customer',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function fetchCustomer(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPvCustomer(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}
