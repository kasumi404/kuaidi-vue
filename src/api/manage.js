import request from '@/utils/request'
var qs = require('qs')
export function login(username,password) {
	console.log(password)
  return request({
    url: 'manage/login',
    method: 'POST',
    params: {
    	username,
    	password,
    }
  })
}
export function getManage(pageSize,pageIndex,username,root) {
  return request({
    url: 'manage/getManage',
    method: 'POST',
    params: {
    	pageSize,
    	pageIndex,
    	username,
    	root,
    }
  })
}

export function register(username,password,root) {
  return request({
    url: 'manage/register',
    method: 'POST',
    params: {
    	username,
    	password,
    	root,
    }
  })
}
export function updateManage(id,username,password,root) {
  return request({
    url: 'manage/updateManage',
    method: 'POST',
    params: {
    	id,
    	username,
    	password,
    	root,
    }
  })
}
export function updatePassword(id,password) {
  return request({
    url: 'manage/updateManage',
    method: 'POST',
    params: {
    	id,
    	password,
    }
  })
}
export function deleteManage(id) {
  return request({
    url: 'manage/deleteManage',
    method: 'POST',
    params: {
      id,
    }
  })
}