const express = require('express')
// 创建路由对象
const router = express.Router()


// 导入 user 路由处理函数
const user_handle = require('../router_handle/user')


// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入验证规则
const { reg_login_schame } = require('../schema/user')


// 注册新用户
router.post('/register', expressJoi(reg_login_schame), user_handle.regUser)

// 登录
router.post('/login', expressJoi(reg_login_schame), user_handle.login)


// 暴露路由对象
module.exports = router 