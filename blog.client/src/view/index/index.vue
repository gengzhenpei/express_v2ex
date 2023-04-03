<template>
	<div id="Main" class="">
		<div class="sep20"></div>
		<div class="box">
			<div class="inner" id="Tabs">
				<a v-for="(item,index) in category_list_first" :key="index" :href="'/?tab='+item.id" :class="{'tab_current': query.category_id==item.id}" class="tab">{{item.name}}</a>
			</div>
			<div class="cell" id="SecondaryTabs">
				<div class="">
					<a v-for="(item, index) in category_list_second" :key="index" href="/go/all4all">{{item.name}}&nbsp; &nbsp;</a> 
				</div>
				<div class="fr">
					<a href="/new/free">我要送东西</a> &nbsp; &nbsp;
					<a href="/new/exchange">我要换东西</a> &nbsp; &nbsp;
					<a href="/new/all4all">我要出二手</a>
				</div>
			</div>
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
		getCategory,
	} from '@/api/category.js'
	export default {
		components: {},
		data() {
			return {
				articleList: [],
				all_category: [], 
				category_list_first: [], //一级菜单
				category_list_second: [], //二级
				
				//				imgUrl: api.IMGURL,
				nav: path.currentPath,
				query: {
					page: 1,
					page_size: 20,
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
			};
		},
		created() {
			this.getData();
			let cur_category_id = this.$route.query.tab;
			if(cur_category_id) {
				this.query.category_id = cur_category_id;
			}
		},
		mounted() {
			document.title = "时刻点官网";

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
				await this.getCategoryFun()
				await this.getArticleFun()
			},
			
			//类别
			async getCategoryFun() {
				const {
					code,
					error_code,
					data,
					msg
				} = await getCategory(this.queryCategery)
				if(code == 200) {
					this.all_category = data;
					//取一级菜单
					this.category_list_first = data.filter(item=>item.parent_id==0);
					
					console.log('this.category_list_first', this.category_list_first)
					if(!this.query.category_id) {
						let cur_category_id = this.category_list_first[0].id;
						console.log('this.query.category_id', this.query.category_id)
						//二级
						this.category_list_second = data.filter(item=>item.parent_id==cur_category_id);
					} else {
						this.category_list_second = data.filter(item=>item.parent_id==this.query.category_id);
					}
					console.log('this.category_list_second', this.category_list_second)
				}
			},
			async getArticleFun() {
				const {
					code,
					error_code,
					data,
					msg
				} = await getArticle(this.query)
				console.log('data', data)
				this.articleList = data.data;
				if(code == 200) {}
			},
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
	
	#Tabs {
		background-color: var(--box-background-color);
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
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
	/*.cell {
		padding: 10px;
		font-size: 14px;
		line-height: 150%;
		text-align: left;
		border-bottom: 1px solid var(--box-border-color);
	}*/
	
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