// 引入 Sequelize 库
const Sequelize = require('sequelize');
const sequelize = require('../database');
// const Post = require('./post')
// User 模型
const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '用户主键'
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


// 定义 User 和 Post 模型之间的关联关系
// User.hasMany(Post, { foreignKey: 'user_id' });
// Post.belongsTo(User, { foreignKey: 'user_id' });

module.exports = User;
