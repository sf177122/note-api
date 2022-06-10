const express = require('express')
const joi = require('joi')
const cors = require('cors')
const app = express()
const port = 3007

// 配置cors跨域资源访问
app.use(cors())

// // 配置表单解析中间件
// app.use(express.urlencoded({ extended: true }))
app.use(express.json({
  limit: '10mb'
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));

// 响应数据的中间件
app.use((req, res, next) => {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情 况 
    res.cc = function(err, status = 1) {
        res.send({
            // 状态 status, // 状态描述，判断 err 是 错误对象 还是 字符串 
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 解析token中间件
const config = require('./schema/config')
const expressJWT = require('express-jwt')
app.use(expressJWT({
    secret: config.jwtSecretKey
}).unless({ path: [/^\/api\//] }))

// 用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

const uploadRouter = require('./router/upload')
app.use('/my', uploadRouter)

// 错误级别中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
        // 未知错误
    res.err
    next()
})

// 启动服务
app.listen(port, () => console.log(`Example app listening on http://127.0.0.1:${port}`))