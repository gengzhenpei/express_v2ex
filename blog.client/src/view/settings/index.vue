<template>
	<div id="Main" class="">
		<div class="sep20"></div>
		<div class="box">
			<div class="cell page-content-header">
				<img src="~@/static/img/2020/settings.png?v=ce554615c69cf1a975eae93bd9bccf63" width="64" height="64" alt="Settings">
				<h2>设置</h2>
			</div>
			<div class="cell">
				<a href="/settings/profile" class="tab_current">个人主页</a>
				<a href="/settings/social" class="tab">社交网络</a>
				<a href="/settings/avatar" class="tab">头像</a>
				<a href="/settings/password" class="tab">密码</a>
				<a href="/settings/tokens" class="tab">Tokens</a>
				<a href="/settings/2fa" class="tab">2FA</a>
				<a href="/settings/block" class="tab">屏蔽</a>
				<a href="/settings/privacy" class="tab">隐私</a>
			</div>
			<div class="inner">
				<form method="post" action="/settings">
					<table cellpadding="5" cellspacing="0" border="0" width="100%">
						<tbody>
							<tr>
								<td width="160" align="right"><img src="https://cdn.v2ex.com/avatar/54c4/4164/526939_normal.png?m=1677058193" class="avatar" border="0" align="default" width="24" style="width: 24px; max-height: 24px;" alt="gengzhenpei"></td>
								<td width="auto" align="left">V2EX 第 526939 号会员</td>
							</tr>
							<tr>
								<td width="120" align="right">用户名</td>
								<td width="auto" align="left">gengzhenpei </td>
							</tr>
							<tr>
								<td width="120" align="right">电子邮件</td>
								<td width="auto" align="left"><code>gengzhenpei123@gmail.com</code></td>
							</tr>
							<tr>
								<td width="120" align="right"></td>
								<td width="auto" align="left">
									<a href="/settings/email">更改注册邮箱</a>
								</td>
							</tr>
							<tr>
								<td width="120" align="right">电子邮件地址验证</td>
								<td width="auto" align="left"><span class="green">已在 2021-01-05 14:02:44 +08:00 完成验证</span></td>
							</tr>
							<tr>
								<td width="120" align="right">个人网站</td>
								<td width="auto" align="left"><input type="text" class="sl" name="website" value="" autocomplete="off"></td>
							</tr>
							<tr>
								<td width="120" align="right">所在公司</td>
								<td width="auto" align="left"><input type="text" class="sl" name="company" value="" maxlength="32" autocomplete="off"></td>
							</tr>
							<tr>
								<td width="120" align="right">工作职位</td>
								<td width="auto" align="left"><input type="text" class="sl" name="company_title" value="" maxlength="32" autocomplete="off"></td>
							</tr>
							<tr>
								<td width="120" align="right">所在地</td>
								<td width="auto" align="left"><input type="text" class="sl" name="location" value="" autocomplete="off"></td>
							</tr>
							<tr>
								<td width="120" align="right">签名</td>
								<td width="auto" align="left"><input type="text" class="sl" name="tagline" value="" autocomplete="off"></td>
							</tr>
							<tr>
								<td width="120" align="right">个人简介</td>
								<td width="auto" align="left"><textarea class="ml" name="bio"></textarea></td>
							</tr>
							<tr>
								<td width="120" align="right">状态更新查看权限</td>
								<td width="auto" align="left">
									<select name="who_can_view_my_t">
										<option value="0" selected="selected">所有人</option>
										<option value="1">已登录用户</option>
										<option value="2">只有我自己</option>
									</select>
								</td>
							</tr>
							<tr>
								<td width="120" align="right">社区财富排行榜</td>
								<td width="auto" align="left">
									<select name="list_rich">
										<option value="1">参与</option>
										<option value="0" selected="selected">不参与</option>
									</select>&nbsp; &nbsp;
									<a href="/top/rich" target="_blank">查看当前排行榜 ›</a>
								</td>
							</tr>
							<tr>
								<td width="120" align="right"></td>
								<td width="auto" align="left"><span class="gray">参与此排行榜将会公开你的个人资产状况。默认是不参与的。</span></td>
							</tr>
							<tr>
								<td width="120" align="right">显示余额</td>
								<td width="auto" align="left">
									<div class="flex-one-row">
										<div class="onoffswitch"><input type="checkbox" name="member_show_balance" id="member_show_balance" checked=""><label for="member_show_balance"><div class="frame"></div><div class="switch"></div></label></div>
										<a href="/balance" target="_blank">查看我的当前余额 ›</a>
									</div>
								</td>
							</tr>

							<tr>
								<td width="120" align="right">显示首页节点导航</td>
								<td width="auto" align="left">
									<div class="onoffswitch"><input type="checkbox" name="member_show_home_categories" id="member_show_home_categories" checked=""><label for="member_show_home_categories"><div class="frame"></div><div class="switch"></div></label></div>
								</td>
							</tr>
							<tr>
								<td width="120" align="right">节点图标作为 favicon</td>
								<td width="auto" align="left">
									<div class="onoffswitch"><input type="checkbox" name="member_node_avatar_as_favicon" id="member_node_avatar_as_favicon"><label for="member_node_avatar_as_favicon"><div class="frame"></div><div class="switch"></div></label></div>
								</td>
							</tr>
							<tr>
								<td width="120" align="right">使用高精度头像</td>
								<td width="auto" align="left">
									<div class="onoffswitch"><input type="checkbox" name="member_show_hi_dpi" id="member_show_hi_dpi"><label for="member_show_hi_dpi"><div class="frame"></div><div class="switch"></div></label></div>
								</td>
							</tr>
							<tr>
								<td width="120" align="right">在首页显示收藏节点</td>
								<td width="auto" align="left">
									<div class="onoffswitch"><input type="checkbox" name="member_show_my_nodes" id="member_show_my_nodes" checked=""><label for="member_show_my_nodes"><div class="frame"></div><div class="switch"></div></label></div>
								</td>
							</tr>
							<tr>
								<td width="120" align="right">自定义首页跳转</td>
								<td width="auto" align="left"><input type="text" class="sl" name="my_home" value="" autocomplete="off"></td>
							</tr>
							<tr>
								<td width="120" align="right">使用自定义 CSS</td>
								<td width="auto" align="left">
									<div class="onoffswitch"><input type="checkbox" name="member_use_my_css" id="member_use_my_css"><label for="member_use_my_css"><div class="frame"></div><div class="switch"></div></label></div>
								</td>
							</tr>
							<tr>
								<td width="120" align="right">自定义 CSS</td>
								<td width="auto" align="left"><textarea class="ml" name="my_css"></textarea></td>
							</tr>
							<tr>
								<td width="120" align="right">正文英文字体</td>
								<td width="auto" align="left">
									<select name="font" id="fonts" style="width: 322px;" data-select2-id="select2-data-fonts" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true">
										<option value="Avenir">Avenir</option>
										<option value="Avenir Next">Avenir Next</option>
									</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-3-ylrq" style="width: 322px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-fonts-container" aria-controls="select2-fonts-container"><span class="select2-selection__rendered" id="select2-fonts-container" role="textbox" aria-readonly="true" title="Helvetica Neue">Helvetica Neue</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span>
									</span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
								</td>
							</tr>
							<tr>
								<td width="120" align="right">时区</td>
								<td width="auto" align="left">
									<select name="timezone" id="timezones" style="width: 322px;" data-select2-id="select2-data-timezones" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true">
										<option value="Africa/Abidjan">Africa/Abidjan</option>
										<option value="Africa/Accra">Africa/Accra</option>
									</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-1-02dy" style="width: 322px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-timezones-container" aria-controls="select2-timezones-container"><span class="select2-selection__rendered" id="select2-timezones-container" role="textbox" aria-readonly="true" title="Asia/Shanghai">Asia/Shanghai</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span>
									</span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
								</td>
							</tr>
							<tr>
								<td width="120" align="right"></td>
								<td width="auto" align="left"><input type="hidden" value="1" name="show_ads"><input type="hidden" value="94585" name="once"><input type="submit" class="super normal button" value="保存设置"></td>
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
	
	.cell.page-content-header {
		display: flex;
		align-items: center;
	}
	
	.cell.page-content-header>img {
		width: 64px;
		height: 64px;
		margin: 0 10px 0 0;
	}
	
	.cell.page-content-header>:last-child {
		margin: 0;
		padding: 0;
		flex: 1 1 100%;
	}
	
	.cell.page-content-header h2 {
		margin: 0;
		font-weight: 400;
		font-size: 16px;
		border: none;
	}
	
	.onoffswitch {
		position: relative;
		width: 120px;
		min-width: 90px;
		max-width: 120px;
		user-select: none;
	}
	
	.onoffswitch input[type=checkbox] {
		display: none;
	}
	
	.onoffswitch label {
		display: block;
		overflow: hidden;
		cursor: pointer;
		border-radius: 20px;
	}
	
	.onoffswitch label .frame {
		width: 200%;
		margin-left: -100%;
		transition: margin .15s ease-in 0s;
	}
	
	.onoffswitch input[type=checkbox]:checked+label .frame {
		margin-left: 0;
	}
	
	.onoffswitch label .frame:before {
		content: "ON";
		padding-left: 16px;
		background-color: #68c944;
		color: #fff;
	}
	
	.onoffswitch label .frame:after,
	.onoffswitch label .frame:before {
		box-sizing: border-box;
		float: left;
		width: 50%;
		height: 30px;
		padding: 0;
		line-height: 30px;
		font-size: 14px;
		color: #fff;
		font-family: Trebuchet, Arial, sans-serif;
		font-weight: 700;
	}
	
	.onoffswitch label .frame:after {
		content: "OFF";
		padding-right: 16px;
		background-color: #e0e0e0;
		color: #999;
		text-align: right;
	}
	
	.onoffswitch label .frame:after,
	.onoffswitch label .frame:before {
		box-sizing: border-box;
		float: left;
		width: 50%;
		height: 30px;
		padding: 0;
		line-height: 30px;
		font-size: 14px;
		color: #fff;
		font-family: Trebuchet, Arial, sans-serif;
		font-weight: 700;
	}
	
	.onoffswitch input[type=checkbox]:checked+label .switch {
		left: calc(100% - 32px);
	}
	
	.onoffswitch label .switch {
		width: 18px;
		margin: 6px;
		background: #fff;
		border-radius: 20px;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		transition: all .15s ease-in 0s;
	}
</style>