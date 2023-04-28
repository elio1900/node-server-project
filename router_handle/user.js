// 导入自定义 db 数据库模块对象
const db = require('../databases/index')
// 导入加密模块 bcryptjs
const bcryptjs = require('bcryptjs')

// 用户注册的处理函数
exports.regUser = (req, res) => {

  // 接收表单数据
  const data = req.body

  // 数据判断
  if (!data.username || !data.password) {
    res.send({
      status: 500,
      message: '用户名或密码不能为空'
    })
  }

  const sqlStr = 'select * from ev_users where username = ?'

  db.query(sqlStr, [data.username], (err, results) => {
    // 执行sql语句失败
    if (err) {
      return res.send({
        status: 500,
        message: err.message
      })
    }

    // 用户名被占用
    if (results.length > 0) {
      return res.send({
        status: 500,
        message: '此用户名被占用'
      })
    }

    // 对密码进行加密处理 hashSync(明文密码，随机盐的长度)
    data.password = bcryptjs.hashSync(data.password, 10)

    // 插入新用户
    const sqlStr = 'inset into ev_user set ?'
    db.query(sqlStr, {username: data.username, password: data.password, email: data.email}, (err, results) => {
      if (err) return res.send({
        status: 500,
        message: err.message
      })

      // 判断影响函数是否为1
      if (results.effectedRows !== 1) return res.send({
        status: 500,
        message: '用户注册失败'
      })

      // 注册用户成功
      res.send({
        status: 200,
        message: '用户注册成功！'
      })
    })
  })
  res.send('register success!')
}

// 用户登录的处理函数
exports.login = (req, res) => {
  res.send('login success!')
}