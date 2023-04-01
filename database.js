// 引入 Sequelize 库
const Sequelize = require('sequelize');

// 创建 Sequelize 实例
const sequelize = new Sequelize('my_database', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }

});

module.exports = sequelize;