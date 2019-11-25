<template>
  <div>
    <navigation-center
    :navBackgroundColor="''"
    :titleColor="'#fff'"
    :title="`订单号 ${dataInfo.orderNo}`"
    :back-visible="true"
    :home-path="false"></navigation-center>
    <div class="bg-img"><img src="http://oss.jiatu360.cn/xcx/bg1.png"></div>
    <div class="order-wrapper">
      <div style="padding: 0 10px;" v-if="dataInfo.payStatu == 1">
        <div class="order-title">待支付</div>
        <div class="order-text">请在30分钟内完成付款，过时订单将自动取消</div>
      </div>
      <div style="padding: 0 10px;" v-if="dataInfo.payStatu == 2">
        <div class="order-title" >已支付</div>
        <div class="order-text">请凭身份证件，到酒店前台办理入住手续。</div>
      </div>
      <div class="order-price disflex">
        <div>实付款:</div>
        <div class="num flex">¥{{dataInfo.finalPay}}</div>
        <div class="disflex" @click="bill(dataInfo.expenseDetailVoList,dataInfo.totalPay,dataInfo.finalPay)">
          <div>费用明细</div>
          <div class="icon16"><img src="../../../assets/right-gary.png"></div>
        </div>
      </div>
      <!-- 订单用户信息 -->
      <div class="order-info">
        <div class="info-title disflex">
          <div class="flex">
            <div class="text">{{dataInfo.hotelName}}</div>
            <div>{{dataInfo.hotelAddress}}</div>
          </div>
          <!-- <div class="icon16"><img src="../../../assets/right-gary.png"></div> -->
        </div>
        <div class="info-cont">
          <div class="info-item disflex">
            <div>包间名称</div>
            <div>&nbsp;：</div>
            <div class="flex info-text">{{dataInfo.commodityName}}</div>
          </div>
          <div class="info-item disflex">
            <div style="letter-spacing: 28px;margin-right: -28px;">类型</div>
            <div>&nbsp;：</div>
            <div class="flex info-text">{{dataInfo.commodityTypeName}}</div>
          </div>
          <div class="info-item disflex">
            <div>预订时间</div>
            <div>&nbsp;：</div>
            <div class="flex info-text">{{dataInfo.commodityScheduledTime}}</div>
          </div>
          <div class="info-item disflex">
            <div>联系电话</div>
            <div>&nbsp;：</div>
            <div class="flex info-text">{{dataInfo.phone}}</div>
          </div>
          <div class="info-item disflex">
            <div style="letter-spacing: 28px;margin-right: -28px;">称呼</div>
            <div>&nbsp;：</div>
            <div class="flex info-text">{{dataInfo.userName}}</div>
          </div>
          <div class="info-item disflex">
            <div style="letter-spacing: 28px;margin-right: -28px;">备注</div>
            <div>&nbsp;：</div>
            <div class="flex info-text">{{dataInfo.memo}}</div>
          </div>
        </div>
        <div class="info-set">
          <div class="set-item" style="float: left;margin-right: 37px;" @click="phone(dataInfo.hotelPhone)">
            <div class="icon20" style="margin-right: 8px;"><img src="../../../assets/icon-dhh.png"></div>
            联系酒店
          </div>
          <div class="set-item" @click="map">
            <div class="icon20" style="margin-right: 8px;"><img src="../../../assets/icon-dw.png"></div>
            导航过去
          </div>
        </div>
      </div>
      <div class="order-time">
        <div class="disflex time-item" style="border-bottom: 1px solid #D9D9D9;">
          <div style="letter-spacing: 5px;margin-right: -5px;">订单号:</div>
          <div class="flex text">{{dataInfo.orderNo}}</div>
        </div>
        <div class="disflex time-item">
          <div>下单时间: </div>
          <div class="flex text">{{dataInfo.crtTime}}</div>
        </div>
      </div>
      <div class="order-time" v-if="dataInfo.company">
        <div class="disflex time-item" style="border-bottom: 1px solid #D9D9D9;">
          <div>发票类型: </div>
          <div class="flex text">普通发票</div>
        </div>
        <div class="disflex time-item">
          <div>发票抬头: </div>
          <div class="flex text">{{dataInfo.company}}</div>
        </div>
      </div>
      <div class="order-tips" v-if="!payCont">
        <div class="tips-title">温馨提示：</div>
        <div class="tips-text">如您在<span class="hong">预定时间</span>未到达/逾期未到，则需要自行与酒店联系。 具体以酒店安排为准。</div>
      </div>
      <div v-else>
        <div class="order-time">
          <div class="disflex time-item" style="border-bottom: 1px solid #D9D9D9;">
            <div class="text">支付明细</div>
            <div class="flex"></div>
          </div>
          <div style="padding: 5px 7px;" v-for="item in dataInfo.orderList" :key="item">
            <div>{{item.payTime}} <span style="color:#ED5858;">{{item.finalPay}}</span> {{item.payType}}</div>
          </div>
        </div>
        <div class="order-time disflex" style="padding: 10px 15px;">
          <div style="font-size:16px;color:#333;">金额：</div>
          <input class="flex" type="text" v-model="price" placeholder="询问服务员后输入">
          <div class="pay-btn" @click="payAddto">追加买单</div>
        </div>
        <div class="disflex" style="margin-left:15px;">
          <div class="icon13"><img src="../../../assets/icon-ts.png"></div>
          <div class="flex" style="font-size:11px;color:#999;margin-left:5px;">追加买单三日内有效，逾期不可使用。</div>
        </div>
      </div>
    </div>
    <!-- 提交订单 -->
    <div class="order-btn-wrapper">
      <div class="disflex" v-if="dataInfo.payStatu == 1">
        <div class="order-quxiao" style="width: 50%;" @click="orderQx(dataInfo)">取消订单</div>
        <div class="order-daojishi" @click="pay">
          <div>立即支付</div>
          <div class="disflex">
            <div class="icon16"><img src="../../../assets/icon-djs.png"></div>
            <div style="font-size: 11px;">{{minutes}}:{{seconds}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationCenter from '../../../components/navigationCenter'
export default {
  data () {
    return {
      dataInfo: {},
      cancelTime: '', // 住房取消时间
      minutes: 30, // 倒计时分钟
      seconds: 0,
      loadingTime: '',
      payCont: false,
      price: ''
    }
  },
  onLoad (options) {
    let userInfo = wx.getStorageSync('userInfo')
    if (options.orderNo) {
      this.$http.get({
        url: '/order/order/orderInfoDetail?orderNo=' + options.orderNo,
        header: userInfo.token
      }).then(res => {
        console.log(res)
        this.dataInfo = res.data
        let times = res.data.commodityScheduledTime.substr(0, 4).split('.')
        let timesWeek = res.data.commodityScheduledTime.split(',')
        this.dataInfo.commodityScheduledTime = times[0] + '月' + times[1] + '日' + ' , ' + timesWeek[1]
        const startTime = new Date(res.data.crtTime)
        const nowTime = new Date()
        let centerTime = (nowTime.getTime() - startTime.getTime()) / 1000
        let minute = 30 * 60
        let endTime = minute - centerTime
        this.minutes = parseInt(endTime / 60 % 60)
        this.seconds = parseInt(endTime % 60)
        if (options.key && res.data.payStatu === 2) {
          this.payCont = true
        }
      })
    } else {
      this.$http.post({
        url: '/order/order/saveCommodityOrder',
        header: userInfo.token,
        data: JSON.parse(options.data)
      }).then(res => {
        console.log(res)
        this.$http.get({
          url: '/order/order/orderInfoDetail?orderNo=' + res.data,
          header: userInfo.token
        }).then(res => {
          console.log(res)
          this.dataInfo = res.data
          let times = res.data.commodityScheduledTime.substr(0, 4).split('.')
          let timesWeek = res.data.commodityScheduledTime.split(',')
          this.dataInfo.commodityScheduledTime = times[0] + '月' + times[1] + '日' + ' , ' + timesWeek[1]
        })
      })
    }
    this.timer()
  },
  onUnload () {
    this.minutes = 30
    this.seconds = 0
    this.price = ''
    clearInterval(this.loadingTime)
  },
  methods: {
    timer () { // 支付倒计时
      this.loadingTime = setInterval(() => {
        if (this.seconds === 0 && this.minutes !== 0) {
          this.seconds = 59
          this.minutes -= 1
        } else if (this.minutes === 0 && this.seconds === 0) {
          this.seconds = 0
          clearInterval(this.loadingTime)
          wx.showToast({
            title: '支付超时,订单已取消',
            icon: 'none',
            duration: 2000,
            mask: true,
            success: () => {
              setTimeout(function () {
                wx.switchTab({
                  url: '../../home/index/main'
                })
              }, 1000)
            }
          })
        } else {
          this.seconds -= 1
        }
      }, 1000)
    },
    pay () { // 微信支付
      let userInfo = wx.getStorageSync('userInfo')
      this.$http.post({
        url: '/order/ezt/orderPayByEzt',
        header: userInfo.token,
        data: {
          payType: '2',
          orderNo: this.dataInfo.orderNo,
          openid: userInfo.openId
        }
      }).then(res => {
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.wxApplet.timeStamp,
          nonceStr: res.data.wxApplet.nonceStr,
          package: res.data.wxApplet.package,
          signType: res.data.wxApplet.signType,
          paySign: res.data.wxApplet.paySign,
          success: (res) => {
            console.log(res)
            console.log('支付成功')
            let data = {
              orderNo: this.dataInfo.orderNo,
              price: this.dataInfo.finalPay,
              hotelName: this.dataInfo.hotelName
            }
            wx.redirectTo({
              url: '../pay/main?data=' + JSON.stringify(data) + '&key=1'
            })
          },
          fail: (res) => {
            console.log(res)
            console.log('支付失败')
          }
        })
      })
    },
    payAddto () { // 追加订单
      let userInfo = wx.getStorageSync('userInfo')
      this.$http.post({
        url: '/order/order/saveCommodityOrder',
        header: userInfo.token,
        data: {
          userId: userInfo.userId + '',
          hotelId: this.dataInfo.hotelId + '',
          finalPay: this.price,
          parentOrderNo: this.dataInfo.orderNo
        }
      }).then(res => {
        console.log(res)
        this.$http.post({
          url: '/order/ezt/orderPayByEzt',
          header: userInfo.token,
          data: {
            payType: '2',
            orderNo: res.data,
            openid: userInfo.openId
          }
        }).then(res => {
          console.log(res)
          wx.requestPayment({
            timeStamp: res.data.wxApplet.timeStamp,
            nonceStr: res.data.wxApplet.nonceStr,
            package: res.data.wxApplet.package,
            signType: res.data.wxApplet.signType,
            paySign: res.data.wxApplet.paySign,
            success: (res) => {
              console.log(res)
              console.log('支付成功')
              let data = {
                orderNo: this.dataInfo.orderNo,
                price: this.price,
                hotelName: this.dataInfo.hotelName
              }
              wx.redirectTo({
                url: '../pay/main?data=' + JSON.stringify(data) + '&key=1'
              })
            },
            fail: (res) => {
              console.log(res)
              console.log('支付失败')
            }
          })
        })
      })
    },
    bill (data, totalPay, finalPay) { // 费用明细
      wx.navigateTo({
        url: '../bill/main?data=' + JSON.stringify(data) + '&totalPay=' + totalPay + '&finalPay=' + finalPay
      })
    },
    phone (res) {
      wx.makePhoneCall({
        phoneNumber: res
      })
    },
    map () { // 地图导航
      var that = this
      let position = that.dataInfo.position.split(',')
      wx.openLocation({// 使用微信内置地图查看位置
        latitude: parseFloat(position[1]),
        longitude: parseFloat(position[0]),
        name: that.dataInfo.hotelName,
        address: that.dataInfo.address
      })
    },
    orderQx (data) { // 取消订单
      let userInfo = wx.getStorageSync('userInfo')
      this.$http.get({
        url: '/order/ezt/eztRefund?orderNo=' + data.orderNo + '&refundReason=',
        header: userInfo.token
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: '取消成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 2
              })
            }, 1500)
          }
        })
      })
    },
    orderTui (data) { // 申请退款
      wx.navigateTo({
        url: '../refund/main?data=' + JSON.stringify(data)
      })
    },
    commentGo (orderNo) { // 立即点评
      wx.navigateTo({
        url: '../../my/commentGo/main?orderNo=' + orderNo
      })
    },
    orderGo (id) { // 再次预定
      wx.redirectTo({
        url: '../../home/details/main?id=' + id
      })
    },
    orderDel (id) { // 订单删除
      let userInfo = wx.getStorageSync('userInfo')
      wx.showModal({
        title: '提示信息',
        content: '您是否确定关闭该订单',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#0076FF',
        success: (result) => {
          if (result.confirm) {
            this.$http.get({
              url: '/order/order/deleteOrder?orderId=' + id,
              header: userInfo.token
            }).then(res => {
              console.log(res)
            })
          }
        }
      })
    }
  },
  components: {
    navigationCenter
  }
}
</script>
<style lang="scss" scoped>
.bg-img {height: 220px;}
.order-wrapper {padding: 0 10px;position: relative;top: -100px;
  .order-title {font-size: 20px;font-weight: bold;margin-bottom: 10px;color: #fff;}
  .order-text {font-size: 12px;color: #fff;}
  .order-price {background-color: #fff;color: #888;font-size: 12px;padding: 10px 20px;margin: 24px 0 15px;border-radius: 4px;box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
    .num {font-size: 18px;color: #ED5858;margin-left: 19px;}
  }
  .order-info, .order-time {background-color: #fff;border-radius: 4px;margin-bottom: 15px;}
  .order-info {padding: 15px 10px;
    .info-title {border-bottom: 1px solid #D9D9D9;font-size: 12px;color: #888;padding: 0 5px 13px 8px;
      .text {font-size: 14px;color: #000;}
    }
    .info-cont {padding: 10px 20px;
      .info-item {padding: 3px 0;font-size: 14px;color: #888;
        .info-text {font-size: 14px;font-weight: bold;color: #000;margin-left: 5px;}
      }
    }
    .info-set {border-top: 1px solid #D9D9D9;padding: 15px 0 0 15px;text-align: left;
      .set-item {display: flex;align-items: center;}
    }
  }
  .order-time {padding: 0 10px;color: #888;font-size: 12px;
    .time-item {padding: 10px 7px;
      .text {color: #000;margin-left: 5px;font-weight: bold;}
    }
    .pay-btn {width: 80px;line-height: 30px;font-size: 14px;text-align: center;background-color: #ED5858;color: #fff;border-radius: 8px;}
  }
  .order-tips {border: 1px dashed #979797;border-radius: 4px;padding: 15px;
    .tips-title {font-size: 14px;margin-bottom: 3px;}
    .tips-text {color: #666;font-size: 11px;line-height: 1.5;}
    .hong {color: #ED5858;}
  }
}
.order-btn-wrapper {width: 100%;line-height: 50px;position: fixed;left: 0;bottom: 0;text-align: center;font-size: 16px;
  .order-quxiao {border: 1px solid #C0A369;background-color: #F9F9F9;}
  .order-tijiao {background-color: #C0A369;color: #fff;}
  .order-daojishi {width: 50%;display: flex;flex-direction: column;justify-content: space-between;align-items: center;line-height: 1.5;padding: 6px 0;background-color: #C0A369;color: #fff;}
  .order-yuding {width: 50%;background-color: #C0A369;color: #fff;line-height: 52px;}
}
</style>