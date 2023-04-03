<template>
	<div id="Main" class="">
		<div class="sep20"></div>
		<div class="box">
			<div class="header">
				<a href="/">V2EX</a> <span class="chevron">&nbsp;›&nbsp;</span>
				<a href="/settings">设置</a> <span class="chevron">&nbsp;›&nbsp;</span> 注册邮箱管理</div>
			<div class="inner">
				<form method="post" action="/settings/email?once=37991">
					<table cellpadding="5" cellspacing="0" border="0" width="100%">
						<tbody>
							<tr>
								<td width="120" align="right">当前注册邮箱</td>
								<td width="auto" align="left">gengzhenpei123@gmail.com</td>
							</tr>
							<tr>
								<td colspan="2"></td>
							</tr>
							<tr>
								<td width="120" align="right" valign="top"></td>
								<td width="auto" align="left"><span class="f14">如果你希望更改你的注册邮件地址，请在下方输入框中填入新的邮件地址。<br><br>然后我们会向此地址发送一封确认信，你需要在 8 小时内点击其中的链接，然后才能完成注册邮件地址更改。</span></td>
							</tr>
							<tr>
								<td colspan="2"></td>
							</tr>
							<tr>
								<td width="120" align="right">新邮箱</td>
								<td width="auto" align="left"><input type="email" class="sl" name="new_email" value="" maxlength="128" autocomplete="off" required="required"></td>
							</tr>
							<tr>
								<td width="120" align="right">账号密码</td>
								<td width="auto" align="left"><input type="password" class="sl" name="p" value="" autocomplete="new-password" autocorrect="off" required="required"></td>
							</tr>
							<tr>
								<td width="120" align="right"></td>
								<td width="auto" align="left"><input type="hidden" value="37991" name="once"><input type="submit" class="super normal button" value="更改邮箱"></td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
		<div class="sep20"></div>
	</div>
</template>
<script>
	import dateFormat from "../../common/dateFormat";
	import utils from "../../common/utils";
	import {
		getArticle,
	} from '@/api/article.js'
	import {
		getCategory,
	} from '@/api/category.js'
	export default {
		data() {
			return {
				articleList: [],
				category_list: [],
				query: {
					page: 1,
					page_size: 10,
					category_id: '',
					status: 1,
					keyword: '',
				},
				queryCategery: {
					page: 1,
					page_size: 10,
					id: '',
					status: 1,
					name: '',
				},
				cur_category_id: '',
			};
		},
		created() {
			this.getData();
			this.cur_category_id = this.$route.query.tab;
			if(this.cur_category_id) {
				this.query.category_id = this.cur_category_id;
			}
		},
		mounted() {
			document.title = "时刻点官网";

			this.nav = [];
			var index = {
				path: "/index",
				name: "index",
				title: "修改邮箱",
			};
			this.nav.push(index);
			//获取真实ip
			console.log(window.returnCitySN)
		},
		methods: {
			async getData() {
				await this.getCategoryFun()
				await this.getArticleFun()
			},
			async getCategoryFun() {
				const {
					code,
					error_code,
					data,
					msg
				} = await getCategory(this.queryCategery)
				if(code == 200) {
					this.category_list = data.data;
					if(!this.query.category_id) {
						this.cur_category_id = data.data[0].id;
						this.query.category_id = this.cur_category_id;
					}
				}
			},
			async getArticleFun() {
				const {
					code,
					error_code,
					data,
					msg
				} = await getArticle(this.query)
				if(code == 200) {
					this.articleList = data.data;
				}
			},
		},

	};
</script>

<style scoped>
	td {
		padding: 5px;
	}
	
	
</style>