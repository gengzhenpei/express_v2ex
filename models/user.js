const mongoose = require('mongoose');

// 定义 User 数据模型
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// 创建 User 模型
const User = mongoose.model('User', userSchema);

// 导出模型
module.exports = User;

/**
 * 
 * 在这个示例中， 我们使用 Mongoose 库来定义一个 User 数据模型， 用于描述用户数据的结构。 我们定义了五个字段：

            name： 用户的姓名， 类型为字符串， 必填字段。
            age： 用户的年龄， 类型为数字， 必填字段。
            email： 用户的电子邮件地址， 类型为字符串， 必填字段， 且必须唯一。
            createdAt： 用户数据创建时间， 类型为日期对象， 默认值为当前时间。
            updatedAt： 用户数据更新时间， 类型为日期对象， 默认值为当前时间。
            然后， 我们使用 mongoose.model() 方法创建 User 模型， 并将其命名为 'User'。
            这个方法会返回一个构造函数， 我们可以使用它来创建 User 数据对象。 最后， 我们将模型导出， 以便在控制器中使用。

            需要注意的是， 为了使用这个 User 模型， 我们需要在应用程序中先连接 MongoDB 数据库， 可以使用 Mongoose 提供的 mongoose.connect() 方法来进行连接。 我们通常将这个操作放在应用程序的入口文件中， 如 app.js 中的顶部：
 */
