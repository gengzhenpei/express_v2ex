const express = require('express')
const app = express()
const routes = require('./routes');
var bodyParser = require('body-parser')
const expressJWT = require('express-jwt')
const config = require('./config')

// 生成秘钥/解密 需要的key
// const secretKey = 'lihaichao'


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//express后端配置：
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");  //服务端允许携带cookie
    res.header("Access-Control-Allow-Origin", req.headers.origin);  //允许的访问域
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  //访问头
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");  //访问方法
    res.header("X-Powered-By", ' 3.2.1');
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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// 静态文件中间件
app.use(express.static('public'));
// 配置express-jwt 可通过 req.auth 获取token信息
app.use(expressJWT.expressjwt({ secret: config.secretKey, algorithms: ["HS256"] }).unless({ path: config.whiteList }))

// 注册路由
app.use('/api', routes);

// TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
    // token 解析失败导致的错误
    if (err.name === 'UnauthorizedError') {
        return res.send({ status: 401, message: '无效的token' })
    }
    // 其它原因导致的错误
    res.send({ status: 500, message: '未知错误' })

})


app.listen(3000, () => {
    console.log('服务器成功开启，端口号是3000')
})