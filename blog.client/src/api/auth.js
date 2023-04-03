import request from '@/utils/request'

//注册
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  })
}

//登录 login

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

//图形验证码
export function getcaptcha() {
	return request({
    url: '/user/captcha',
    method: 'get',
  })
}

//三方账号登录 login

export function socialLogin(data) {
  return request({
    url: '/social/socialLogin',
    method: 'post',
    data,
  })
}
