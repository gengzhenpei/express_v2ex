import axios from 'axios'
import qs from 'qs'
import { Base64 } from 'js-base64'
//import {
//baseURL,
//} from '@/config'
//import { Message, MessageBox, Notification } from 'element-ui'
//import store from '../store'
//import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
//	baseURL: 'http://localhost:5000/api/v1', // api的base_url
	baseURL: 'http://localhost:3000/api', // api的base_url
	timeout: 15000, // 请求超时时间
	headers: {
		'Content-Type': 'application/json'
	},
})

// request拦截器
//service.interceptors.request.use(config => {
//	if(localStorage.getItem('token')) {
//		config.headers['token'] = localStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改 
//	}
//	return config
//}, error => {
//	// Do something with request error
//	console.log(error) // for debug
//	Promise.reject(error)
//})
/**
 * @description axios请求拦截器
 */
service.interceptors.request.use(
	(config) => {
		// 不规范写法 可根据setting.config.js tokenName配置随意自定义headers
		// if (token) config.headers[tokenName] = token
		const token = localStorage.getItem('token');
//		const base64 = Base64.encode(`${token}:`)
		// 规范写法 不可随意自定义
		if(token) config.headers['Authorization'] = `Bearer ${token}`

		if(
			config.data &&
			config.headers['Content-Type'] ===
			'application/x-www-form-urlencoded;charset=UTF-8'
		) {
			config.data = qs.stringify(config.data);
		}
		if((config.method == 'get') && config.params) {
			//			config.params = qs.stringify(config.params);
			config.paramsSerializer = params => {
				return qs.stringify(config.params, {
					indices: false
				})
			};
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)
// respone拦截器
service.interceptors.response.use(
	response => {
		console.log('response', response)
		const res = response.data
		return response.data
//		if(res.errorCode !== 200) {
//			// 10002:token过期; 10003:需要携带token值;  50014:Token 过期了;
//			if(res.errorCode === 10002 || res.errorCode === 10003 || res.code === 50014) {
//				console.log('你已被登出，可以取消继续留在该页面，或者重新登录')
//				setTimeout(function() {
//					if (confirm(`${res.err}, 重新登录？`)) { location.href= '/signin'; }
//				}, 500)
//			}
//			return response.data
//		} else {
//			return response.data
//		}
	},
	error => {
		console.log('err:' + error) // for debug
//		location.href = '/login'
		return Promise.reject(error)
	}
)
const handleData = ({
	config,
	data,
	status,
	statusText
}) => {
	switch(status) {
		//修改学工号失败 状态码单独处理
		case 9:
			return data
			break;
		case 1:
			break;
		case 200:
			return data
		case 401:
			break
		case 403:
			break
	}
	return Promise.reject(data)
}
/**
 * @description axios响应拦截器
 */
//service.interceptors.response.use(
//	(response) => {
//		handleData(response);
//	},
//	(error) => {
//		const {
//			response
//		} = error
//		if(response === undefined) {
//			Vue.prototype.$baseMessage(
//				'未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起',
//				'error'
//			)
//			return {}
//		} else return handleData(response)
//	}
//)

export default service