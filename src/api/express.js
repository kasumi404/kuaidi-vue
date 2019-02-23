import request from '@/utils/request'
var qs = require('qs')
export function getExpress(flag,adminName,expressType,pageIndex,pageSize) {
  var courierId = 0
  return request({
    url: 'express/getExpress',
    method: 'get',
    params: {
    	adminName,
    	expressType,
    	pageSize,
    	pageIndex,
    	flag,
      courierId
    }
  })
}
export function updateExpress(expressId,goolId,goolName,expressFrom,expressTo,expressTime,expressType,expressPlace) {
  return request({
    url: 'express/updateExpress',
    method: 'post',
    params: {
    	expressId,
    	goolId,
    	goolName,
    	expressFrom,
    	expressTo,
    	expressTime,
    	expressType,
    	expressPlace,
    }
  })
}
export function getExpressByExpressCode(expressCode) {
  return request({
    url: 'express/getExpressByExpressCode',
    method: 'get',
    params: {
    	expressCode,
    }
  })
}
export function submitExpress(
	expressId,
	goolId,
	expressCode,
	expressPlace,
	goolName,
	goolType,
	goolWeight,
	expressType) {
  return request({
    url: 'express/updateExpress',
    method: 'post',
    params: {
		expressId,
		goolId,
    	expressCode,
  		expressPlace,
  		goolName,
  		goolType,
  		goolWeight,
  		expressType
    }
  })
}
export function deleteExpress(id) {
  return request({
    url: 'express/deleteExpress',
    method: 'post',
    params: {
      id,
    }
  })
}