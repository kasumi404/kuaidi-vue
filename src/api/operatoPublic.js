import request from '@/utils/request'
var qs = require('qs')
//电池类型管理接口
export function getCathodeList(query) {
  return request({
    url: 'cathode/getProduct_Cathode',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 电池形状管理接口
export function getCellShapeList(data) {
  return request({
    url: 'cellShape/getProduct_CellShape',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  车型管理接口
export function getVehicleTypeList(data) {
  return request({
    url: 'vehicleType/getProduct_VehicleType',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 规格代码（模块）管理接口
export function getSystemCustomer(data) {
  return request({
    url: 'unit/getSystem_Customer',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 生产地址管理接口
export function getAddressList(data) {
  return request({
    url: 'address/getProduct_Address',
    method: 'post',
    data: qs.stringify(data)
  })
}
