import request from '@/utils/request'
var qs = require('qs')
export function fetchMaterialBatchList(query) {
  console.log(query)
  return request({
    url: 'material_Batch/getMaterial_Batch',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function createMaterialBatch(data) {
  console.log(data)
  return request({
    url: 'material_Batch/postMaterial_Batch',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateMaterialBatch(data) {
  return request({
    url: 'material_Batch/putMaterial_Batch',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function deleteMaterialBatch(data) {
  return request({
    url: 'material_Batch/deleteMaterial_Batch',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}
