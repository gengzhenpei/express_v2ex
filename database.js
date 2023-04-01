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
// sequelize.sync({ alter: true }).then(() => {
sequelize.sync().then(() => {
    // console.log('表创建成功')
}).catch(err => {
    console.log('创建失败' + err)
})

module.exports = sequelize;