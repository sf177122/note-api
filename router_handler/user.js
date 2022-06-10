const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 导入token包
const jwt = require('jsonwebtoken')
const config = require('../schema/config')
// 注册用户的处理函数 
exports.regUser = (req, res) => {

  const userinfo = req.body

  const sqlStr = `select * from users where username=?`
  db.query(sqlStr, userinfo.username, (err, results) => {
      if (err) {
          return res.cc(err)
      }
      if (results.length > 0) {
          return res.cc('用户名被占用,请更换用户名')
      }
      // 对密码进行加密
      userinfo.password = bcrypt.hashSync(userinfo.password)

      // 定义插入新用户sql
      const sql = 'insert into users set ?'
      db.query(sql, { username: userinfo.username, password: userinfo.password, user_pic: userinfo.user_pic}, (err, results) => {
          if (err) {
              return res.cc(err)
          }
          if (results.affectedRows !== 1) {
              return res.cc('注册用户失败，请稍后再试！')
          }
          res.cc('注册成功！', 0)
      })
  })
}

// 用户登录函数
exports.login = (req, res) => {
  // 接收表单数据
  const userinfo = req.body
  const sql = `select * from users where username=?`
  db.query(sql, userinfo.username, (err, results) => {
      if (err) return res.cc(ess)
      if (results.length !== 1) return res.cc('登录失败！')

      // 判断密码是否正确
      const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
      if (!compareResult) return res.cc('密码错误')
          // 生成token
      const user = {...results[0], password: '', user_pic: '' }
      const tokenStr = jwt.sign(user, config.jwtSecretKey, {
          expiresIn: '10h',
      })
      res.send({
          status: 0,
          message: '登录成功！',
          token: 'Bearer ' + tokenStr
      })
  })
}
