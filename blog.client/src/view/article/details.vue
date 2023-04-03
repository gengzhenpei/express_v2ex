<template>
	<div id="Main">
		<div class="sep20"></div>
		<div class="box">
			<div class="header">
				<div class="fr">
					<a href="/member/gracechen"><img src="https://cdn.v2ex.com/avatar/42b6/1e2c/12305_xlarge.png?m=1673353113" class="avatar" border="0" align="default" width="73" style="width: 73px; max-height: 73px;" alt="gracechen"></a>
				</div>
				<a href="/">V2EX</a> <span class="chevron">&nbsp;›&nbsp;</span>
				<a href="/go/jobs">{{article.Category.name}}</a>
				<div class="sep10"></div>
				<h1>{{article.title}}</h1>
				<small class="gray">
						<a href="/member/gracechen" v-if="article.user_info">{{article.user_info.username}}</a> · 
						<span title="2023-01-10 20:53:21 +08:00">{{article.created_at}}</span> · 
						{{article.browse}} 次点击 &nbsp; 
					</small>
			</div>
			<div v-if="dateFormatDays(article.created_at)>30" class="outdated">这是一个创建于 {{dateFormatDays(article.created_at)}} 天前的主题，其中的信息可能已经有所发展或是发生改变。</div>
			<!--评论-->
			<div class="cell">
				<div v-html="article.content" class="topic_content">
				</div>
			</div>
			<div class="topic_buttons">
				<div class="">
					<a href="/favorite/topic/908016?once=44572" class="tb">加入收藏</a> &nbsp;
					<a href="#;" onclick="window.open('https://twitter.com/share?url=https://www.v2ex.com/t/908016?r=gengzhenpei&amp;related=v2ex&amp;hashtags=jobs&amp;text=👋🏻美国 AR 社交平台，超精英团队招全栈/Unity 工程师、产品经理、测试等人才', '_blank', 'width=550,height=370'); recordOutboundLink(this, 'Share', 'twitter.com');" class="tb">Tweet</a> &nbsp;
					<a href="#;" onclick="if (confirm('确定不想再看到这个主题？')) { location.href = '/ignore/topic/908016?once=44572'; }" class="tb">忽略主题</a> &nbsp;
					<div id="topic_thank">
						<a href="#;" onclick="if (confirm('你确定要向本主题创建者发送谢意？')) { thankTopic(908016, '44572'); }" class="tb">感谢</a>
					</div>
				</div>
				<div class="fr topic_stats" style="padding-top: 4px;">8526 次点击 &nbsp;∙&nbsp; 14 人收藏 &nbsp; </div>
			</div>

		</div>
		<div class="sep20"></div>
		<div class="box">
			<div class="cell">
				<span class="gray">{{comment_total}}&nbsp;条回复 &nbsp;<strong class="snow">•</strong> &nbsp;
					<span v-if="comment_list.length">{{comment_list[0].created_at}}</span>
				</span>
				<div class="fr" style="margin: -3px -5px 0px 0px;">
					<a href="/tag/Java" class="tag">
						<li class="fa fa-tag"></li> Java</a>
					<a href="/tag/架构" class="tag">
						<li class="fa fa-tag"></li> 架构</a>
					<a href="/tag/技术" class="tag">
						<li class="fa fa-tag"></li> 技术</a>
					<a href="/tag/大数据" class="tag">
						<li class="fa fa-tag"></li> 大数据</a>
				</div>
			</div>
			<div v-for="(item, index) in comment_list" :key="index" class="cell">
				<table cellpadding="0" cellspacing="0" border="0" width="100%">
					<tbody>
						<tr>
							<td width="48" valign="top" align="center"><img src="https://cdn.v2ex.com/avatar/bf97/05f1/44412_normal.png?m=1557909764" class="avatar" border="0" align="default" alt="tommyzhang"></td>
							<td width="10" valign="top"></td>
							<td width="auto" valign="top" align="left">
								<div class="fr">
									<div id="thank_area_12722527" class="thank_area">
										<a href="#;" onclick="if (confirm('确认要不再显示来自 @tommyzhang 的这条回复？')) { ignoreReply(12722527, '39705'); }" class="thank" style="color: #ccc;">隐藏</a> &nbsp; &nbsp;
										<a href="#;" onclick="if (confirm('确认花费 10 个铜币向 @tommyzhang 的这条回复发送感谢？')) { thankReply(12722527); }" class="thank">感谢回复者</a>
									</div> &nbsp;
									<a href="#;" onclick="replyOne('tommyzhang');">
										<img src="~@/static/img/reply_neue.png" align="absmiddle" border="0" alt="Reply" width="20">
									</a> &nbsp;&nbsp; <span class="no">1</span>
								</div>
								<div class="sep3"></div>
								<strong><a href="/member/tommyzhang" class="dark" v-if="item.User">{{item.User.name}}</a></strong> &nbsp;
								<div class="badges"></div>&nbsp; &nbsp;<span class="ago" :title="item.created_at">{{dateFormat(item.created_at)}}</span>
								<div class="sep5"></div>
								<div class="reply_content">{{item.content}}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!--添加评论-->
		<div class="sep20"></div>
		<div class="box" id="reply-box">
			<div class="cell flex-one-row">
				<div>添加一条新回复</div>
				<div>
					<a href="javascript:undockReplyBox();" id="undock-button" style="display: none;">取消回复框停靠</a> &nbsp; &nbsp;
					<a href="#" onclick="goTop()">回到顶部</a>
				</div>
			</div>
			<div class="cell">
				<!--<form>-->
					<textarea v-model="form.content" name="content" maxlength="10000" class="mll" style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 112px;"></textarea>
					<div class="flex-one-row" style="margin-top: 10px;">
						<span @click="submitReply" value="回复" class="super normal button" style="width: 62px;">回复</span>
						<!--<input type="hidden" value="39705" id="once" name="once">-->
						<span class="gray">请尽量让自己的回复能够对别人有帮助</span>
					</div>
				<!--</form>-->
			</div>
			<div class="cell flex-row-end">
				<a href="/">← V2EX</a>
			</div>
		</div>
		<div class="sep20"></div>
	</div>

</template>

<script>
	import dateFormat from '../../common/dateFormat'
	import path from "../../common/navData.js"
	import {
		detail,
	} from '@/api/article.js'
	import {
		getComments,
		addComment,
	} from '@/api/comment.js'

	export default {
//		components: {
//			reA,
//			Vmenu
//		},
		data() {
			return {
				article: '',
				nav: path.currentPath,
				query: {
					is_user: 1,
					article_id: '',
				},
				form: {
					article_id: '',
					content: '',
				},
				comment_total: 0,
				comment_list: [],
			}
		},
		created() {
			if(this.$route.params.id) {
				this.form.article_id = this.$route.params.id
				this.query.article_id = this.$route.params.id
			}
			this.Detail()
			this.getCommentsFun();
			var index = {
				path: "",
				name: "index",
				title: "文章详情"
			}
			this.nav.push(index)
		},
		mounted() {},
		methods: {
			//提交评论
			async submitReply() {
				var self = this;
				console.log('llllllll')
				const {
					data,
					code,
					msg
				} = await addComment(this.form)
				if(code == 200) {
					this.form.content = '';
					this.getCommentsFun();
				}
			},
			//详情
			async Detail() {
				var self = this;
				const {
					data,
					code,
					msg
				} = await detail({id: this.$route.params.id})
				if(code == 200) {
					self.article = data;
					document.title = data.title || '404从你的全世界路过！';
					if(self.article.classify) {
						self.article.classify = data.classify.split(',')
					}
					self.article.create_time = dateFormat.dateFormat(data.create_time * 1000, 'yyyy-MM-dd hh:mm:ss')
				} else {
					console.log("服务器异常");
				}
			},
			// 获取文章下的评论列表
			async getCommentsFun() {
				var self = this;
				const {
					data,
					code,
					msg
				} = await getComments(this.query)
				if(code == 200) {
					self.comment_list = data
					self.comment_total = data.length
				} else {
					console.log("服务器异常");
				}
			},
		},

	}
</script>

<style type="text/css">
	.message {
		height: 44px;
		line-height: 44px;
		color: #bbb;
		border-bottom: 1px solid #dbdbdb;
	}
	/*.message span:nth-child(2) {
		float: right;
		font-size: 20px;
	}*/
	
	.book {
		font-size: 16px;
		margin-right: 5px;
	}
	
	.tag {
		display: flex;
		float: right;
		margin-top: -42px;
		margin-right: 5px;
	}
	
	.tag>li {
		opacity: .15;
	}
	/*编译器的样式修改*/
	
	.no-b {
		border: 0 !important;
	}
	
	.ql-container {
		font-size: 14px;
	}
	
	.ql-snow .ql-editor pre.ql-syntax {
		background-color: #EFEFEF;
		color: #4F4F4F;
	}
	
	.noDetails {
		height: 404px;
		line-height: 404px;
		font-size: 40px;
		margin-bottom: 20px;
		text-align: center;
		background: #fff;
	}
	
	.un404 {
		font-size: 80px;
		color: #ed3f14;
	}
	
	.fa {
		display: inline-block;
		font: normal normal normal 14px/1 FontAwesome;
		font-size: inherit;
		text-rendering: auto;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.fa-tag:before {
		content: "\f02b";
	}
	
	a:active,
	a:link,
	a:visited {
		color: var(--link-color);
		text-decoration: none;
		word-break: break-word;
	}
	
	.cell>table,
	.inner>table {
		table-layout: fixed;
	}
	
	.ago {
		font-size: 11px;
		color: var(--color-fade);
		cursor: pointer;
	}
	
	.reply_content {
		font-size: 14px;
		line-height: 1.6;
		color: var(--box-foreground-color);
		word-break: break-word;
	}
	
	.fr {
		float: right;
		text-align: right;
	}
	
	.badges {
		display: inline-flex;
		cursor: default;
	}
	
	.mll {
		border-radius: 3px;
		padding: 5px;
		font-size: 14px;
		border: 1px solid #ccc;
		display: block;
		width: 100%;
		height: 8em;
		overflow-y: auto;
		font-family: helvetica neue, luxi sans, Tahoma, hiragino sans gb, microsoft yahei, sans-serif, apple logo;
		resize: vertical;
		box-sizing: border-box;
	}
	
	.header {
		padding: 10px;
		font-size: 15px;
		line-height: 120%;
		text-align: left;
		border-bottom: 1px solid var(--box-border-color);
		overflow: auto;
	}
	
	.chevron {
		font-family: lucida grande;
		font-weight: 500;
	}
	
	.fa {
		display: inline-block;
		font: normal normal normal 14px/1 FontAwesome;
		font-size: inherit;
		text-rendering: auto;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.fa-chevron-up:before {
		content: "\f077";
	}
	
	.outdated {
		padding: 10px;
		font-size: 14px;
		line-height: 120%;
		text-align: left;
		background-color: var(--box-background-alt-color);
		border-left: 5px solid #f0f0f0;
		border-bottom: 1px solid var(--box-border-color);
		color: var(--color-gray);
	}
	
	
	
	a.tb:active,
	a.tb:link,
	a.tb:visited {
		font-size: 12px;
		line-height: 12px;
		color: #333;
		text-decoration: none;
		display: inline-block;
		padding: 3px 10px;
		border-radius: 15px;
		text-shadow: 0 1px 0 #fff;
	}
	
	#topic_thank {
		display: inline-block;
	}
</style>