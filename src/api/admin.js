import request from '@/utils/request'
var qs = require('qs')
export function getAdmin(adminName,adminPlace,pageIndex,pageSize) {
  return request({
    url: 'admin/getAdmin',
    method: 'post',
    params: {
    	adminName,
    	adminPlace,
    	pageIndex,
    	pageSize,
    }
  })
}
export function edit(adminId,adminName,adminCell,adminIDCard,adminPlace) {
  return request({
    url: 'admin/edit',
    method: 'post',
    params: {
    	adminId,
    	adminName,
    	adminCell,
    	adminIDCard,
    	adminPlace,
    }
  })
}export function updateAdmin(id,username,password) {
  return request({
    url: 'admin/updateAdmin',
    method: 'post',
    params: {
    	id,
    	username,
    	password,
    }
  })
}
export function register(username,password,adminName,adminCell,adminIDCard,adminPlace) {
  return request({
    url: 'admin/register',
    method: 'post',
    params: {
    	username,
    	password,
    	adminName,
    	adminCell,
    	adminIDCard,
    	adminPlace,
    }
  })
}

export function deleteAdmin(id) {
  return request({
    url: 'admin/deleteAdmin',
    method: 'post',
    params: {
        id,
    }
  })
}