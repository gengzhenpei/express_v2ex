const User = require('../models/user');
const Article = require('../models/article');
const Category = require('../models/category');
const Comment = require('../models/comment');
const { Resolve } = require('../utils/helper');
const resolve = new Resolve();
const Joi = require('joi');
// 定义数据的校验规则
const Schema = Joi.object({
	title: Joi.string().required(),
	content: Joi.string().required(),
	user_id: Joi.number().required().min(0),
	category_id: Joi.number().required().min(0),
});
//查询 分页
exports.ArticlesList = async (req, res) => {
	try {
		console.log('req.body', req.body)
		const { category_id, keyword, page_size = 10, status, page = 1 } = req.body;
		// 筛选方式
		let filter = {
		};
		// 筛选方式：存在分类ID
		if (category_id) {
			filter.category_id = category_id;
		}
		const articles = await Article.findAndCountAll({
			limit: Number(page_size), //每页10条
			offset: (page - 1) * Number(page_size),
			where: filter,
			order: [
				['created_at', 'desc']
			],
			include: [
				{
					model: User,
					attributes: ['id', 'name', 'email']
				},
				{
					model: Category,
					attributes: ['id', 'name']
				},
				{
					model: Comment,
					order: [['created_at', 'desc']],
					attributes: ['id', 'content'],
					include: [{
						model: User,
						attributes: ['id', 'name'],
					}]
				}
			]
		});
		const data = {
			data: articles.rows,
			// 分页
			meta: {
				current_page: parseInt(page),
				per_page: page_size,
				count: articles.count,
				total: articles.count,
				total_pages: Math.ceil(articles.count / page_size),
			}
		}
		// res.json(articles);
		res.json(resolve.json(data));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
};


// 查询所有文章，并同时查询出文章所属的用户信息
exports.getAllArticles = async (req, res) => {
	try {
		const articles = await Article.findAll({
			order: [['created_at', 'desc']],
			include: [
				{
					model: User,
					attributes: ['id', 'name', 'email']
				},
				{
					model: Category,
					attributes: ['id', 'name']
				},
				{
					model: Comment,
					order: [['created_at', 'desc']],
					attributes: ['id', 'content'],
					include: [{
						model: User,
						attributes: ['id', 'name'],
					}]
				}
			]
		});
		// res.json(articles);
		res.json(resolve.json(articles));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
};


exports.createArticle = async (req, res) => {
	req.body.user_id = req.auth.id;
	console.log('req.body', req.body)
	const { error, value } = Schema.validate(req.body);
	if (error) {
		res.status(400).json({ error: error.details[0].message });
	} else {
		try {

			const article = new Article(req.body);
			await article.save();
			res.json(resolve.json(article));
		} catch (error) {
			res.status(400).json({
				message: error.message
			});
		}
	}
};

exports.getArticles = async (req, res) => {
	try {
		const articles = await Article.find();
		res.json(articles);
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
};

exports.getArticle = async (req, res) => {
	try {
		const article = await Article.findOne({
			where: {
				id: req.body.id
			},
			include: [
				{
					model: Category,
					attributes: ['id', 'name']
				}
			]
		});
		if (!article) {
			return res.status(404).json({
				message: 'User not found'
			});
		}
		res.json(resolve.json(article));
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
};

exports.updatePost = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({
				message: 'User not found'
			});
		}
		Object.assign(user, req.body);
		await user.save();
		res.json(user);
	} catch (error) {
		res.status(400).json({
			message: error.message
		});
	}
};

exports.deletePost = async (req, res) => {
	try {
		const post = await Post.findOne({ where: { id: req.params.id } });
		if (!post) {
			return res.status(404).json({
				message: 'Post not found'
			});
		}
		await post.destroy();
		res.json({
			message: 'Post deleted'
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
};

/***
 * 在这个示例控制器中， 我们定义了五个操作函数：

createUser： 创建一个新用户， 并将其保存到数据库中。
getUsers： 获取所有用户数据。
getUser： 根据用户 ID 获取单个用户数据。
updateUser： 根据用户 ID 更新用户数据。
deleteUser： 根据用户 ID 删除用户数据。
这些操作函数都使用了 User 数据模型来操作数据库。 其中， createUser 和 updateUser 函数都使用了 req.body 对象来获取用户提交的数据， 并将其赋值给 user 对象， 然后调用 save() 方法保存到数据库中。 getUser 函数和 deleteUser 函数都使用了 req.params.id 来获取请求参数中的用户 ID， 然后调用 Mongoose 提供的方法进行查找或删除操作。

需要注意的是， 在这个示例控制器中， 我们还对出错的情况进行了处理， 并向客户端返回了适当的 HTTP 响应码和错误信息。 这样可以提高代码的健壮性和可靠性。
 */