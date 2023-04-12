/**
 * @description 导出网络配置
 **/
export default {
	// 默认的接口地址，开发环境和生产环境走/mock-server
	// 当然你也可以选择自己配置成需要的接口地址，如"https://api.xxx.com"
	// 问号后边代表开发环境，冒号后边代表生产环境
//	baseURL: LangAndBasePathObj().site_region==2?'https://dev-sp.dev.shangyuan.biz/': 'https://dev-cn2.dev.shangyuan.biz/',
	baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'http://202.113.32.161:8088/cypj/',
	//  baseImageURL: 'http://192.168.0.42:8132/',

	// baseImageURL: 'http://192.168.0.42:8132/',
	baseImageURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://202.113.32.161:8088/cypj/',
	// 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
	// contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
	contentType: 'application/json;charset=UTF-8',
	// 最长请求时间
	requestTimeout: 10000,
	// 操作正常code，支持String、Array、int多种类型
	successCode: [200, 0, '200', '0'],
	// 数据状态的字段名称
	statusName: 'code',
	// 状态信息的字段名称
	messageName: 'msg',
}