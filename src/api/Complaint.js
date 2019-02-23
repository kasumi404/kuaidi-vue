import request from '@/utils/request'
var qs = require('qs')
export function getComplaint(pageIndex,pageSize) {
  return request({
    url: 'complaint/getComplaint',
    method: 'POST',
    params: {
    	pageIndex,
    	pageSize,
    }
  })
}

export function updateComplaint(complaintId,adminId,context) {
  return request({
    url: 'complaint/updateComplaint',
    method: 'POST',
    params: {
    	complaintId,
    	adminId,
    	context,
    }
  })
}

export function insertComplaint(adminId,context) {
  return request({
    url: 'complaint/insertComplaint',
    method: 'POST',
    params: {
    	adminId,
    	context,
    }
  })
}
export function deleteComplaint(id) {
  return request({
    url: 'complaint/deleteComplaint',
    method: 'POST',
    params: {
      id,
    }
  })
}