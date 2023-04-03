/* * 右侧菜单 */
<template>
	<div class="">
		<div class="sep20"></div>
		<template v-if="userInfo&&userInfo.id">
			<div class="box">
				<div class="cell">
					<table cellpadding="0" cellspacing="0" border="0" width="100%">
						<tbody>
							<tr>
								<td width="48" valign="top">
									<a href="/member/gengzhenpei"><img src="https://cdn.v2ex.com/avatar/54c4/4164/526939_large.png?m=1676467824" class="avatar" border="0" align="default" width="48" style="width: 48px; max-height: 48px;" alt="gengzhenpei"></a>
								</td>
								<td width="10" valign="top"></td>
								<td width="auto" align="left">
									<div class="fr">
										<a href="/settings/night/toggle?once=74696" class="light-toggle"><img src="~@/static/img/toggle-light.png" align="absmiddle" height="10" alt="Light"></a>
									</div><span class="bigger"><a href="/member/gengzhenpei">gengzhenpei</a></span>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="sep10"></div>
					<table cellpadding="0" cellspacing="0" border="0" width="100%">
						<tbody>
							<tr>
								<td width="33%" align="center">
									<a href="/my/nodes" class="dark" style="display: block;"><span class="bigger">1</span>
										<div class="sep3"></div><span class="fade">节点收藏</span></a>
								</td>
								<td width="34%" style="border-left: 1px solid rgba(100, 100, 100, 0.4); border-right: 1px solid rgba(100, 100, 100, 0.4);" align="center">
									<a href="/my/topics" class="dark" style="display: block;"><span class="bigger">0</span>
										<div class="sep3"></div><span class="fade">主题收藏</span></a>
								</td>
								<td width="33%" align="center">
									<a href="/my/following" class="dark" style="display: block;"><span class="bigger">0</span>
										<div class="sep3"></div><span class="fade">特别关注</span></a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="cell" id="member-activity">
					<div class="member-activity-bar">
						<div class="member-activity-start" style="width: 14%;"></div>
					</div>
				</div>
				<div class="cell" style="padding: 8px; line-height: 100%;">
					<table cellpadding="0" cellspacing="0" border="0" width="100%">
						<tbody>
							<tr>
								<td width="28">
									<a href="/write"><img src="~@/static/img/essentials/compose.png?v=b9e1f045f4ad639733bf9f6dbc62ed4c" width="28" border="0" style="vertical-align: bottom;"></a>
								</td>
								<td width="10"></td>
								<td width="auto" valign="middle" align="left">
									<a href="/write">创作新主题</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="cell flex-one-row" style="padding: 7px 10px;">
					<a href="/notifications" class="fade">0 条未读提醒</a>
					<div id="money">
						<a href="/balance" class="balance_area" style="">18
							<img src="~@/static/img/silver@2x.png" height="16" alt="S" border="0"> 70
							<img src="~@/static/img/bronze@2x.png" height="16" alt="B" border="0">
						</a>
					</div>
				</div>
			</div>
			<div class="sep20"></div>
			<div class="box">
				<div class="inner">
					<li class="fa fa-gift" style="color: #f90;"></li> &nbsp;
					<a href="/mission/daily">领取今日的登录奖励</a>
				</div>
			</div>
			<div class="sep20"></div>

			<div class="box">
				<div class="inner">
					<span class="f12 gray">我收藏的节点</span>
				</div>
				<div class="inner ui-sortable" id="nodes-sidebar">
				</div>
			</div>
		</template>
		<template v-if="!userInfo||!userInfo.id">
			<!--注册-->
			<template v-if="(routeObj.name=='signup')||(routeObj.name=='index')">
				<div class="box">
					<div class="cell">
						<strong>V2EX = way to explore</strong>
						<div class="sep5"></div>
						<span class="fade">V2EX 是一个关于分享和探索的地方</span>
					</div>
					<div class="inner">
						<div class="sep5"></div>
						<div align="center">
							<a href="/signup" class="super normal button">现在注册</a>
							<div class="sep5"></div>
							<div class="sep10"></div>
							已注册用户请 &nbsp;
							<a href="/signin">登录</a>
						</div>
					</div>
				</div>
			</template>
			<!--登录-->
			<template v-if="(routeObj.name=='signin')">
				<div class="box">
					<div class="header">其他登录方式</div>
					<div class="cell" style="text-align: center;">
						<a @click="trySampleRequest()" class="google-signin"></a>
					</div>
				</div>
			</template>
		</template>
	</div>
</template>

<script>
	import {
		socialLogin
	} from '@/api/auth.js'
	export default {
		data() {
			return {
				userInfo: {},
				YOUR_CLIENT_ID: '161890764324-viq03rs8hiqsc4v7gv4lbmh2slk23kfr.apps.googleusercontent.com',
				YOUR_REDIRECT_URI: 'http://localhost:8083',
			};
		},
		mounted() {
			let user_info = localStorage.getItem('user_info')
			if(user_info) {
				this.userInfo = JSON.parse(user_info)
			}
			//google登录
			//提取#后面的部分
			var fragmentString = location.hash.substring(1);

			// Parse query string to see if page request is coming from OAuth 2.0 server.
			var params = {};
			var regex = /([^&=]+)=([^&]*)/g,
				m;
			while(m = regex.exec(fragmentString)) {
				params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
			}
			if(Object.keys(params).length > 0) {
//				localStorage.setItem('oauth2-test-params', JSON.stringify(params));
				if(params['state'] && params['state'] == 'try_sample_request') {
					this.trySampleRequest(params);
				}
			}
		},
		methods: {
			//登录
			async socialLoginFun(form) {
				const {
					code,
					errorCode,
					data,
					msg
				} = await socialLogin(form)
				if(code == 200) {
					console.log('data', data)
					let token = data.token;
					localStorage.setItem('token', token)
					let user_info = data;
					localStorage.setItem('user_info', JSON.stringify(user_info))
					this.$router.push({
						path: '/'
					})
				} else {
					this.err_msg = msg;
				}
			},
			// If there's an access token, try an API request.
			// Otherwise, start OAuth 2.0 flow.
			trySampleRequest(params) {
				let _this = this;
//				var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
				if(params && params['access_token']) {
					var xhr = new XMLHttpRequest();
					xhr.open('GET',
						'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&' +
						'access_token=' + params['access_token']);
					xhr.onreadystatechange = function(e) {
						if(xhr.readyState === 4 && xhr.status === 200) {
							console.log(xhr.response);
							let res = JSON.parse(xhr.response);
							_this.socialLoginFun(res);
//							let path = _this.$route.path
//							//登录成功后 刷新路由后面参数
//							_this.$router.replace({
//								path: path
//							})
						} else if(xhr.readyState === 4 && xhr.status === 401) {
							// Token invalid, so prompt for user permission.
							_this.oauth2SignIn();
						}
					};
					xhr.send(null);
				} else {
					_this.oauth2SignIn();
				}
			},
			/*
			 * Create form to request access token from Google's OAuth 2.0 server.
			 */
			oauth2SignIn() {
				// Google's OAuth 2.0 endpoint for requesting an access token
//				var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
				var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?'
				
				// Create element to open OAuth 2.0 endpoint in new window.
				var form = document.createElement('form');
				form.setAttribute('method', 'GET'); // Send as a GET request.
				form.setAttribute('action', oauth2Endpoint);

				// Parameters to pass to OAuth 2.0 endpoint.
				var params = {
					'client_id': this.YOUR_CLIENT_ID,
					'redirect_uri': this.YOUR_REDIRECT_URI,
					'scope': 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email ',
					'state': 'try_sample_request',
					'include_granted_scopes': 'true',
					'response_type': 'token',
					'prompt': 'select_account',
				};

				// Add form parameters as hidden input values.
				for(var p in params) {
					var input = document.createElement('input');
					input.setAttribute('type', 'hidden');
					input.setAttribute('name', p);
					input.setAttribute('value', params[p]);
					form.appendChild(input);
				}

				// Add form to page and submit it to open the OAuth 2.0 endpoint.
				document.body.appendChild(form);
				form.submit();
			}
		},

	};
</script>

<style scoped>
	.member-activity-bar {
		width: 250px;
		background-color: #f0f0f0;
		height: 3px;
	}
	
	.member-activity-start {
		height: 3px;
		background-color: #ccc;
	}
	
	.balance_area img {
		vertical-align: middle;
	}
	
	.balance_area,
	a.balance_area:link,
	a.balance_area:visited {
		font-size: 11px;
		line-height: 16px;
		padding: 5px 10px;
		border-radius: 20px;
		text-decoration: none;
		color: #666;
		text-shadow: 0 1px 0 #fff;
		display: inline-block;
		background: #f5f5f5;
		background: linear-gradient(top, #f5f5f5 0, #e2e2e2 100%);
	}
	
	.inner {
		padding: 10px;
		font-size: 14px;
		line-height: 150%;
		text-align: left;
	}
	
	.fa-gift:before {
		content: "\f06b";
	}
	
	#nodes-sidebar {
		text-align: left;
		padding: 0 10px;
	}
	
	div.node {
		background-color: transparent;
		border-radius: var(--box-border-radius);
		box-shadow: none;
		font-size: 14px;
		margin: 0px -10px 0px -10px;
		padding: 5px 10px 5px 10px;
	}
	
	div.node .node_compose {
		float: right;
		visibility: hidden;
		margin: 3px 0px 0px 0px;
	}
	
	a.google-signin {
		width: 191px;
		height: 46px;
		background-image: url('~@/static/img/btn_google_signin_light_normal_web@2x.png');
		background-size: 191px 46px;
		background-repeat: no-repeat;
		border: none;
		text-decoration: none;
		display: inline-block;
	}
	
	a.google-signin:hover {
		background-image: url('~@/static/img/btn_google_signin_light_normal_web@2x.png');
	}
</style>