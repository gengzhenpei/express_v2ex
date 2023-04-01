// 引入 Sequelize 库
const Sequelize = require('sequelize');
const sequelize = require('../database');
const moment = require('moment');
// const Post = require('./post')
// Category 模型
const Category = sequelize.define('Category', {
    id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '分类主键ID'
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '分类名称'
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: true,
        defaultValue: 1,
        comment: "类别状态,0-隐藏,1-正常",
      },
      sort_order: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 1,
        comment: "排序编号",
      },
      parent_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: '父类别id,id=0代表根节点'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
        comment: '创建时间'
      }
});


// 定义模型之间的关联关系
// User.hasMany(Post, { foreignKey: 'user_id' });
// Post.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Category;
