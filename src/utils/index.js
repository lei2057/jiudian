// 手机号验证
let phoneReg = /^1[34578]\d{9}$/
// 15或18位身份证验证
let idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
// 当前时间
let date = new Date()
var Y = date.getFullYear() + '-'
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
var D = date.getDate() + ' '
let dataTime = Y + M + D

export default {
  phoneReg,
  idCardReg,
  dataTime
}
