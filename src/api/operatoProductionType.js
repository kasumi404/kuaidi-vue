import request from '@/utils/request'
var qs = require('qs')
// 工艺管理-产品类型-单体电芯
// 查询（电芯）列表
export function electricList(query) {
  return request({
    url: 'cellType/getCell_Type',
    method: 'post',
    data: qs.stringify(query)
  })
}
// ID查询 -单体电芯
export function electricIdSearch(data) {
  return request({
    url: 'cellType/getCell_TypebyID',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 内容查询 -单体电芯
export function electricContentSearch(data) {
  return request({
    url: 'cellType/getCell_TypebyContent',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 添加提交 -单体电芯
export function addElectricList(data) {
  return request({
    url: 'cellType/postCell_Type',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 编辑 更新提交 -单体电芯
export function updateElectricList(data) {
  return request({
    url: 'cellType/putCell_Type',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 删除 -单体电芯
export function electricDel(data) {
  return request({
    url: 'cellType/deleteCell_Type',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 工艺管理-产品类型-模块
// 查询（模块）列表
export function moduleList(query) {
  return request({
    url: 'moduleType/getModule_Type',
    method: 'post',
    data: qs.stringify(query)
  })
}
// ID查询 -模块
export function moduleIdSearch(data) {
  return request({
    url: 'moduleType/getModule_TypebyID',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 内容查询 -模块
export function moduleContentSearch(data) {
  return request({
    url: 'moduleType/getModule_TypebyContent',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 添加提交 -模块
export function addModuleList(data) {
  return request({
    url: 'moduleType/postModule_Type',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 编辑 更新提交  -模块
export function updateModuleList(data) {
  return request({
    url: 'moduleType/putModule_Type',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 删除 -模块
export function moduleDel(data) {
  return request({
    url: 'moduleType/deleteModule_Type',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 工艺管理-产品类型-电池包
// 查询（模块）-电池包
export function packsList(query) {
  return request({
    url: 'packType/getPack_Type',
    method: 'post',
    data: qs.stringify(query)
  })
}
// ID查询 -电池包
export function packIdSearch(data) {
  return request({
    url: 'packType/getPack_TypebyID',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 内容查询 -电池包
export function PackContentSearch(data) {
  return request({
    url: 'packType/getPack_TypebyContent',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 添加提交 -电池包
export function addPackList(data) {
  return request({
    url: 'packType/postPack_Type',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 编辑更新提交  -电池包
export function updatePackList(data) {
  return request({
    url: 'packType/putPack_Type',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 删除 -电池包
export function PackDel(data) {
  return request({
    url: 'packType/deletePack_Type',
    method: 'post',
    data: qs.stringify(data)
  })
}
