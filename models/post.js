// post.js
const Sequelize = require('sequelize');
const sequelize = require('../database');
// const User = require('./user');

const Post = sequelize.define('Post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // userId: {
  //   type: Sequelize.NUMBER,
  //   allowNull: false
  // },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// 定义 User 和 Post 模型之间的关联关系
// User.hasMany(Post, { foreignKey: 'user_id' });
// Post.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Post;
