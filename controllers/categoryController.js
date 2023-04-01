const Category = require('../models/category');
const Joi = require('joi');
const { Resolve } = require('../utils/helper');
const resolve = new Resolve();
// 定义用户输入数据的校验规则
const schema = Joi.object({
	name: Joi.string().required(),
	
});

// 查询所有，并同时查询出用户信息
exports.getAll = async (req, res) => {
	try {
		const categorys = await Category.findAll();
		res.json(resolve.json(categorys));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
};


exports.create = async (req, res) => {
	// 数据合法，可以将数据保存到数据库中
	try {
		const category = new Category(req.body);
		await category.save();
		res.status(201).json(category);
	} catch (error) {
		res.status(400).json({
			message: error.message
		});
	}
	// const { error, value } = schema.validate(req.body);
	// if (error) {
	// 	res.status(400).json({ error: error.details[0].message });
	// } else {
	// 	// 数据合法，可以将数据保存到数据库中
	// 	try {
	// 		const category = new Category(req.body);
	// 		await category.save();
	// 		res.status(201).json(category);
	// 	} catch (error) {
	// 		res.status(400).json({
	// 			message: error.message
	// 		});
	// 	}
	// }

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