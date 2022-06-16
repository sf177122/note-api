// 导入 express
const express = require('express');
const expressJoi = require('@escook/express-joi')
// 创建路由对象
const router = express.Router();
const uploadinfo_handler = require('../router_handler/upload');
const { getupLoadPage_schema } = require('../schema/user');
// 获取用户的基本信息
router.post('/upload', uploadinfo_handler.upLoadInfo)

router.get('/getupload',uploadinfo_handler.getupLoadInfo)
router.post('/deleteloadinfo',uploadinfo_handler.deleteLoadInfo)

router.post('/getuploadpage',expressJoi(getupLoadPage_schema),uploadinfo_handler.getupLoadPage)
// 向外共享路由对象
module.exports = router;