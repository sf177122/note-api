const db = require('../db/index');

exports.upLoadInfo = (req, res) => {
  const userinfo = req.body;
 
  const sql = 'insert into note set ?';
  db.query(
    sql,
    {
      username: req.user.username,
      title: userinfo.title,
      dateTime: userinfo.dateTime,
      subtitle: userinfo.subtitle,
      noteText: userinfo.noteText,
      imagePath: userinfo.imagePath,
      color: userinfo.color,
      webLink: userinfo.webLink,
      id:userinfo.id,
    },
    (err, results) => {
      if (err) {
        return res.cc(err);
      }
      if (results.affectedRows !== 1) {
        return res.cc('备份失败，请稍后再试！');
      }
      res.cc('备份成功！', 0);
    }
  );
};



exports.getupLoadInfo = (req, res) => {
  const sql = 'select * from note where username=?';
  db.query(sql, req.user.username, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);
    if (results.length === 0 ) return res.cc('没有备份信息！');
    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: '获取备份信息成功！',
      data: results,
    });
  });
};
