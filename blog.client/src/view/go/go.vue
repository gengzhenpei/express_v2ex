<template>
	<div id="Main" class="">
		<div class="sep20"></div>
		<!--头部-->
		<div class="box box-title node-header">
			<div class="cell page-content-header">
				<img src="https://cdn.v2ex.com/navatar/c74d/97b0/16_xlarge.png?m=1650127281" border="0" align="default" width="64" alt="share">
				<div>
					<div class="title">
						<div class="node-breadcrumb">
							<a href="/">V2EX</a> <span class="chevron">&nbsp;›&nbsp;</span> {{category_detail.name}}</div>
						<span class="topic-count">主题总数 <strong>{{meta.total}}</strong></span>
					</div>
					<div class="intro">{{category_detail.subtitle}}</div>
				</div>
			</div>
			<div class="cell_ops flex-one-row">
				<input type="button" class="super normal button" value="创建新主题" @click="openPage('/write?node='+query.category_id)">
				<div>
					<a href="/favorite/node/16?once=13367">
						加入收藏
					</a>
				</div>
			</div>
		</div>
		<!--内容-->
		<div class="box">
			<!--分页-->
			<div class="cell">
				<table cellpadding="0" cellspacing="0" border="0" width="100%">
					<tbody>
						<tr>
							<td width="92%" align="left">
								<template v-if="meta.total_pages<=10">
									<a v-for="(i,ind) in meta.total_pages" @click.prevent="pageClick(i)" :href="'/go/'+query.category_id+'?p='+i" :class="{'page_current': query.page==i}" class="page_normal">{{i}}</a>
								</template>
								<template v-else>
									<a v-for="(i,ind) in 9" @click.prevent="pageClick(i)" :href="'/go/'+query.category_id+'?p='+i" :class="{'page_current': query.page==i}" class="page_normal">{{i}}</a>
									<a :href="'/go/'+query.category_id+'?p=10'" class="page_normal">10</a><span class="fade"> ... </span>
									<a :href="'/go/'+query.category_id+'?p='+meta.total_pages" class="page_normal">{{meta.total_pages}}</a>
								</template>
								<!--<a href="/go/share?p=10" class="page_normal">10</a><span class="fade"> ... </span>
								<a href="/go/share?p=1901" class="page_normal">1901</a>-->
								<input v-model="page_input_value" @change="pageChange()" type="number" class="page_input" autocomplete="off" min="1" max="1901">
                    		</td>
							<td width="8%" align="right">
								<table cellpadding="0" cellspacing="0" border="0" width="100%">
									<tbody>
										<tr>
											<td width="50%" align="center" class="super normal button disable_now" style="display: table-cell; border-right: none; border-top-right-radius: 0px; border-bottom-right-radius: 0px;">❮</td>
											<td width="50%" align="center" class="super normal_page_right button" style="display: table-cell; border-top-left-radius: 0px; border-bottom-left-radius: 0px;" title="下一页">❯</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--列表-->
			<div v-for="(item, index) in articleList" class="cell item" style="">
				<table cellpadding="0" cellspacing="0" border="0" width="100%">
					<tbody>
						<tr>
							<td width="48" valign="top" align="center">
								<a href="/member/kekeyao">
									<img v-lazy="item.cover" class="avatar" border="0" align="default" width="48" style="width: 48px; max-height: 48px;" alt="kekeyao">
								</a>
							</td>
							<td width="10"></td>
							<td width="auto" valign="middle" style="width: 560px;">
								<span class="item_title"><a :href="'/article/'+item.id" class="topic-link">{{ item.title }}</a></span>
								<div class="sep5"></div>
								<span class="topic_info">
										<div class="votes"></div>
										<!--<a class="node" href="/go/create">分享创造</a> &nbsp;•&nbsp;--> 
										<strong><a v-if="item.User" href="/member/kekeyao">{{item.User.name}}</a></strong> 
										&nbsp;•&nbsp; <span :title="item.created_at">{{dateFormat(item.created_at)}}</span> &nbsp;•&nbsp; 最后回复来自
								<strong><a v-if="item.comments.length" href="/member/cnsdytedison">{{item.comments[0].User.name}}</a></strong>
								</span>
							</td>
							<td width="70" align="right" valign="middle">
								<a v-if="item.comments.length" href="/t/916550#reply35" class="count_livid">{{item.comments.length}}</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="sep20"></div>

	</div>
</template>
<script>
	import axios from "../../common/httpUtils";
	//	import api from "../../api/index";
	import CONSTS from "../../common/consts";
	import dateFormat from "../../common/dateFormat";
	import path from "../../common/navData.js";
	import utils from "../../common/utils";
	import {
		getArticle,
	} from '@/api/article.js'
	import {
		categoryDetail,
	} from '@/api/category.js'
	export default {
		components: {},
		data() {
			return {
				articleList: [],
				meta: {},
				nav: path.currentPath,
				query: {
					page: 1,
					page_size: 4,
					category_id: '',
					status: 1,
					keyword: '',
				},
				page_input_value: 1,
				category_detail: {},
			};
		},
		created() {
			//取类别参数
			let category_id = this.$route.params.category_id;
			if(category_id) {
				this.query.category_id = category_id;
			}
			console.log('category_id', category_id)
			this.getData();
			this.categoryDetailFun();
		},
		mounted() {
			this.nav = [];
			var index = {
				path: "/index",
				name: "index",
				title: "首页",
			};
			this.nav.push(index);
			//获取真实ip
		},
		methods: {
			async getData() {
				await this.getArticleFun()
			},
			//文章列表
			async getArticleFun() {
				const {
					code,
					error_code,
					data,
					msg
				} = await getArticle(this.query)
				if(code == 200) {
					this.articleList = data.data;
					this.meta = data.meta;
					this.query.page = data.meta.current_page
					
				}
			},
			//类别详情
			async categoryDetailFun() {
				const {
					code,
					error_code,
					data,
					msg
				} = await categoryDetail({id: this.query.category_id})
				if(code == 200) {
					this.category_detail = data;
				}
			},
			//点击分页
			pageClick(i) {
				this.query.page = i;
				this.getArticleFun();
			},
			openPage(path) {
				location.href = path;
			},
			//分页输入数字
			pageChange() {
				console.log('this.page_input_value', this.page_input_value)
				this.query.page = this.page_input_value
				this.getArticleFun()
			}
		},

	};
</script>

<style scoped>
	.box {
		background-color: var(--box-background-color);
		border-radius: var(--box-border-radius);
		box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
		border-bottom: 1px solid var(--box-border-color);
	}
	
	.box-title {
		margin-bottom: 20px;
	}
	
	.node-header>.page-content-header {
		background-color: #001D25;
	}
	
	.node-header>.page-content-header {
		background-color: #001d25;
		color: #fff;
		text-align: left;
		align-items: stretch;
		border-top-left-radius: var(--box-border-radius);
		border-top-right-radius: var(--box-border-radius);
	}
	
	.node-header>.page-content-header .title {
		display: flex;
		justify-content: space-between;
		margin: 0 0 10px;
	}
	
	.cell.page-content-header {
		display: flex;
		align-items: center;
	}
	
	.cell.page-content-header>:last-child {
		margin: 0;
		padding: 0;
		flex: 1 1 100%;
	}
	
	.node-breadcrumb {
		font-size: 15px;
	}
	
	.node-header>.page-content-header .topic-count {
		font-size: 12px;
		padding-right: 5px;
	}
	
	.cell.page-content-header>img {
		width: 64px;
		height: 64px;
		margin: 0 10px 0 0;
	}
	
	.node-header>.page-content-header a {
		color: #03C8FF;
	}
	
	.cell-translucent:last-child,
	.cell:last-child,
	.cell_ops:last-child {
		border-bottom: none;
		border-bottom-left-radius: var(--box-border-radius);
		border-bottom-right-radius: var(--box-border-radius);
	}
	
	.cell_ops {
		padding: 10px;
		font-size: 12px;
		line-height: 120%;
		text-align: left;
		border-bottom: 1px solid var(--box-border-color);
		background-color: #f9f9f9;
		box-shadow: 0 1px 2px rgba(0, 0, 0, .05) inset;
	}
	
	.article {
		height: 200px;
		padding: 20px;
		margin-bottom: 16px;
		overflow: hidden;
	}
	
	.articleLeft {
		width: 210px;
		height: 160px;
		float: left;
		margin-right: 10px;
		overflow: hidden;
	}
	/*添加a标签鼠标经过方法效果*/
	
	.article a img {
		width: 100%;
		height: 160px;
		transition: all 500ms linear;
	}
	
	.article a:hover img {
		-webkit-transition: scale(1.5, 1.5);
		-moz-transition: scale(1.5, 1.5);
		-ms-transition: scale(1.5, 1.5);
		-o-transition: scale(1.5, 1.5);
		transform: scale(1.5, 1.5);
	}
	
	.articleMain {
		height: 90%;
	}
	
	.articleConten {
		margin: 10px;
		line-height: 24px;
		height: 68%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.articleConten p {
		height: 100%;
	}
	
	.foot span {
		margin-right: 20px;
	}
	
	.wid80 {
		width: 80%;
		height: 182px;
	}
	
	.tag {
		display: flex;
		float: right;
		margin-top: -42px;
		margin-right: 5px;
	}
	
	.item {
		background-position: 0 bottom;
		background-repeat: repeat-x;
	}
	
	.cell {
		padding: 10px;
		font-size: 14px;
		line-height: 150%;
		text-align: left;
		border-bottom: 1px solid var(--box-border-color);
	}
	
	.item_title {
		font-size: 16px;
		line-height: 130%;
		word-break: break-word;
		line-break: strict;
	}
	
	a.topic-link:active,
	a.topic-link:link {
		color: var(--link-color);
		text-decoration: none;
		word-break: break-word;
	}
	
	.sep5 {
		height: 5px;
	}
	
	.topic_info {
		font-size: 12px;
		color: var(--color-fade);
		line-height: 200%;
	}
	
	.votes {
		display: inline-block;
	}
	
	a.node:active,
	a.node:link,
	a.node:visited {
		background-color: #f5f5f5;
		font-size: 12px;
		line-height: 12px;
		display: inline-block;
		padding: 4px;
		-moz-border-radius: 2px;
		-webkit-border-radius: 2px;
		border-radius: 2px;
		text-decoration: none;
		color: var(--color-gray);
	}
	
	a.count_livid:active,
	a.count_livid:link {
		line-height: 12px;
		font-weight: 700;
		color: #fff;
		background-color: #aab0c6;
		display: inline-block;
		padding: 2px 10px;
		-moz-border-radius: 12px;
		-webkit-border-radius: 12px;
		border-radius: 12px;
		text-decoration: none;
		margin-right: 5px;
		word-break: break-all;
	}
	
	.sep10 {
		height: 10px;
	}
	
	.bigger {
		font-size: 16px;
	}
	
	.sep3 {
		height: 3px;
	}
	
	.fade {
		color: var(--color-fade);
	}
	
	.member-activity-bar {
		width: 250px;
		background-color: #f0f0f0;
		height: 3px;
	}
	
	.member-activity-start {
		height: 3px;
		background-color: #ccc;
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
	
	a:active,
	a:link,
	a:visited {
		color: var(--link-color);
		text-decoration: none;
		word-break: break-word;
	}
	
	a.tab_current:active,
	a.tab_current:link,
	a.tab_current:visited {
		display: inline-block;
		font-size: 14px;
		line-height: 14px;
		padding: 5px 8px;
		margin-right: 5px;
		border-radius: 3px;
		background-color: #334;
		color: #fff;
	}
	
	#SecondaryTabs {
		background-color: var(--box-background-alt-color);
		padding: 10px 10px 10px 20px;
		display: flex;
		justify-content: space-between;
	}
</style>