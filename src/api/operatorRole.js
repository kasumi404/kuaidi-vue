import request from '@/utils/request'
var qs = require('qs')
export function fetchRoleList() {
  return request({
    url: 'build/getallbuild?pageIndex=1',
    method: 'get',
  })
}

export function createRole(data) {
  console.log(data)
  return request({
    url: 'role/postSystem_Role',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateRole(data) {
  return request({
    url: 'role/putSystem_Role',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function deleteRole(data) {
  return request({
    url: 'role/deleteSystem_Role',
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
