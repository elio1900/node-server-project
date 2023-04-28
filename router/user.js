const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入 user 路由处理函数
const user_handle = require('../router_handle/user')

// 注册新用户
router.post('/register', user_handle.regUser)

// 登录
router.post('/login', user_handle.login)


// 暴露路由对象
module.exports = router 