// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'hello',
  database: 'node_server_data'
})

// 暴露 db 数据库连接对象
module.exports = db