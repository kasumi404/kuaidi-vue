import request from '@/utils/request'
var qs = require('qs')
// 条码模板（模块）管理接口  -- 电池包模板管理
// 查询（模块条码）列表
export function moduleCodeList(query) {
  return request({
    url: 'barCode/getSpec_Module_Barcode',
    method: 'post',
    data: qs.stringify(query)
  })
}
// ID查询 -模块条码
export function moduleCodeSearch(data) {
  return request({
    url: 'barCode/getSpec_Module_BarcodebyID',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 编辑更新提交 ，添加提交 -模块条码
export function updatemoduleCodeList(data) {
  return request({
    url: 'barCode/postSpec_Module_Barcode',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 删除 -模块条码
export function moduleCodeDel(data) {
  return request({
    url: 'barCode/deleteSpec_Module_Barcode',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查询（电池包模板管理 ）列表
export function packList(query) {
  return request({
    url: 'barCode/getSpec_Pack_Barcode',
    method: 'post',
    data: qs.stringify(query)
  })
}
// ID查询 -电池包模板管理
export function packSearch(data) {
  return request({
    url: 'barCode/getSpec_Pack_BarcodebyID',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 编辑更新提交 ，添加提交 -电池包模板管理
export function updatepackList(data) {
  return request({
    url: 'barCode/putSpec_Pack_Barcode',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除 -电池包模板管理
export function packDel(data) {
  return request({
    url: 'barCode/deleteSpec_Pack_Barcode',
    method: 'post',
    data: qs.stringify(data)
  })
}

