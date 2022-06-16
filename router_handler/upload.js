const db = require('../db/index');

exports.upLoadInfo = (req, res) => {
  const userinfo = req.body;
  const select = 'select id from note where username=? and id= ?';
  db.query(select, [req.user.username, userinfo.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.length === 0) {
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
          id: userinfo.id,
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
    } else {
      const updatasql = 'update note set ? where username= ? and id=?';
      db.query(
        updatasql,
        [
          {
            username: req.user.username,
            title: userinfo.title,
            dateTime: userinfo.dateTime,
            subtitle: userinfo.subtitle,
            noteText: userinfo.noteText,
            imagePath: userinfo.imagePath,
            color: userinfo.color,
            webLink: userinfo.webLink,
            id: userinfo.id,
          },
          req.user.username,
          userinfo.id,
        ],
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
    }
  });
};

exports.getupLoadInfo = (req, res) => {
  const sql =
    'select title, dateTime,subtitle,noteText,imagePath,color,webLink,id from note where username=?';
  db.query(sql, req.user.username, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);
    if (results.length === 0) return res.cc('没有备份信息！');
    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: '获取备份信息成功！',
      data: results,
    });
  });
};

exports.deleteLoadInfo =(req,res) =>{
  const userinfo = req.body;
  const sql =
    'delete  from note where username=? and id = ?';
  db.query(sql, [req.user.username , userinfo.id ], (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('删除失败');
    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: '删除备份信息成功'
    });
  });
}

exports.getupLoadPage =(req,res) =>{
  page = req.body.page
  num = 5
  sql_bady = [req.user.username,(parseInt(page)-1)*parseInt(num),parseInt(num)]
  const sql = "select count(*) as numRows  from note where username=?"
  db.query(sql, req.user.username, (err, rows) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);
    if (rows.length === 0) return res.cc('没有备份信息！');
    // 3. 将用户信息响应给客户端
    else{
      numRows  = rows[0].numRows
      numPages =Math.ceil(numRows/num)
      page_sql = 'select title, dateTime,subtitle,noteText,imagePath,color,webLink,id from note where username=? limit ?,?'
      db.query(page_sql,sql_bady,function (err, results ) {
        if (err) return res.cc(err);
        if (results.length === 0) return res.cc('没有备份信息！');
        res.send({
          status: 0,
          message: '获取备份信息成功！',
          pages:numPages,
          data: results,
        });
    });   
    }
  });
}