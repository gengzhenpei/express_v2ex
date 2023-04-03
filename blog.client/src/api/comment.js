import request from '@/utils/request'

// 获取关联目标下的评论列表
export function getComments(data) {
  return request({
    url: '/comment/getComments',
    method: 'post',
    data,
  })
}

//添加评论
export function addComment(data) {
  return request({
    url: '/comment/addComment',
    method: 'post',
    data,
  })
}

//详情 article/:id get
export function detail(id) {
  return request({
    url: `/article/${id}`,
    method: 'get',
  })
}
