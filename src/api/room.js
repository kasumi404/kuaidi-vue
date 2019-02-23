import request from '@/utils/request'
var qs = require('qs')
export function fetchRoomList(buildno,roomlayer,pageIndex,pageSize) {
  return request({
    url: 'room/getroombynolayer',
    method: 'get',
    params: {
    	buildno,
    	roomlayer,
    	pageIndex,
    	pageSize,
    }
  })
}

export function fetchBuildNoList() {
  return request({
    url: 'room/getallbuildno',
    method: 'get'
  })
}

export function fetchBuildLayerByBuildNo(buildno) {
  return request({
    url: 'room/getbuildlayerbyno',
    method: 'get',
    params: {
    	buildno
    }
  })
}

export function fetchBuildListByBuildNo(buildno,pageIndex,pageSize) {
  return request({
    url: 'build/getbuildbyno',
    method: 'get',
    params: {
    	buildno,
    	pageIndex,
    	pageSize,
    }
  })
}

export function addRoom(data) {
  console.log(data)
  return request({
    url: 'room/addroom',
    method: 'post',
    data: data
  })
}

export function updateRoom(data) {
  console.log(data)
  return request({
    url: 'room/updateroom',
    method: 'post',
    data: data
  })
}

export function deleteRoom(roomid) {
  return request({
    url: 'room/deleteroom',
    method: 'get',
    params: {
    	roomid
    }
  })
}