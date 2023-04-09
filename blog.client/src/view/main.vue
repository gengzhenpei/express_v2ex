<template>
	<div>
		<!--头部-->
		<div id="Top">
			<div class="content">
				<div class="site-nav">
					<a href="/" name="top" title="way to explore">
						<div id="Logo"></div>
					</a>
					<div id="search-container">
						<input id="search" type="text" maxlength="128" autocomplete="off" tabindex="1">
						<div id="search-result" class="box"></div>
					</div>
					<div class="tools">
						<a href="/" class="top">首页</a>
						<template v-if="user_info.id">
							<a href="/member/gengzhenpei" class="top">{{user_info.name}}</a>
							<a href="/notes" class="top">记事本</a>
							<a href="/t" class="top">时间轴</a>
							<a href="/settings" class="top">设置</a>
							<a href="#;" onclick="if (confirm('确定要从 V2EX 登出？')) { location.href= '/signout?once=68999'; }" class="top">登出</a>
						</template>
						<template v-else>
							<a href="/signup" class="top">注册</a>
							<a href="/signin" class="top">登录</a>
						</template>
					</div>
				</div>
			</div>
		</div>
		<!--中间内容-->
		<div id="Wrapper" class="">
			<!--<div id="Wrapper" class="" :style="widHeigth">-->
			<div class="content">
				<!--右边bar-->
				<template v-if="no_rightmenu_route_list.indexOf(routeName)<0">
					<div id="Leftbar"></div>
					<keep-alive>
						<vmenu id='Rightbar'></vmenu>
					</keep-alive>
				</template>
				<!--左边内容-->
				<router-view></router-view>
			</div>
			<div class="c"></div>
			<div class="sep20"></div>
		</div>
		<!--返回顶部-->
		<BackTop :bottom="90" :right="190"></BackTop>
		<!--底部-->
		<div id="Bottom">
			<div class="content">
				<div class="inner">
					<div class="sep10"></div>
					<div class="fr">
						<a href="https://www.digitalocean.com/?refcode=1b51f1a7651d" target="_blank">
							<div id="DigitalOcean"></div>
						</a>
					</div>
					<strong><a href="/about" class="dark" target="_self">关于</a> &nbsp; 
						<span class="snow">·</span> &nbsp; 
						<a href="/help" class="dark" target="_self">帮助文档</a> &nbsp; 
						<span class="snow">·</span> &nbsp; <a href="https://blog.v2ex.com/" class="dark" target="_blank">博客</a> &nbsp; <span class="snow">·</span> &nbsp; 
						<a href="/help/api" class="dark" target="_self">API</a> &nbsp; <span class="snow">·</span> &nbsp; 
						<a href="/faq" class="dark" target="_self">FAQ</a> &nbsp; <span class="snow">·</span> &nbsp; 
						<a href="/mission" class="dark" target="_self">我们的愿景</a> &nbsp; <span class="snow">·</span> &nbsp; 
						<a href="/advertise" class="dark" target="_self">广告投放</a> &nbsp; <span class="snow">·</span> &nbsp; 
						<a href="/tools" class="dark" target="_self">实用小工具</a> &nbsp; <span class="snow">·</span> &nbsp; 5231 人在线
					</strong> &nbsp;
					<span class="fade">最高记录 5556</span> &nbsp; <span class="snow">·</span> &nbsp;
					<a href="/select/language" class="f11">
						<img src="~@/static/img/language.png?v=6a5cfa731dc71a3769f6daace6784739" width="16" align="absmiddle" id="ico-select-language"> &nbsp; Select Language
					</a>
					<div class="sep20"></div>
					创意工作者们的社区
					<div class="sep5"></div>
					World is powered by solitude
					<div class="sep20"></div>
					<span class="small fade">VERSION: 3.9.8.5 · 19ms · <a href="/worldclock#utc">UTC 06:21</a> · <a href="/worldclock#pvg">PVG 14:21</a> · <a href="/worldclock#lax">LAX 22:21</a> · <a href="/worldclock#jfk">JFK 01:21</a><br>Developed with <a href="https://cl.v2ex.pro/" target="_blank">CodeLauncher</a><br>♥ Do have faith in what you're doing.</span>
					<div class="sep10"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import breadcrumbNav from "../components/breadcrumb-nav.vue";
	import Vmenu from "@/components/menu";
	import { mapState } from 'vuex'
	export default {
		components: {
			Vmenu,
		},
		data() {
			return {
//				user_info: {},
				ss: true,
				widHeigth: "min-height: 600px",
				keyword: "",
				routeName: '',
				no_rightmenu_route_list: ['login', 'register'],
			};
		},
		computed: {
			...mapState({
				user_info: (state) => {
					if(state.userInfo) {
						return JSON.parse(state.userInfo)
					} else {
						return {}
					}
				}
			})
		},
		created() {
//			this.initUserInfo()
		},
		mounted() {
			this.routeName = this.$route.name
			window.addEventListener("scroll", this.menu);
			this.widHeigth = "min-height:" + (window.innerHeight - 202) + "px"; //滚动的长度

		},
		methods: {
			initUserInfo() {
				let user_info = localStorage.getItem('user_info')
				if(user_info) {
					this.user_info = JSON.parse(user_info)
				}
			},
			touLogin(nodesc) {
				this.$Notice.success({
					title: "退出成功",
				});
				window.localStorage.removeItem("instance_id__instance_id");
			},
			search(v) {
				if(v != "") {
					this.$router.push({
						path: "/search",
						query: {
							q: v,
						},
					});
					setTimeout(() => {
						this.keyword = "";
					}, 200);
				}
			},
			//页面滚动事件的实现
			menu() {
				this.scroll =
					window.pageYOffset ||
					document.documentElement.scrollTop ||
					document.body.scrollTop; //滚动的长度
				let conHeight = this.scroll; //内容的长度顶部
				let scrollHeight = document.body.scrollHeight; //总长度
				let comHeight = scrollHeight;
				if(conHeight > comHeight) {
					this.ss = true;
				} else {
					this.ss = false;
				}
			},
		},

	};
</script>

<style>
	#Wrapper {
		/*background-color: #ffb800;
		background-image: url('~@/static/img/shadow_light.png'), url(//static.v2ex.com/bgs/pixels.png);*/
		background: #e2e2e2;
		background-position: 0 0, 0 0;
		background-repeat: repeat-x, repeat;
	}
	
	#Wrapper {
		padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
		text-align: center;
		/*background-color: #e2e2e2;*/
	}
	#Wrapper .content {
		min-height: 540px;
		position: relative;
	}
	
	#Top {
		text-align: center;
		background-color: var(--box-background-color);
		height: 44px;
		font-size: 15px;
		font-weight: 500;
		background-size: 44px 44px;
		border-bottom: 1px solid rgba(0, 0, 0, .22);
		padding: 0 20px;
	}
	
	#Top>.content {
		max-width: 1060px;
	}
	
	.site-nav {
		padding-top: 6px;
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.site-nav #Logo {
		width: 100px;
	}
	
	#Logo {
		width: 94px;
		height: 30px;
		background-image: url(~@/static/img/v2ex@2x.png);
		background-size: 94px 30px;
		background-repeat: no-repeat;
		display: inline-block;
	}
	
	#search-container {
		width: 246px;
		height: 24px;
		padding-left: 30px;
		background-color: var(--box-background-hover-color);
		transition: all .15s;
		border: 1px var(--box-background-hover-color) solid;
		border-radius: 15px;
		position: relative;
		margin: 0 0 2px 10px;
	}
	
	#search-container::before {
		content: "";
		position: absolute;
		left: 0;
		top: 1px;
		width: 26px;
		height: 100%;
		transition: filter .15s;
		background-image: url(~@/static/img/search_icon_light.png);
		background-color: transparent;
		background-size: 17px 17px;
		background-position: center;
		background-repeat: no-repeat;
		filter: opacity(40%);
	}
	
	#search-container #search {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		font-size: 16px;
		line-height: 16px;
		padding: 1px;
		border: 0;
		font-family: helvetica neue, luxi sans, Tahoma, hiragino sans gb, STHeiti, sans-serif;
		background-color: transparent;
		border: none;
	}
	
	#search-container #search-result {
		display: none;
		position: absolute;
		background-color: var(--box-background-color);
		top: 36px;
		left: 0;
		width: 100%;
		z-index: 10;
	}
	
	.site-nav .tools {
		flex: 1 1 200px;
		text-align: right;
	}
	
	.site-nav .tools * {
		margin-left: 8px;
	}
	
	a.top:link,
	a.top:visited {
		color: #556;
		text-decoration: none;
	}
	/*底部*/
	
	#Bottom {
		border-top: 1px solid rgba(0, 0, 0, .22);
		background-color: var(--box-background-color);
		text-align: center;
		color: var(--color-gray);
		padding-top: 0;
		padding-right: calc(var(--box-padding) + env(safe-area-inset-right));
		padding-bottom: env(safe-area-inset-bottom);
		padding-left: calc(var(--box-padding) + env(safe-area-inset-left));
	}
	
	#DigitalOcean {
		background-image: url(~@/static/img/do_logo.png);
		width: 163.92px;
		height: 28px;
		background-size: 163.92px 28px;
		background-repeat: no-repeat;
	}
</style>
<style scoped>

</style>