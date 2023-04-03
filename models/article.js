// article.js
const Sequelize = require('sequelize');
const sequelize = require('../database');
const moment = require('moment');
const User = require('./user');
const Category = require('./category');
// const Comment = require('./comment');

const Article = sequelize.define('article', {
  id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    comment: '文章主键ID'
  },
  user_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    // type: Sequelize.NUMBER,
    allowNull: false,
    comment: '发布人ID'
  },
  category_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    comment: '关联分类ID'
  },
  title: {
    type: Sequelize.STRING(128),
    allowNull: false,
    comment: '文章标题'
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: '文章简介'
  },
  img_url: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: '文章封面图'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '文章内容'
  },
  seo_keyword: {
    type: Sequelize.STRING(128),
    allowNull: true,
    comment: '文章SEO关键字'
  },
  status: {
    type: Sequelize.TINYINT,
    allowNull: true,
    defaultValue: 1,
    comment: '文章展示状态：0-隐藏,1-正常'
  },
  sort_order: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 1,
    comment: "排序编号",
  },
  browse: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '文章浏览次数'
  },
  favorite_num: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '文章点赞次数'
  },

  
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});
/**
 *
 *  (1) 实例对象.sync() ; // 若表不存在,则创建表;若表已经存在,则不做任何操作

(2) 实例对象.sync({force:true}); // 若表不存在,则创建相应的表;若表已经存在,则删除原来的表,重新创建一个新的表.

(3) 实例对象.sync({alter:true}); // 若表不存在,则创建相应的表;若表已经存在,则与原始表进行比对,将原始表比对修改为当前的模型表

 */

// 定义 User 和 Article 模型之间的关联关系
User.hasMany(Article, { foreignKey: 'user_id' });
Article.belongsTo(User, { foreignKey: 'user_id' });

// 定义 Category 和 Article 模型之间的关联关系
Category.hasMany(Article, { foreignKey: 'category_id' });
Article.belongsTo(Category, { foreignKey: 'category_id' });


module.exports = Article;
