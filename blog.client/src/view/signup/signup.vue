<template>
	<div id="Main" class="">
		<div class="sep20"></div>
		<div class="box">
			<div class="header">
				<a href="/">V2EX</a> <span class="chevron">&nbsp;›&nbsp;</span> 注册新用户
			</div>
			<div class="cell">
				<div class="topic_content markdown_body">
					<p>欢迎来到 V2EX，这里是创意工作者的数字化公共空间。</p>
					<p>你可以通过以下方式注册成为新用户。</p>
					<p>如果你之前已经使用电子邮件注册，那么请从
						<a href="/signin">这里</a> 登入。</p>
				</div>
			</div>
			<div class="cell">
				<form>
					<table cellpadding="5" cellspacing="0" border="0" width="100%">
						<tbody>
							<tr>
								<td width="120" align="right">邮箱</td>
								<td width="auto" align="left">
									<input v-model="form.email" type="text" class="sl" autofocus="autofocus" autocorrect="off" spellcheck="false" autocapitalize="off" placeholder="电子邮件地址">
								</td>
							</tr>
							<tr>
								<td width="120" align="right">密码</td>
								<td width="auto" align="left">
									<input v-model="form.password" @keyup.enter="loginFun()" type="password" class="sl" autocorrect="off" spellcheck="false" autocapitalize="off">
								</td>
							</tr>
							<tr>
								<td width="120" align="right">确认密码</td>
								<td width="auto" align="left">
									<input v-model="form.password1" @keyup.enter="loginFun()" type="password" class="sl" autocorrect="off" spellcheck="false" autocapitalize="off">
								</td>
							</tr>
							<tr>
								<td width="120" align="right">用户名</td>
								<td width="auto" align="left">
									<input v-model="form.username" type="text" class="sl" autofocus="autofocus" autocorrect="off" spellcheck="false" autocapitalize="off" placeholder="用户名">
								</td>
							</tr>
							<tr>
								<td width="120" align="right"></td>
								<td width="auto" align="left">
									<div class="err_tips">{{err_msg}}</div>
									<input @click="registerFun()" class="super normal button" value="注册" style="width: 60px;">
								</td>
							</tr>
						</tbody>
					</table>
					<input type="hidden" value="https://www.v2ex.com/t/918655" name="next">
				</form>
			</div>
			<div class="dock_area">
				<div class="signup_methods">
					<div class="signup_method" onclick="location.href = '/auth/google?once=11539'">
						<div class="signup_method_icon signup_method_google"></div>
						<div class="signup_method_label">Continue with Google</div>
					</div>

				</div>
			</div>
		</div>
		<div class="sep20"></div>
	</div>
</template>
<script>
	import {
		register,
	} from '@/api/auth.js'
	export default {
		data() {
			return {
				cur_category_id: '',
				form: {
					email: '',
					password: '',
					password1: '', 
					password2: '', 
					username: '',
				},
				err_msg: '',
			};
		},
		created() {},
		mounted() {},
		methods: {
			//注册
			async registerFun() {
				this.form.password2 = this.form.password
				const {
					code,
					error_code,
					data,
					msg
				} = await register(this.form)
				if(code == 200) {
					alert("激活邮件已发送，请激活邮件完成注册");
					//					this.$router.push({
					//						path: '/login'
					//					})
				} else {
					console.log("服务器异常");
				}
			},
		},

	};
</script>

<style scoped>
	.signup_methods {
		display: flex;
		flex-direction: column;
		align-content: space-around;
		padding: 15px;
	}
	
	.signup_method {
		transition: box-shadow .4s ease, background-color .4s ease, color .4s ease;
		text-decoration: none;
		display: block;
		margin: 15px auto;
		padding: 10px;
		background-color: #fff;
		border-radius: 52px;
		min-width: 210px;
		line-height: 100%;
		display: flex;
		box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
	}
	
	.signup_method_google {
		background-image: url(~@/static/img/social_google.png);
		background-size: 32px 32px;
		background-repeat: no-repeat;
	}
	
	.signup_method_icon {
		background-color: transparent;
		display: inline-block;
		width: 32px;
		height: 32px;
	}
	
	.signup_method_label {
		font-size: 16px;
		height: 32px;
		line-height: 32px;
		padding-left: 0.8em;
		color: #000;
	}
	
	td {
		padding: 5px;
	}
</style>