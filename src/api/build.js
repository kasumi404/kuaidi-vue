import request from '@/utils/request'
var qs = require('qs')
export function fetchBuildList(pageIndex,pageSize) {
  return request({
    url: 'build/getallbuild',
    method: 'get',
    params: {
    	pageIndex,
    	pageSize,
    }
  })
}
export function fetchBuildCount() {
  return request({
    url: 'build/text',
    method: 'get',
    params: {
    }
  })
}
export function fetchBuildListByBuildType(buildtype,pageIndex,pageSize) {
  return request({
    url: 'build/getbuildbytype',
    method: 'get',
    params: {
    	buildtype,
    	pageIndex,
    	pageSize,
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

export function addBuild(data) {
  return request({
    url: 'build/addbuild',
    method: 'post',
    data: data
  })
}

export function updateBuild(data) {
  return request({
    url: 'build/updatebuild',
    method: 'post',
    data: data
  })
}

export function deleteBulid(buildid) {
  return request({
    url: 'build/deletebuild',
    method: 'get',
    params: {
    	buildid
    }
  })
}

