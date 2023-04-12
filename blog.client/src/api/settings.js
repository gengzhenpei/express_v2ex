import request from '@/utils/request'

//
export function settingsAvatar(data) {
	return request({
		url: '/settings/avatar',
		method: 'post',
		data,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
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

//获取用户信息 /users/getUserInfo
export function getUserInfo(data) {
	return request({
		url: '/user/getUserInfo',
		method: 'post',
		data,
	})
}