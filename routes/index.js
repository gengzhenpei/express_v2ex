const express = require('express');
const router = express.Router();

// 引入各个模块的路由文件
const articleRoutes = require('./articleRoutes');
// const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const commentRoutes = require('./commentRoutes');


//统一挂载路由
router.use('/article', articleRoutes)
// router.use('/posts', postRoutes)
router.use('/user', userRoutes)
router.use('/catogery', categoryRoutes)
router.use('/comment', commentRoutes)


module.exports = router;



