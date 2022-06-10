// 导入 express
const express = require('express');
// 创建路由对象
const router = express.Router();
const uploadinfo_handler = require('../router_handler/upload')
// 获取用户的基本信息
router.post('/upload', uploadinfo_handler.upLoadInfo)

router.get('/getupload',uploadinfo_handler.getupLoadInfo)
// 向外共享路由对象
module.exports = router;