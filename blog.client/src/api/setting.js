import request from '@/utils/request'

//设置头像
export function setAvatar(data) {
  return request({
    url: '/settings/avatar',
    method: 'post',
    data,
    headers: {
    	'Content-Type': 'multipart/form-data'
    }
  })
}


