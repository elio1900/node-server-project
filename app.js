// 导入 express
const express = require('express')
// 创建服务器实例对象
const app = express()

const joi = require('joi')
// 解析token的依赖包
const expressJWT = require('express-jwt')
const config = require('./config')


// 导入并配置 cors 进行跨域访问的处理
const cors = require('cors')
// 配置 cors 为全局中间件
// app.use(cors)


// 配置解析表单数据的中间件。注意只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false}))


// 处理错误失败的函数 - 【一定要写在路由之前】
app.use((req, res, next) => {
  res.resultFun = (err, status = 5001) => {
    res.send({
      status,
      // 判断是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})


// 配置解析 token 的中间件 - 【一定要写在路由之前】
app.use(expressJWT({ secret: config.secretKey }).unless({ path: [/^\/api\//]}))

// 导入并使用路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

const userInfoRouter = require('./router/userInfo')
app.use('', userInfoRouter)


// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.invalid) return res.resultFun(err)
  if (err.name === 'UnauthorizedError') return res.resultFun('身份（token）认证失败')
  // 未知错误
  res.resultFun(err)
})


// 定义端口
const port = 80
// 启动服务器
app.listen(8000, () => {
  console.log(`api server is running at http://127.0.0.1:${port}`)
})