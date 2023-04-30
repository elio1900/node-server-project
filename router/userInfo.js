const express = require('express')
// 创建路由对象
const router = express.Router()

const userInfo_handle = require('../router_handle/userInfo')

// 查询用户信息
router.get('/getUserInfo', userInfo_handle.getUserInfo)

module.exports = router