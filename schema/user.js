const joi = require('joi')
/**
 * string() - 值必须是字符创
 * alphanum() - 值只能包含 a-zA-z0-9
 * min() - 最小长度
 * max() - 最大长度
 * required() - 要求值必填
 * pattern - 正则表达式规则
 */

const username = joi.string().alphanum().max(10).required()
const password = joi.required()

// 暴露对象
module.exports.reg_login_schame = {
  body: {
    username,
    password
  }
}