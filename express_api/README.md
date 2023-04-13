
# express+mysql+vue 前后端分离blog项目
> 基于node express为服务端使用sequelize 很好的异步处理mysql事物处理，sequelize-auto 可为sequelize生成实体类更高效使用。
vue（SPA）单页面为客户端和服务端

### 依赖
```
node -v >10.4.0
npm -v 5.3.0
npm2 -v 3.5.1
```

### 目录结构

```
.
├─blog.client                   //客户端
├─express_api                 //服务端
└─express_api/data/my_database.js                       //表结构和数据
```

### 安装
使用 npm 或者 yarn
```
 git  clone https://github.com/gengzhenpei/express_v2ex.git
    npm install & yarn
    npm run dev
    npm run build
    npm run pm2 //blog.service  服务运行
```
### Docs

```
    express.api 服务端启动时执行sql.js

```

