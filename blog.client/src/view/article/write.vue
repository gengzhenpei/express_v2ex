<template>
	<div id="Main">
		<div class="sep20"></div>
		<div class="box" id="box">
			<div class="cell flex-one-row">
				<div class="breadcrumb">
					<a href="/">V2EX</a><span class="chevron">›</span><span>创作新主题</span>
				</div>
				<div>
					<div class="fade" id="content_remaining">19995</div>
				</div>
			</div>
			<form id="compose">
				<div class="cell" style="padding: 0;">
					<textarea v-model="form.title" class="new-title-input" tabindex="1" rows="1" maxlength="120" id="topic_title" name="title" autofocus="autofocus" placeholder="请输入主题标题，如果标题能够表达完整内容，则正文可以为空" style="font-size: 16px; line-height: 100%; overflow: hidden; overflow-wrap: break-word; height: 36px;"></textarea>
				</div>
				<div class="cell flex-one-row" style="padding-bottom: 0; padding-top: 0;">
					<div class="tab-alt-container flex-one-row">
						<a class="tab-alt active" href="javascript:continueToWrite()" id="tab-write">正文</a>
						<a class="tab-alt" href="javascript:previewInPage()" id="tab-preview">预览</a>
					</div>
					<div id="syntax-selector">
						<div id="syntax-label">Syntax</div>
						<div class="radio-group">
							<input type="radio" id="syntax-default" name="syntax" value="default"><label for="syntax-default">V2EX 原生格式</label>
							<input type="radio" id="syntax-markdown" name="syntax" value="markdown" checked=""><label for="syntax-markdown">Markdown</label>
						</div>
						<div id="syntax-help">
							&nbsp;
							<a href="/help/markdown" target="_blank"><i class="fa fa-info-circle"></i></a>
						</div>
					</div>
				</div>
				<div class="cell" id="preview" style="display: none;">
					<div class="topic_content markdown_body">
						<p>发的啥地方</p>
					</div>
				</div>
				<textarea v-model="content" style="" row="10" maxlength="20000" id="editor" name="content"></textarea>
				<!--<div id="workspace" style="height: 200px;">
					<div class="editor"></div>
				</div>-->
				<div class="cell" style="display: flex; align-items: center;">
					<div style="margin-right: 5px;">主题节点</div>
					<div class="">
						<el-cascader v-model="form.category_id" :options="cascade_category"  :props="{'value': 'id', label: 'name'}" size="mini"></el-cascader>
					</div>
					<div style="margin-left: auto;">
						<a href="/help/node" target="_blank">V2EX 节点使用说明</a> <i class="fa fa-external-link gray"></i>
					</div>
				</div>
				<!--<input type="hidden" name="content" value="" id="topic_content">
				<input type="hidden" name="once" id="once" value="75751">-->
			</form>
			<div class="cell flex-one-row">
				<button @click="publishTopic()" type="button" class="super normal button">
			<li class="fa fa-paper-plane"></li> &nbsp;发布主题
		</button>
				<span id="error_message"></span>
			</div>
		</div>
		<div class="sep20"></div>
	</div>

</template>

<script>
	import Quill from 'quill'
	import 'quill/dist/quill.snow.css'
	import {
		addArticle,
	} from '@/api/article.js'
	import {
		getCategory,
	} from '@/api/category.js'
	export default {
		data() {
			return {
				content: "",
				classify: "",
				imgUrl: "",
				showContent: false,
				data2: [],
				summary: "", //摘要
				form: {
					title: "",
					email: "",
					classify: [],
					category_id: '',
				},
				ruleValidate: {
					title: [{
						required: true,
						message: "请填写标题！",
						trigger: "blur",
					}, ],
					category_id: [{
						required: true,
						message: "请选择类型！",
						trigger: "change",
					}, ],
				},
				category_list: [],
				cascade_category: [],
			};
		},
		mounted() {
			var self = this;
		},
		created() {
			let category_id = this.$route.query.node;
			console.log('category_id', category_id)
			if(category_id) {
				this.form.category_id = category_id
			}
			this.getCategory();
		},
		methods: {
			async addArticleFun() {
				console.log('this.form.category_id', this.form.category_id)
				const {
					data,
					code,
					msg
				} = await addArticle({
					title: this.form.title,
					content: this.content,
					category_id: this.form.category_id || 1,
				})
				if(code == 200) {
					var url = "/article/" + data.id;
					this.$router.push(url);
					this.$Notice.success({
						title: "添加文章成功",
						desc: "感谢你的支持",
					});
				} else {
					console.log("服务器异常");
				}
			},
			//类别列表
			async getCategory() {
				const {
					data,
					code,
					msg
				} = await getCategory()
				if(code == 200) {
					this.category_list = data
					data.forEach(item => {
						if(item.parent_id == 0) {
							this.cascade_category.push(item);
						}
					})
					this.cascade_category.forEach(item => {
						item.children = []
						data.forEach(i => {
							if(item.id == i.parent_id) {
								item.children.push(i);
							}
						})
						if(!item.children.length){
							item.children = null;
						}
					})
					console.log('cascade_category', this.cascade_category)
				}
			},
			handleSuccess(res, file) {
				this.$Message.success("file");
				this.imgUrl = res.realName;
				var url = api.IMGURL + res.realName;
				this.editor.focus();
				this.editor.insertEmbed(this.editor.getSelection().index, "image", url);
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: "文件格式错误",
					desc: "你的" + file.name + "请你选择 jpg ， png，jpeg",
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: "文件过大",
					desc: "文件  " + file.name + " 上传文件小于 2M.",
				});
			},
			getContent() {
				this.showContent = true;
			},
			publishTopic(name) {
				this.addArticleFun()
			},
			oneSelect() {
				console.log('form.category_id', this.form.category_id)
				if(this.first_select_value) {
					this.two_select_show = true;
				}
			}
		},

	};
</script>

<style scoped>
	@import '../../static/css/codemirror.css';
	.new-title-input {
		width: 100%;
		border: none;
		resize: none;
		background-color: var(--box-background-alt-color);
		outline: 0;
		font-size: 14px;
		line-height: 20px;
		padding: 10px;
		font-family: helvetica neue, hiragino sans gb, microsoft yahei, sans-serif, apple logo;
		margin: 0;
		box-sizing: border-box;
		display: block;
	}
	
	.tab-alt {
		display: block;
		line-height: 100%;
		color: var(--link-color);
		padding: 10px;
		border-bottom: 3px solid transparent;
		text-decoration: none;
		transition: border-color .3s;
	}
	
	.tab-alt.active {
		border-color: var(--box-foreground-color);
	}
	
	#syntax-selector {
		display: inline-flex;
		align-items: center;
	}
	
	#syntax-label {
		font-size: 14px;
		line-height: 100%;
		vertical-align: bottom;
		margin-right: 10px;
	}
	
	.radio-group {
		background-color: #e2e2e2;
		border-radius: 4px;
		padding: 2px;
		font-size: 14px;
		line-height: 100%;
		box-shadow: 0 1px 2px rgba(0, 0, 0, .1) inset;
		display: inline-flex;
	}
	
	.radio-group>input[type=radio] {
		visibility: hidden;
		position: fixed;
		opacity: 0;
		pointer-events: none;
	}
	
	.radio-group>input[type=radio]+label {
		padding: 5px 14px;
		border-radius: 3px;
		box-sizing: border-box;
		line-height: 100%;
		font-size: 14px;
		transition: .25s ease;
	}
	
	.radio-group>input[type=radio]:checked+label {
		background-color: #fff;
		box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
	}
	
	#preview {
		box-sizing: border-box;
		min-height: 301px;
	}
	
	.markdown_body>:last-child,
	.note>:last-child,
	.page>:last-child,
	.problem>:last-child {
		margin-bottom: 0!important;
	}
	
	#workspace {
		text-align: left;
		border-bottom: 1px solid #e2e2e2;
		font-size: 14px;
		line-height: 120%;
		/*min-height: 300px;*/
		height: 200px;
	}
	
	#editor {
		position: relative;
		width: 100%;
		height: 200px;
		font-size: 16px;
		line-height: 130%;
	}
	
	#nodes {
		width: 320px;
		font-size: 14px;
	}
	
	.fa-paper-plane:before,
	.fa-send:before {
		content: "\f1d8";
	}
</style>
<style type="text/css">
	.ql-snow.ql-toolbar:after,
	.ql-snow .ql-toolbar:after {
		clear: both;
		content: '';
		display: none;
	}
</style>