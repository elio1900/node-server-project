// 导入 express
const express = require('express')
// 创建服务器实例对象
const app = express()


// 导入并配置 cors 进行跨域访问的处理
const cors = require('cors')
// 配置 cors 为全局中间件
app.use(cors)

// 配置解析表单数据的中间件。注意只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false}))

// 导入并使用路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 定义端口
const port = 3007
// 启动服务器
app.listen(port, () => {
  console.log(`api server is running at http://127.0.0.1:${port}`)
})