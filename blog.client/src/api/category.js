import request from '@/utils/request'

//所有类别
export function getCategory(data) {
  return request({
    url: '/category/getCategory',
    method: 'post',
    data,
  })
}
//详情 categoryDetail
export function categoryDetail(data) {
  return request({
    url: '/category/categoryDetail',
    method: 'post',
    data,
  })
}
