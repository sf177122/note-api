// 用户路由模块
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块 
const userHandler = require('../router_handler/user')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入登录规则对象
const { login_schema } = require('../schema/user')

// 导入注册规则对象
const { reg_schema } = require('../schema/user')

// 用户注册
router.post('/reguser', expressJoi(reg_schema), userHandler.regUser)

// 登录
router.post('/login', expressJoi(login_schema), userHandler.login)



module.exports = router