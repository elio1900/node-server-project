// 导入自定义 db 数据库模块对象
const db = require('../databases/index')
// 导入加密模块 bcryptjs
const bcryptjs = require('bcryptjs')
// 导入生成 JWT 字符串的包
const jwt = require('jsonwebtoken')
// 导入 JWT 解析还原成 JSON 对象的包
const expressJWT = require('express-jwt') 
// 导入自定义模块中的密钥
const { secretKey, expiresIn } = require('../config')


// 用户注册的处理函数
const regUser = (req, res) => {

  // 接收表单数据
  const data = req.body

  // 数据判断 - 改为 joi 数据验证
  // if (!data.username || !data.password) {
  //   // return res.send({ status: 500, message: '用户名或密码不能为空' })
  //   return res.resultFun('用户名或密码不能为空')
  // }

  const sqlStr = 'select * from ev_users where username = ?'

  db.query(sqlStr, [data.username], (err, results) => {
    // 执行sql语句失败
    if (err) {
      // return res.send({ status: 500, message: err.message })
      return res.resultFun(err)
    }

    // 用户名被占用
    if (results.length > 0) {
      // return res.send({ status: 500, message: '此用户名被占用' })
      return res.resultFun('此用户名被占用')
    }

    // 对密码进行加密处理 hashSync(明文密码，随机盐的长度)
    data.password = bcryptjs.hashSync(data.password, 5)

    // 插入新用户
    const sqlStr = 'insert into ev_users set ?'
    db.query(sqlStr, {username: data.username, password: data.password, email: data.email}, (err, results) => {
      if (err) {
        // return res.send({ status: 500,message: err.message })
        return res.resultFun(err)
      }

      // 判断影响函数是否为1
      if (results.affectedRows !== 1) {
        // return res.send({ status: 500, message: '用户注册失败'})
        return res.resultFun('用户注册失败')
      }

      // 注册用户成功
      // res.send({ status: 200, message: '用户注册成功！' })
      res.resultFun('用户注册成功！', 200)
    })
  })
}


// 用户登录的处理函数
const login = (req, res) => {

  const userInfo = req.body

  console.log(userInfo);
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userInfo.username, (err, results) => {
    if (err) return res.resultFun(err)

    console.log(' -- results -- ', results);
    // 执行SQL语句成功，但是查询到的数据条数不等于1
    if (results.length !== 1) return res.resultFun("登录失败")

    // TODO 判断用户数据的登录密码与数据库密码是否一致
    /**
     * 因为数据库存储的密码是通过 bcryptjs 中的 hashSync 进行加密处理过的
     * bcryptjs中的compareSync进行密码的对比 true/false
     * compareSync(提交的密码，数据库存储的密码)
     */
    const compareResult = bcryptjs.compareSync(userInfo.password, results[0].password)

    if (!compareResult) {
      return res.resultFun('密码不一致')
    }

    // TODO 登录成功，生成Token
    // 定义一个token 
    const token = jwt.sign({ username: userInfo.username }, secretKey, { expiresIn })
    res.send({
      status: 200,
      message: '用户登录成功',
      token: `Bearer ${token}`
    })
  })
}

module.exports = {
  regUser,
  login
}