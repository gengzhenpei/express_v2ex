const User = require('../models/user');

exports.createUser = async (req, res) => {
	try {

		console.log('req.body', req.body)
		const user = new User(req.body);
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({
			message: error.message
		});
	}
};

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({
				message: 'User not found'
			});
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
};

exports.updateUser = async (req, res) => {
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

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({
				message: 'User not found'
			});
		}
		await user.remove();
		res.json({
			message: 'User deleted'
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