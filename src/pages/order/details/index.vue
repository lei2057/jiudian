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
        <div class="order-title">待付款</div>
        <div class="order-text">请在30分钟内完成付款，过时订单将自动取消</div>
      </div>
      <div style="padding: 0 10px;" v-if="dataInfo.payStatu == 2||dataInfo.payStatu == 5">
        <div class="order-title" >待入住</div>
        <div class="order-text">请凭身份证件，到酒店前台办理入住手续。</div>
      </div>
      <div style="padding: 0 10px;" v-if="dataInfo.payStatu == 4||dataInfo.payStatu == 6">
        <div class="order-title" >退款成功</div>
      </div>
      <div style="padding: 0 10px;" v-if="dataInfo.payStatu == 7">
        <div class="order-title" >已完成</div>
        <div class="order-text">请凭身份证件，到酒店前台办理入住手续。</div>
      </div>
      <div style="padding: 0 10px;" v-if="dataInfo.payStatu == 3">
        <div class="order-title">已取消</div>
        <div class="order-text">超时取消</div>
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
            <div>房间信息 :</div>
            <div class="flex info-text">{{dataInfo.roomName}}  {{dataInfo.rooms}}间</div>
          </div>
          <div class="info-item disflex">
            <div>入住时间 :</div>
            <div class="flex info-text">{{dataInfo.inTime}} 至 {{dataInfo.outTime}}</div>
          </div>
          <div class="info-item disflex">
            <div>保留时间 :</div>
            <div class="flex info-text">{{dataInfo.inTime}} 18:00:00</div>
          </div>
          <div class="info-item disflex">
            <div style="letter-spacing: 6px;margin-right: -6px;">入住人:</div>
            <div class="flex info-text">{{dataInfo.userName}}</div>
          </div>
          <div class="info-item disflex">
            <div>联系电话 :</div>
            <div class="flex info-text">{{dataInfo.phone}}</div>
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
          <div>下单时间 :</div>
          <div class="flex text">{{dataInfo.crtTime}}</div>
        </div>
      </div>
      <div class="order-tips">
        <div>
          <div class="tips-title">取消政策：</div>
          <div class="tips-text" v-if="dataInfo.cancel==1">预付房费后，在<span class="hong">{{cancelTime}}{{dataInfo.cancelTime}}点</span>前免费可取消订单/申请退款，
          逾期取消或变更，将<span class="hong">收取首晚房费</span>。</div>
          <div class="tips-text" v-else>预定成功后，<span class="hong">不可取消订单/申请退款或退券。</span></div>
        </div>
        <!-- <div style="margin-top: 15px;">
          <div class="tips-title">温馨提示：</div>
          <div class="tips-text">
  酒店于住店当天<span class="hong">15:00</span>后办理入住，离店当天<span class="hong">14:00</span>前办理
  退房, <span class="hong">入住日期以当地时间为准</span>, 如您在<span class="hong">15:00</span>前到达, 可能
  需要等待方能入住。若超过房间最多入住人数，则可能需要
  补差价或酒店拒绝入住，具体以酒店安排为准。</div>
        </div> -->
      </div>
    </div>
    <!-- 提交订单 -->
    <div class="order-btn-wrapper">
      <div class="order-quxiao" v-if="dataInfo.payStatu == 3" @click="orderDel(dataInfo.orderId)">删除订单</div>
      <div class="order-quxiao" v-if="dataInfo.payStatu == 8" @click="orderGo(dataInfo.hotelId)">再次预订</div>
      <div class="order-quxiao" v-if="dataInfo.payStatu == 2||dataInfo.payStatu == 5" @click="orderTui(dataInfo)">申请退款</div>
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
      <div class="disflex" v-if="dataInfo.payStatu == 7">
        <div class="order-quxiao" style="width: 50%;color: #C0A369;" @click="commentGo">立即点评</div>
        <div class="order-yuding" @click="orderGo(dataInfo.hotelId)">再次预订</div>
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
      loadingTime: ''
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
        res.data.finalPay = res.data.finalPay.toFixed(2)
        this.dataInfo = res.data
        this.dataInfo.inTime = res.data.inTime.substr(0, 10)
        this.dataInfo.outTime = res.data.outTime.substr(0, 10)
        let times = res.data.inTime.split('-')
        this.cancelTime = times[0] + '年' + times[1] + '月' + times[2] + '日'
        const startTime = new Date(res.data.crtTime)
        const nowTime = new Date()
        let centerTime = (nowTime.getTime() - startTime.getTime()) / 1000
        let minute = 30 * 60
        let endTime = minute - centerTime
        this.minutes = parseInt(endTime / 60 % 60)
        this.seconds = parseInt(endTime % 60)
      })
    } else {
      this.$http.post({
        url: '/order/order/saveOrder',
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
          this.dataInfo.inTime = res.data.inTime.substr(0, 10)
          this.dataInfo.outTime = res.data.outTime.substr(0, 10)
          let times = res.data.inTime.split('-')
          this.cancelTime = times[0] + '年' + times[1] + '月' + times[2] + '日'
        })
      })
    }
    this.timer()
  },
  onUnload () {
    this.minutes = 30
    this.seconds = 0
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
          success: (payok) => {
            console.log(payok)
            console.log('支付成功')
            let data = {
              orderNo: res.data.wxApplet.orderNo,
              price: this.dataInfo.finalPay,
              hotelName: this.dataInfo.hotelName
            }
            wx.redirectTo({
              url: '../pay/main?data=' + JSON.stringify(data)
            })
          },
          fail: (payok) => {
            console.log(payok)
            console.log('支付失败')
          }
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
      // wx.getLocation({// 获取当前经纬度
      //   type: 'wgs84',
      //   success: function (res) {
      //     console.log(res)
      wx.openLocation({// 使用微信内置地图查看位置
        latitude: parseFloat(position[1]),
        longitude: parseFloat(position[0]),
        name: that.dataInfo.hotelName,
        address: that.dataInfo.address
      })
      //   }
      // })
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
    commentGo () { // 立即点评
      wx.navigateTo({
        url: `../../my/commentGo/main?orderNo=${this.dataInfo.orderNo}&id=${this.dataInfo.id}`
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