const express = require('express')
const app = express()
const routes = require('./routes');

var bodyParser = require('body-parser')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//express后端配置：
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials","true");  //服务端允许携带cookie
    res.header("Access-Control-Allow-Origin", req.headers.origin);  //允许的访问域
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  //访问头
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  //访问方法
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Max-Age", 86400);
        res.sendStatus(204); //让options请求快速返回.
    }
    else {
        next();
    }
});

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

/**
 * 以上代码连接了本地 MongoDB 数据库中的 my_database 数据库， 连接选项中包含了 useNewUrlParser 和 useUnifiedTopology， 这两个选项可以避免在连接时出现一些常见的错误。
 */
// 注册路由
app.use('/api', routes);

// 静态文件中间件
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('服务器成功开启，端口号是3000')
})