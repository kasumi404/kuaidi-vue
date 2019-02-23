import request from '@/utils/request'
var qs = require('qs')
export function fetchList(query) {
  return request({
    url: 'User/Getsystem_user',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function createArticle(data) {
  return request({
    url: 'User/Postsystem_user',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateArticle(data) {
  return request({
    url: 'User/Putsystem_user',
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
