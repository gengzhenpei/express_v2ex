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

/**
 * 类别详情
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getCategory = async (req, res) => {
	try {
		const category = await Category.findOne({
			where: {
				id: req.body.id
			}
		});
		if (!category) {
			return res.status(404).json({
				message: 'User not found'
			});
		}
		res.json(resolve.json(category));
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
};