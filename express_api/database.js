// 引入 Sequelize 库
const Sequelize = require('sequelize');
const redis = require("redis");

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

// redis服务 建立连接
const redisClient = redis.createClient({
    socket: {
        port: 6379,
        host: 'localhost',
    },
    password: '',
});

// redis监听连接事件
redisClient
    .connect()
    .then(() => {
        console.log("redis连接成功");
    })
    .catch((err) => {
        console.log(err || "redis连接出错");
    });

// module.exports = sequelize;
module.exports = {
    sequelize,
    redisClient
  }