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
				<form method="post" enctype="multipart/form-data">
					<table cellpadding="5" cellspacing="0" border="0" width="100%">
						<tbody>
							<tr>
								<td width="120" align="right">当前头像</td>
								<td width="auto" align="left">
									<span>新的针对 Retina Display 优化的头像</span>
									<div class="avatar-list">
										<span class="gray">还没有上传任何针对 Retina Display 优化的头像</span>
									</div>
									<span>传统尺寸的头像</span>
									<div class="avatar-list">
										<img src="https://cdn.v2ex.com/avatar/54c4/4164/526939_large.png?m=1677058193" class="avatar" border="0" align="default" alt="gengzhenpei">
										<img src="https://cdn.v2ex.com/avatar/54c4/4164/526939_normal.png?m=1677058193" class="avatar" border="0" align="default" alt="gengzhenpei">
										<img src="https://cdn.v2ex.com/avatar/54c4/4164/526939_mini.png?m=1677058193" class="avatar" border="0" align="default" alt="gengzhenpei">
									</div>
									<a href="#" onclick="if (confirm('你确定要取消当前的头像？')) { location.href = '/settings/avatar/unset?once=18729' }">取消当前头像</a>
								</td>
							</tr>
							<tr>
								<td width="120" align="right">选择一个图片文件</td>
								<td width="auto" align="left"><input id="input_file" type="file" name="avatar"></td>
							</tr>
							<tr>
								<td width="120" align="right"></td>
								<td width="auto" align="left"><span class="gray">支持 2MB 以内的 PNG / JPEG / JPEG 2000 / GIF / WEBP / TIFF / BMP / ICNS / ICO / AVIF / HEIC / PSD / SVG 文件<br>
推荐使用一张 512x512 的 PNG 文件以获得最佳效果</span></td>
							</tr>
							<tr>
								<td width="120" align="right"></td>
								<td width="auto" align="left">
									<input type="hidden" value="18729" name="once">
									<input @click.prevent="uploadObs" type="submit" class="super normal button" value="开始上传">
								</td>
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
		setAvatar,
	} from '@/api/setting.js'
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
		},
		mounted() {
		},
		methods: {
			uploadObs() {
				let _file = document.getElementById('input_file').files[0];
				console.log("_file", _file)
				var formData = new FormData()
				formData.append('avatar', _file)
				this.setAvatarFun(formData);
			},
			async setAvatarFun(formData) {
				console.log('formData', formData)
				const {
					code,
					error_code,
					data,
					msg
				} = await setAvatar(formData)
				if(code == 200) {
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