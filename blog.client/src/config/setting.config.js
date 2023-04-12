/**
 * @description 导出通用配置
 */
module.exports = {
	// 标题，此项修改后需要重启项目 (包括初次加载雪花屏的标题 页面的标题 浏览器的标题)
	title: '',
	routerMode: 'history',
	// 不经过token校验的路由，白名单路由建议配置到与login页面同级，如果需要放行带传参的页面，请使用query传参，配置时只配置path即可
	routesWhiteList: ['/login', '/register', '/callback', '/404', '/403'],
	//google登录 client id
	YOUR_CLIENT_ID: '537525868574-6b24oib6f2evd8kq7jashc4dners94ie.apps.googleusercontent.com',
	//重定向地址
	YOUR_REDIRECT_URI: 'https://dev-gzp-sp.shangyuan.com/social/signin',
	//重定向地址-绑定
	YOUR_REDIRECT_URI_BIND: 'https://dev-gzp-sp.shangyuan.com/user-center/profile',
	//web站点域名 
	siteHostSp: 'https://dev-gzp-sp.shangyuan.com',
	siteHostHb: 'https://dev-gzp.shangyuan.com',
	
}