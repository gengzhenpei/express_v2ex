const express = require('express');
const path = require('path');
const router = express.Router();
const SettingController = require('../controllers/settingController');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, '..', 'tmp') }); // 将上传的文件存储到 tmp/ 目录中
// 上传
router.post('/avatar', upload.single('image'), SettingController.avatar);



module.exports = router;
