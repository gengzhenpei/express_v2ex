import request from '@/utils/request'

//查
export function getCategory(data) {
  return request({
    url: '/category/getCategory',
    method: 'post',
    data,
  })
}
