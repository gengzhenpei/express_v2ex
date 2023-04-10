const User = require('../models/user');
const Post = require('../models/post');
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { Resolve } = require('../utils/helper');
const { createCaptcha } = require('../utils/util');
const { v4: uuidv4 } = require('uuid')
const { setString, getString } = require('../utils/redis')


const resolve = new Resolve();
// 生成秘钥/解密 需要的key
const secretKey = 'lihaichao'
// 定义用户输入数据的校验规则
const Schema = Joi.object({
	name: Joi.string().required(),
	password: Joi.string().required(),
	email: Joi.string().required().email()
});

//登录
exports.login = async (req, res) => {
	try {
		const { email, password, captcha, captcha_key } = req.body;
        let captcha_key_val = await getString(captcha_key)
        //过期
        if(!captcha_key_val) {
			res.json(resolve.fail('验证码过期'));
			return false;
        // 不区分大小写
        } else if(captcha.toLowerCase()!==captcha_key_val.toLowerCase()) {
			res.json(resolve.fail('验证码错误'));
			return false;
        }
		// 筛选方式
		let filter = {
			email: email
		};
		const user = await User.findOne({
			where: filter
		});
		if (!user) {
			return res.status(404).json({
				message: 'User not found'
			});
		}
		// 验证密码是否正确
		const correct = bcrypt.compareSync(password, user.password);
		if (!correct) {
			return res.json(resolve.failAuth('密码错误'));
		}
		const tokenStr = jwt.sign({id: user.id, name: user.name }, secretKey, { expiresIn: '30h' })
		const data = {
			user: user,
			token: tokenStr
		}

		return res.json(resolve.json(data));
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
};


// 查询所有文章，并同时查询出文章所属的用户信息
exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ['id', 'name', 'email']
				}
			]
		});
		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
};


exports.createUser = async (req, res) => {
	const { error, value } = Schema.validate(req.body);
	if (error) {
		res.status(400).json({ error: error.details[0].message });
	} else {
		// 数据合法，可以将数据保存到数据库中
		try {
			const user = new User(req.body);
			await user.save();
			res.status(201).json(user);
		} catch (error) {
			res.status(400).json({
				message: error.message
			});
		}
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

// 获取图形验证码
exports.captcha = async (req, res) => {
	// 获取用户传递过来的唯一key
    const captchaKey = uuidv4();
    // 生成验证码
    const code = createCaptcha();
    // 存储在redis中 设置过期事件 过期取出来的值为null
    if (code.text) {
        await setString(captchaKey, code.text, 60 * 3);
        const a2 = await getString(captchaKey);
		res.json(resolve.json({ captcha: code.data, captchaKey: captchaKey }));
    } else {
		res.json(resolve.fail({ message: '生成图形码失败' }));
    }
};
