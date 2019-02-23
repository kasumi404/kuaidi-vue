import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo111(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/getuserbyno',
    method: 'get',
    params: { 
      userroot: token,
      pageIndex: 1,
      pageSize: 1
    }
  })
}

