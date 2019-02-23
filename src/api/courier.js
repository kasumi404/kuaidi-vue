import request from '@/utils/request'
var qs = require('qs')
export function getCourier(pageSize,pageIndex,courierName) {
  return request({
    url: 'courier/getCourier',
    method: 'post',
    params: {
    	pageSize,
    	pageIndex,
    	courierName
    }
  })
}
export function updateCourier(courierId,courierName,courierCall,courierIdCard) {
  return request({
    url: 'courier/updateCourier',
    method: 'post',
    params: {
        courierId,
        courierName,
        courierCall,
        courierIdCard
    }
  })
}
export function register(courierName,courierCall,courierIdCard) {
  return request({
    url: 'courier/register',
    method: 'post',
    params: {
        courierName,
        courierCall,
        courierIdCard
    }
  })
}
export function getE(expressType,flag,courierId) {
    var adminName = ''
    var pageSize = 99
    var pageIndex = 1
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
export function deleteCourier(id) {
  return request({
    url: 'courier/deleteCourier',
    method: 'post',
    params: {
        id,
    }
  })
}
