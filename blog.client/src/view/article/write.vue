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
						<!--<a class="tab-alt active" href="javascript:continueToWrite()" id="tab-write">正文</a>
						<a class="tab-alt" href="javascript:previewInPage()" id="tab-preview">预览</a>-->
					</div>
					<div id="syntax-selector">
						<div id="syntax-label">Syntax</div>
						<div class="radio-group">
							<input v-model='edit_method' type="radio" id="syntax-default" name="syntax" :value="1"><label for="syntax-default">V2EX 原生格式</label>
							<input v-model='edit_method' type="radio" id="syntax-markdown" name="syntax" :value="2" checked=""><label for="syntax-markdown">Markdown</label>
						</div>
						<div id="syntax-help">
							&nbsp;
							<a href="/help/markdown" target="_blank"><i class="fa fa-info-circle"></i></a>
						</div>
					</div>
				</div>
				<template>
					<div class="example-wrap">
						<template v-if="edit_method==1">
							<!-- 新建日记 -->
							<div class="notes" style="height: 400px;">
								<quill-editor class="editor" ref="myTextEditor" v-model="content" :options="editorOption" style="height: 300px;">
								</quill-editor>
							</div>
						</template>
						<template v-if="edit_method==2">
							<mavonEditor :toolbars="markdownOption" @change="mavonChange" ref="md" />
						</template>
					</div>
				</template>
				<div class="cell" style="display: flex; align-items: center;">
					<div style="margin-right: 5px;">主题节点</div>
					<div class="">
						<el-cascader v-model="default_category" @change="cascaderHandler" :options="cascade_category" :props="{'value': 'id', label: 'name'}" size="mini"></el-cascader>
					</div>
					<div style="margin-left: auto;">
						<a href="/help/node" target="_blank">V2EX 节点使用说明</a> <i class="fa fa-external-link gray"></i>
					</div>
				</div>
			</form>
			<div class="cell flex-one-row">
				<button @click="publishTopic()" type="button" class="super normal button">&nbsp;发布主题</button>
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

	import VueMarkdown from 'vue-markdown'
	import { mavonEditor } from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	export default {
		// 2. 注册组件：在组件中注册 vue-markdown 组件，代码如下
		components: {
			mavonEditor
		},
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
				default_category: [],
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
				edit_method: 1, //v2ex 原生模式、2：markdown模式
				editorOption: {
					modules: {
						toolbar: [
							["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
							["blockquote", "code-block"], // 引用  代码块
							[{
								header: 1
							}, {
								header: 2
							}], // 1、2 级标题
							[{
								list: "ordered"
							}, {
								list: "bullet"
							}], // 有序、无序列表
							[{
								script: "sub"
							}, {
								script: "super"
							}], // 上标/下标
							[{
								indent: "-1"
							}, {
								indent: "+1"
							}], // 缩进
							// [{'direction': 'rtl'}],                         // 文本方向
							[{
								size: ["small", false, "large", "huge"]
							}], // 字体大小
							[{
								header: [1, 2, 3, 4, 5, 6, false]
							}], // 标题
							[{
								color: []
							}, {
								background: []
							}], // 字体颜色、字体背景颜色
							[{
								font: []
							}], // 字体种类
							[{
								align: []
							}], // 对齐方式
							["clean"], // 清除文本格式
							["link", "image", "video"] // 链接、图片、视频
						], //工具菜单栏配置
					},
					placeholder: '请在这里添加产品描述', //提示
					readyOnly: false, //是否只读
					theme: 'snow', //主题 snow/bubble
					syntax: true, //语法检测
				},
				markdownOption: {
					bold: true, // 粗体
					italic: true, // 斜体
					header: true, // 标题
					underline: true, // 下划线
					strikethrough: true, // 中划线
					mark: true, // 标记
					superscript: true, // 上角标
					subscript: true, // 下角标
					quote: true, // 引用
					ol: true, // 有序列表
					ul: true, // 无序列表
					link: true, // 链接
					imagelink: true, // 图片链接
					code: true, // code
					table: true, // 表格
					fullscreen: true, // 全屏编辑
					readmodel: true, // 沉浸式阅读
					htmlcode: true, // 展示html源码
					help: true, // 帮助
					/* 1.3.5 */
					undo: true, // 上一步
					redo: true, // 下一步
					trash: true, // 清空
					save: true, // 保存（触发events中的save事件）
					/* 1.4.2 */
					navigation: true, // 导航目录
					/* 2.1.8 */
					alignleft: true, // 左对齐
					aligncenter: true, // 居中
					alignright: true, // 右对齐
					/* 2.2.1 */
					subfield: true, // 单双栏模式
					preview: true, // 预览
				},

			};
		},
		async created() {
			await this.getCategory();
			let category_id = this.$route.query.node;
			if(category_id) {
				this.default_category.push(Number(category_id))
				this.form.category_id = Number(category_id)
				//取父节点
				this.category_list.forEach(item => {
					if(item.id == category_id) {
						if(item.parent_id) {
							let p_id = item.parent_id
							this.default_category.unshift(Number(p_id))
						}
					}
				})
			}
		},
		methods: {
			async addArticleFun() {
				const {
					data,
					code,
					msg,
					err
				} = await addArticle({
					title: this.form.title,
					content: this.content,
					category_id: this.form.category_id,
				})
				if(code == 200) {
					var url = "/article/" + data.id;
					this.$router.push(url);
					this.$Notice.success({
						title: "添加文章成功",
						desc: "感谢你的支持",
					});
				} else {
					this.$message.error(err);
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
						if(!item.children.length) {
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
			// 上传图片
			uploadImage(e) {
				console.log(e, e.name)
				//这儿写自己的上传方法，e是markdown返回给你的file对象
				const formData = new FormData()
				formData.append('file', e)
				axios({
					url: '上传图片的地址',
					method: 'post',
					data: formData,
				}).then(res => {
					console.log('res=>', res);
					// imgUrlAdd 有两个参数imgUrlAdd(url, name)
					this.$refs.MarkDown.imgUrlAdd('url: 这儿写url->res.url', e.name)
				}).catch(() => {})
			},
			getImgUrl(e) {
				// 获取到点击图片的url
			},
			cascaderHandler(selected_val) {
				this.form.category_id = selected_val[selected_val.length-1];
			},
			mavonChange() {
				this.content = this.$refs.md.d_render;
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