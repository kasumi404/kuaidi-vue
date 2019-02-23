import request from '@/utils/request'
var qs = require('qs')
export function fetchUserList(pageIndex,pageSize) {
  return request({
    url: 'user/getalluser',
    method: 'get',
    params: {
    	pageIndex,
    	pageSize,
    }
  })
}

export function fetchUserListByUserRoot(userroot,pageIndex,pageSize) {
  return request({
    url: 'user/getuserbyroot',
    method: 'get',
    params: {
    	userroot,
    	pageIndex,
    	pageSize,
    }
  })
}

export function fetchUserListByUserName(username,pageIndex,pageSize) {
  return request({
    url: 'user/getuserbyname',
    method: 'get',
    params: {
    	username,
    	pageIndex,
    	pageSize,
    }
  })
}

export function addUser(data) {
  return request({
    url: 'user/adduser',
    method: 'post',
    data: data
  })
}

export function deleteUser(userid) {
  return request({
    url: 'user/deleteuser',
    method: 'get',
    params: {
    	userid
    }
  })
}

export function updateUser(data) {
  return request({
    url: 'user/updateuser',
    method: 'post',
    data: data
  })
}

export function resetPassword(username,userpassword,newuserpassword) {
  return request({
    url: 'user/updatepassword',
    method: 'get',
    params: {
    	username,
    	userpassword,
    	newuserpassword,
    }
  })
}