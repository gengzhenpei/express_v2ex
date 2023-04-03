<template>
	<div style="height: 100%;">
		<div class="wrapperc" id="feedbacks">
			<div class="content pc">
				<div class="title" id="main_title">
					用户注册
				</div>
				<div class="dividing"></div>
				<img src="../../assets/images/icon-big-success.png" alt="" class="icon" id="icon" style="width: 96px">
				<div class="success" id="success">激活成功</div>
				<div class="success2" id="success2"></div>
				<div class="btn-group">
					<a href="/" id="leftbtn">返回主页</a>
					<!--<a href="{% url 'newsampleowner' %}" id="rightbtn">{% trans '新建检测人'%}</a>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		emailActive
	} from '@/api/login.js'

	export default {
		name: 'Layouts',
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				email_form: {
					username: '',
					password: '',
				},
				phone_form: {
					phone: '',
					code: '',
				},
				oldLayout: '',
				banners: [],
				phoneLogin: false,
				checked: false,
				token: ''
			}
		},
		created() {
			this.token = this.$route.query.token
			this.emailActiveFun();
		},
		methods: {
			//激活
			async emailActiveFun() {
				const {
					data,
					code
				} = await emailActive({
					token: this.token
				})
				if(code == 200) {
					//将用户信息和token存storage里
					//{"data": {"id": 172, "last_login": null, "is_superuser": false, "username": "hb_dc_lo7alqqu", "first_name": "", "last_name": "", "email": "928022763@qq.com", "is_staff": false, "date_joined": "2022-12-29T08:09:57.333Z", "user_site_region": "hb", "phone": "", "center_page": "YTREE", "default_owner_id": null, "profile": "media/images/defaults/LO.png", "is_locked": false, "nodes_per_page": 50, "show_private_infos": false, "show_first_name": true, "token": "Ozs7Ojw5Ly0vOj08OTg7OjgyPC8tLzo9PD8yPDI8Mjw="}, "message": "\u6210\u529f", "code": 200}
					localStorage.setItem("userInfo", JSON.stringify(data))
					localStorage.setItem("token", data.token)
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.wrapperc {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		display: flex;
		justify-content: center;
		.content.pc {
			width: 1020px;
			height: 590px;
			padding: 40px 0 40px;
			margin: 8px 0 8px;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: white;
			.dividing {
				height: 2px;
				background-color: #f7f7f7;
				width: 100%;
			}
			.title {
				font-size: 20px;
				margin-bottom: 24px;
			}
			.icon {
				margin: 48px 0 32px;
			}
			.success {
				margin-bottom: 64px;
				font-size: 20px;
			}
			.success2 {
				margin-bottom: 64px;
				font-size: 16px;
			}
			.btn-group {
				width: 100%;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				a {
					display: flex;
					align-items: center;
					justify-content: center;
					text-decoration: none;
				}
				#rightbtn {
					margin: 15px 15px;
					width: 220px;
					height: 36px;
					color: white;
					background: #4790DF;
					border: #4790DF 1px solid;
				}
				#leftbtn {
					margin: 15px 15px;
					width: 220px;
					height: 36px;
					color: #4790DF;
					background: white;
					border: #4790DF 1px solid;
				}
			}
		}
	}
	
	.content.mobile {
		width: 100%;
		height: 400px;
		padding: 15px 15px 40px;
		margin: 8px 0 8px;
		display: flex;
		gap: 24px;
		flex-direction: column;
		align-items: center;
		background: white;
		height: calc(100vh - 46px - 15px);
		.dividing {
			min-height: 2px;
			background-color: #f7f7f7;
			width: 100%;
		}
		.title {
			font-size: 20px;
			margin-bottom: 24px;
		}
		.icon {
			margin: 48px 0 32px;
		}
		.success {
			margin-bottom: 64px;
			font-size: 20px;
		}
		.btn-group {
			width: 100%;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			gap: 15px;
			a {
				display: flex;
				align-items: center;
				justify-content: center;
				text-decoration: none;
			}
			#rightbtn {
				width: 165px;
				height: 36px;
				color: white;
				background: #4790DF;
				border: #4790DF 1px solid;
			}
			#leftbtn {
				width: 165px;
				height: 36px;
				color: #4790DF;
				background: white;
				border: #4790DF 1px solid;
			}
		}
	}
</style>