import md5 from 'md5'
// const host = 'https://gate.test.jiatu360.cn/api'
const host = 'https://gate.jiatu360.cn/api'
var date = new Date()
var timeNum = Math.round(date.getTime() / 1000)// 十位时间戳
function requestGet (url, method, data, header) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: {
        'Content-type': 'application/json',
        'sign': md5('t=' + timeNum + '&jiatu2019yinji'),
        'timeStrap': timeNum,
        'token': header
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (res) {
        wx.showLoading({
          title: '网络异常' // 网络异常
        })
        setTimeout(() => {
          wx.hideLoading()
        }, 1000)
        // reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

function requestPost (url, method, data, header) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  let keys = Object.keys(data).sort()
  let str = []
  for (let i = 0; i < keys.length; i++) {
    // if (keys[i] === 'sign' || data[keys[i]] === '') {
    //   continue
    // }
    if (keys[i] === 'sign') {
      continue
    }
    str.push(keys[i] + data[keys[i]])
  }
  // eslint-disable-next-line no-useless-escape
  let signStr = str.toString().replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: header ? {
        'Content-type': 'application/json',
        'sign': md5('t=' + timeNum + '&' + signStr + '&jiatu2019yinji'),
        'timeStrap': timeNum,
        'token': header
      } : {
        'Content-type': 'application/json',
        'sign': md5('t=' + timeNum + '&' + signStr + '&jiatu2019yinji'),
        'timeStrap': timeNum
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (res) {
        wx.showLoading({
          title: '网络异常' // 网络异常
        })
        setTimeout(() => {
          wx.hideLoading()
        }, 1000)
        // reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

// get方法
function get (obj) {
  return requestGet(obj.url, 'GET', obj.data, obj.header)
}

// post方法
function post (obj) {
  return requestPost(obj.url, 'POST', obj.data, obj.header)
}

// put方法
function put (obj) {
  return requestPost(obj.url, 'PUT', obj.data, obj.header)
}

// delete方法
function del (obj) {
  return requestGet(obj.url, 'DELETE', obj.data, obj.header)
}
export default {
  requestGet,
  requestPost,
  get,
  post,
  put,
  del,
  host
}
