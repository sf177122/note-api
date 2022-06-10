const db = require('../db/index');

exports.getUserInfo = (req, res) => {

  const sql = `select username, user_pic from users where username=?`;
  db.query(sql, req.user.username, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length !== 1) return res.cc('获取用户信息失败！');
    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: '获取用户基本信息成功！',
      data: results[0],
    });
  });
}