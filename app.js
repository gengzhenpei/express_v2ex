const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/**
 * 以上代码连接了本地 MongoDB 数据库中的 my_database 数据库， 连接选项中包含了 useNewUrlParser 和 useUnifiedTopology， 这两个选项可以避免在连接时出现一些常见的错误。
 */
// 注册路由
app.use('/', userRoutes);

// 静态文件中间件
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('服务器成功开启，端口号是3000')
})