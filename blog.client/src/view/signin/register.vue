<template>
	<div>
		<div class="signup-container">
			<div class="box">
				<div class="d-flex flex-column align-items-center">
					<div class="title mt24">注册</div>
					<div class="tab-content">
						<!--邮箱注册-->
						<template>
							<form ref="email_form" :model="email_form" label-width="80px" class="my_form">
								<p class="p_item">
									<label for="">邮箱: </label>
									<input v-model="email_form.email" placeholder="邮箱"></input>
								</p>
								<p class="p_item">
									<label for="">密码: </label>
									<input v-model="email_form.password1" placeholder="请输入密码"></input>
								</p>
								<p class="p_item">
									<label for="">密码: </label>
									<input v-model="email_form.password2" placeholder="请输入密码"></input>
								</p>
								<p class="p_item">
									<label for="">用户名: </label>
									<input v-model="email_form.username" placeholder="请输入用户名（可选）"></input>
								</p>
								<div type="primary" @click="registerFun()" class="w260">立即注册</div>
							</form>
						</template>
						<div>已有账号？
							<a href="/login" type="primary">登录</a>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		register,
	} from '@/api/auth.js'
	export default {
		data() {
			return {
				email_form: {
					captcha_id: '',
					email: '',
					password1: '',
					password2: '',

					name: '',
					captcha_code: '',
				},
				rules_email_form: {
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
				},
			}
		},
		created() {},
		methods: {
			//注册
			async registerFun() {
				const {
					code,
					error_code,
					data,
					msg
				} = await register(this.email_form)
				if(code == 200) {
					this.$router.push({
						path: '/login'
					})
				} else {
					console.log("服务器异常");
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.p_item {
		margin: 10px 0;
	}
</style>