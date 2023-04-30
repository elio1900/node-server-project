// 导入自定义 db 数据库模块对象
const db = require('../databases/index')

// 查询用户数据
const getUserInfo = (req, res) => {
  const sqlStr = 'select * from ev_users'
  db.query(sqlStr, (err, results) => {
    if (err) return res.resultFun(err)
    res.send({
      status: 200,
      message: '用户信息查询成功',
      data: results
    })
  })
  return
}

module.exports = {
  getUserInfo
}