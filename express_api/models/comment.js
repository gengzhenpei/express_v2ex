// article.js
const Sequelize = require('sequelize');
const sequelize = require('../database');
const moment = require('moment');
const User = require('./user');
const Article = require('./article');


const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    comment: '评论主键ID'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '评论内容'
  },
  status: {
    type: Sequelize.TINYINT,
    allowNull: true,
    defaultValue: 0,
    comment: '评论状态：0-审核中,1-审核通过,2-审核不通过'
  },
  article_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    comment: '关联的评论文章ID'
  },
  user_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '评论用户ID,0-代表匿名回复'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 0,
    comment: '匿名评论时填的邮箱'
  },
  // created_at: {
  //   type: Sequelize.DATE,
  //   allowNull: true,
  //   defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
  //   comment: '创建时间'
  // },
  created_at: {
    // type: Sequelize.DATE,
    // allowNull: true,
    // comment: '创建时间',
    // get() {
    //   return moment().format('YYYY-MM-DD HH:mm:ss');
    // }
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});

// 定义 User 和 Article 模型之间的关联关系
Article.hasMany(Comment, { foreignKey: 'article_id' });
Comment.belongsTo(Article, { foreignKey: 'article_id' });

// 定义 Category 和 Article 模型之间的关联关系
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Comment;
