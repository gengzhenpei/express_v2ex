const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// 登录
router.post('/login', UserController.login);

// 查询所有用户
router.post('/getallposts', UserController.getAllPosts);

// 创建新用户
router.post('/createUser', UserController.createUser);

// 获取所有用户
router.get('/users', UserController.getUsers);

// 获取单个用户
router.post('/getUserInfo', UserController.getUser);

// 更新用户信息
router.put('/users/:id', UserController.updateUser);

// 删除用户
router.delete('/users/:id', UserController.deleteUser);

// 获取验证码
router.post('/captcha', UserController.captcha);

module.exports = router;

/****
 * 在这个示例中， 我们创建了一个基于 Express 的路由对象， 并定义了五个路由， 用于将不同的 HTTP 请求（ POST、 GET、 PUT 和 DELETE） 路由到相应的控制器函数。 例如， / users 路由使用 POST 方法调用 UserController.createUser 函数来创建新用户， / users /: id 路由使用 GET、 PUT 和 DELETE 方法调用 UserController.getUser、 UserController.updateUser 和 UserController.deleteUser 函数来获取、 更新和删除指定 ID 的用户数据。

需要注意的是， 在这个示例中， 我们将路由定义与控制器函数分离开来， 使代码更加清晰和易于维护。 这样做也使得我们可以在不影响路由的情况下， 更改控制器函数的具体实现。

在 Express 应用程序中， 可以使用 app.js 文件来加载路由， 并将其注册到应用程序中。 下面是一个简单的示例， 展示如何使用 app.js 文件来加载并注册我们之前定义的路由文件：
 */