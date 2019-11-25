<template>
  <div>
    <navigation-order
    :navBackgroundColor="'#fff'"
    :titleColor="''"
    :title="'订单'"
    :back-visible="false"
    :home-path="false"
    @navKey="navKey"></navigation-order>
    <div v-if="condition === 1">
      <div class="vant-tab order-nav" :style="{top: navHeight + 'px'}">
        <van-tabs :active="active" @change="onChange">
          <van-tab title="全部订单"></van-tab>
          <van-tab title="待支付" :info="payNum"></van-tab>
          <van-tab title="待入住"></van-tab>
          <van-tab title="待点评"></van-tab>
          <van-tab title="退款单"></van-tab>
        </van-tabs>
      </div>
      <div :style="{height: navHeight + 44 + 'px'}"></div>
      <div v-if="cont === 0">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type hong" v-text="item.payStatus==1?'待支付':item.payStatus==2||item.payStatus==5?'待入住':item.payStatus==3?'已取消':item.payStatus==4||item.payStatus==6?'退款成功':item.payStatus==7?'待评价':item.payStatus==11||item.payStatus==12?'退款中':'已完成'"></div>
          </div>
          <div class="item-text">{{item.roomName}}  {{item.vipName}}</div>
          <div class="item-text">{{item.inTime}} - {{item.outTime}}  共{{item.days}}晚 {{item.rooms}}间</div>
          <div class="disflex item-set">
            <div>订单总价：</div>
            <div class="flex hong">¥{{item.finalPay}}</div>
            <div class="disflex" v-if="item.payStatus==1">
              <div class="cancel" @click.stop="orderQx(item)">取消订单</div>
              <div class="pay" @click.stop="orderPay(item)">立即支付</div>
            </div>
            <div v-else-if="item.payStatus==2||item.payStatus==5">
              <div class="cancel" @click.stop="orderTui(item)">申请退款</div>
            </div>
            <div v-else-if="item.payStatus==3">
              <div class="cancel" @click.stop="orderDel(item.orderId)">删除</div>
            </div>
            <div v-else-if="item.payStatus==4||item.payStatus==6">
              <div class="cancel">退款详情</div>
            </div>
            <div class="disflex" v-else-if="item.payStatus==7">
              <div class="pay" @click.stop="commentGo(item)">立即点评</div>
              <div class="pay" @click.stop="orderGo(item.hotelId)">再次预订</div>
            </div>
            <div v-else-if="item.payStatus==8">
              <div class="pay" @click.stop="orderGo(item.hotelId)">再次预订</div>
            </div>
            <div v-else></div>
          </div>
        </div>
      </div>
      <div v-if="cont === 1">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type hong">待支付</div>
          </div>
          <div class="item-text">{{item.roomName}}  {{item.vipName}}</div>
          <div class="item-text">{{item.inTime}} - {{item.outTime}}  共{{item.days}}晚 {{item.rooms}}间</div>
          <div class="disflex item-set">
            <div>订单总价：</div>
            <div class="flex hong">¥{{item.finalPay}}</div>
            <div class="cancel" @click.stop="orderQx(item)">取消订单</div>
            <div class="pay" @click.stop="orderPay(item)">立即支付</div>
          </div>
        </div>
      </div>
      <div v-if="cont === 2">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type hong">待入住</div>
          </div>
          <div class="item-text">{{item.roomName}}  {{item.vipName}}</div>
          <div class="item-text">{{item.inTime}} - {{item.outTime}}  共{{item.days}}晚 {{item.rooms}}间</div>
          <div class="disflex item-set">
            <div>订单总价：</div>
            <div class="flex hong">¥{{item.finalPay}}</div>
            <div class="cancel" @click.stop="orderTui(item)">申请退款</div>
          </div>
        </div>
      </div>
      <div v-if="cont === 3">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type">已完成</div>
          </div>
          <div class="item-text">{{item.roomName}}  {{item.vipName}}</div>
          <div class="item-text">{{item.inTime}} - {{item.outTime}}  共{{item.days}}晚 {{item.rooms}}间</div>
          <div class="disflex item-set">
            <div>订单总价：</div>
            <div class="flex">¥{{item.finalPay}}</div>
            <div class="pay" @click.stop="commentGo(item)">立即点评</div>
            <div class="pay" @click.stop="orderGo(item.hotelId)">再次预订</div>
          </div>
        </div>
      </div>
      <div v-if="cont === 4">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type hong">退款成功</div>
          </div>
          <div class="item-text">{{item.roomName}}  {{item.vipName}}</div>
          <div class="item-text">{{item.inTime}} - {{item.outTime}}  共{{item.days}}晚 {{item.rooms}}间</div>
          <div class="disflex item-set">
            <div>订单总价：</div>
            <div class="flex hong">¥{{item.finalPay}}</div>
            <!-- <div class="cancel">查看订单</div> -->
            <div class="cancel">退款详情</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="condition === 2">
      <div class="vant-tab order-nav" :style="{top: navHeight + 'px'}">
        <van-tabs :active="active" @change="onChange">
          <van-tab title="全部订单"></van-tab>
          <van-tab title="待支付" :info="payNum"></van-tab>
          <van-tab title="已支付"></van-tab>
          <van-tab title=" " disabled></van-tab>
          <van-tab title=" " disabled></van-tab>
        </van-tabs>
      </div>
      <div :style="{height: navHeight + 44 + 'px'}"></div>
      <div v-if="cont === 0">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type hong" v-if="item.payStatus==1">待支付</div>
            <div class="item-type" v-else>已支付</div>
          </div>
          <div class="item-text">{{item.commodityName}}</div>
          <div class="item-text">{{item.crtTime}}</div>
          <div class="disflex item-set">
            <div class="flex"></div>
            <div>订单总价：</div>
            <div class="hong">¥{{item.finalPay}}</div>
          </div>
        </div>
      </div>
      <div v-if="cont === 1">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type hong">待支付</div>
          </div>
          <div class="item-text">{{item.commodityName}}</div>
          <div class="item-text">{{item.crtTime}}</div>
          <div class="disflex item-set">
            <div class="flex"></div>
            <div>订单总价：</div>
            <div class="hong">¥{{item.finalPay}}</div>
          </div>
        </div>
      </div>
      <div v-if="cont === 2">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type">已支付</div>
          </div>
          <div class="item-text">{{item.commodityName}}</div>
          <div class="item-text">{{item.crtTime}}</div>
          <div class="disflex item-set">
            <div class="flex"></div>
            <div>订单总价：</div>
            <div class="hong">¥{{item.finalPay}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="condition === 3">
      <div class="vant-tab order-nav" :style="{top: navHeight + 'px'}">
        <van-tabs :active="active" @change="onChange">
          <van-tab title="全部订单"></van-tab>
          <van-tab title="待支付" :info="payNum"></van-tab>
          <van-tab title="已支付"></van-tab>
          <van-tab title=" " disabled></van-tab>
          <van-tab title=" " disabled></van-tab>
        </van-tabs>
      </div>
      <div :style="{height: navHeight + 44 + 'px'}"></div>
      <div v-if="cont === 0">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type hong" v-if="item.payStatus==1">待支付</div>
            <div class="item-type" v-else>已支付</div>
          </div>
          <div class="item-text">{{item.commodityName}}</div>
          <div class="item-text">{{item.crtTime}}</div>
          <div class="disflex item-set">
            <div class="flex"></div>
            <div>订单总价：</div>
            <div class="hong">¥{{item.finalPay}}</div>
          </div>
        </div>
      </div>
      <div v-if="cont === 1">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type hong">待支付</div>
          </div>
          <div class="item-text">{{item.commodityName}}</div>
          <div class="item-text">{{item.crtTime}}</div>
          <div class="disflex item-set">
            <div class="flex"></div>
            <div>订单总价：</div>
            <div class="hong">¥{{item.finalPay}}</div>
          </div>
        </div>
      </div>
      <div v-if="cont === 2">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type">已支付</div>
          </div>
          <div class="item-text">{{item.commodityName}}</div>
          <div class="item-text">{{item.crtTime}}</div>
          <div class="disflex item-set">
            <div class="flex"></div>
            <div>订单总价：</div>
            <div class="hong">¥{{item.finalPay}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="condition === 4">
      <div class="vant-tab order-nav" :style="{top: navHeight + 'px'}">
        <van-tabs :active="active" @change="onChange">
          <van-tab title="全部订单"></van-tab>
          <van-tab title="待支付" :info="payNum"></van-tab>
          <van-tab title="已支付"></van-tab>
          <van-tab title=" " disabled></van-tab>
          <van-tab title=" " disabled></van-tab>
        </van-tabs>
      </div>
      <div :style="{height: navHeight + 44 + 'px'}"></div>
      <div v-if="cont === 0">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type hong" v-if="item.payStatus==1">待支付</div>
            <div class="item-type" v-else>已支付</div>
          </div>
          <div class="item-text">{{item.commodityName}}</div>
          <div class="item-text">{{item.crtTime}}</div>
          <div class="disflex item-set">
            <div class="flex"></div>
            <div>订单总价：</div>
            <div class="hong">¥{{item.finalPay}}</div>
          </div>
        </div>
      </div>
      <div v-if="cont === 1">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type hong">待支付</div>
          </div>
          <div class="item-text">{{item.commodityName}}</div>
          <div class="item-text">{{item.crtTime}}</div>
          <div class="disflex item-set">
            <div class="flex"></div>
            <div>订单总价：</div>
            <div class="hong">¥{{item.finalPay}}</div>
          </div>
        </div>
      </div>
      <div v-if="cont === 2">
        <div class="order-item" v-for="item in dataList" :key="item" @click="orderDetails(item.orderNo)">
          <div class="disflex item-title">
            <div class="flex">{{item.hotelName}}</div>
            <div class="item-type">已支付</div>
          </div>
          <div class="item-text">{{item.commodityName}}</div>
          <div class="item-text">{{item.crtTime}}</div>
          <div class="disflex item-set">
            <div class="flex"></div>
            <div>订单总价：</div>
            <div class="hong">¥{{item.finalPay}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationOrder from '../../../components/navigationOrder'
export default {
  data () {
    return {
      active: 0,
      cont: 0,
      dataList: [],
      payNum: '',
      condition: 1,
      navHeight: 0
    }
  },
  components: {
    navigationOrder
  },
  onLoad () {
    var that = this
    wx.getSystemInfo({
      success (system) {
        that.screenHeight = system.screenHeight
        let statusBarHeight = system.statusBarHeight
        let platformReg = /ios/i
        if (platformReg.test(system.platform)) {
          that.navHeight = 44 + statusBarHeight
        } else {
          that.navHeight = 48 + statusBarHeight
        }
      }
    })
  },
  onShow () {
    this.cont = 0
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.$http.post({// 全部订单
        url: '/order/order/orderListByPayStatu_V2',
        header: userInfo.token,
        data: {
          pageNum: '0',
          pageSize: '100',
          userId: userInfo.userId + '',
          payStatu: '0',
          commodityType: this.condition + '',
          commodityPayStatus: '0'
        }
      }).then(res => {
        console.log(res)
        res.data.mapList.forEach(e => {
          e.finalPay = e.finalPay.toFixed(2)
        })
        this.dataList = res.data.mapList
      })
      this.$http.post({// 待支付订单
        url: '/order/order/orderListByPayStatu_V2',
        header: userInfo.token,
        data: {
          pageNum: '0',
          pageSize: '100',
          userId: userInfo.userId + '',
          payStatu: '1',
          commodityType: this.condition + ''
        }
      }).then(res => {
        console.log(res)
        this.payNum = res.data.count
      })
    } else {
      this.dataList = []
    }
  },
  watch: {
    condition (a) {
      console.log(a, 's')
      let userInfo = wx.getStorageSync('userInfo')
      this.$http.post({// 全部订单
        url: '/order/order/orderListByPayStatu_V2',
        header: userInfo.token,
        data: {
          pageNum: '0',
          pageSize: '100',
          userId: userInfo.userId + '',
          payStatu: '0',
          commodityType: this.condition + '',
          commodityPayStatus: '0'
        }
      }).then(res => {
        console.log(res)
        res.data.mapList.forEach(e => {
          e.finalPay = e.finalPay.toFixed(2)
        })
        this.dataList = res.data.mapList
      })
      this.$http.post({// 待支付订单
        url: '/order/order/orderListByPayStatu_V2',
        header: userInfo.token,
        data: {
          pageNum: '0',
          pageSize: '100',
          userId: userInfo.userId + '',
          payStatu: '1',
          commodityType: this.condition + '',
          commodityPayStatus: '1'
        }
      }).then(res => {
        console.log(res)
        this.payNum = res.data.count
      })
    }
  },
  methods: {
    onChange (event) {
      let userInfo = wx.getStorageSync('userInfo')
      this.cont = event.mp.detail.index
      this.$http.post({
        url: '/order/order/orderListByPayStatu_V2',
        header: userInfo.token,
        data: {
          pageNum: '0',
          pageSize: '100',
          userId: userInfo.userId + '',
          payStatu: event.mp.detail.index + '',
          commodityType: this.condition + '',
          commodityPayStatus: event.mp.detail.index + ''
        }
      }).then(res => {
        console.log(res)
        res.data.mapList.forEach(e => {
          e.finalPay = e.finalPay.toFixed(2)
        })
        this.dataList = res.data.mapList
      })
    },
    orderDetails (orderNo) { // 订单详情
      console.log(orderNo)
      if (this.condition === 1) {
        wx.navigateTo({
          url: '../details/main?orderNo=' + orderNo
        })
      } else {
        wx.navigateTo({
          url: '../detailsDepartment/main?orderNo=' + orderNo + '&key=1'
        })
      }
    },
    orderPay (item) { // 订单支付
      console.log(item)
      let userInfo = wx.getStorageSync('userInfo')
      this.$http.post({
        url: '/order/ezt/orderPayByEzt',
        header: userInfo.token,
        data: {
          payType: '2',
          orderNo: item.orderNo,
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
              price: item.finalPay,
              hotelName: item.hotelName
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
              this.$http.post({// 全部订单
                url: '/order/order/orderListByPayStatu',
                header: userInfo.token,
                data: {
                  pageNum: '0',
                  pageSize: '100',
                  userId: userInfo.userId + '',
                  payStatu: '0'
                }
              }).then(res => {
                console.log(res, 'sdsdsds')
                this.cont = 0
                res.data.mapList.forEach(e => {
                  e.finalPay = e.finalPay.toFixed(2)
                })
                this.dataList = res.data.mapList
              })
              this.$http.post({// 待支付订单
                url: '/order/order/orderListByPayStatu',
                header: userInfo.token,
                data: {
                  pageNum: '0',
                  pageSize: '100',
                  userId: userInfo.userId + '',
                  payStatu: '1'
                }
              }).then(res => {
                console.log(res)
                this.payNum = res.data.count
              })
            }, 1000)
          }
        })
      })
    },
    orderTui (data) { // 申请退款
      wx.navigateTo({
        url: '../refund/main?data=' + JSON.stringify(data)
      })
    },
    commentGo (item) { // 立即点评
      wx.navigateTo({
        url: `../../my/commentGo/main?orderNo=${item.orderNo}&id=${item.orderId}`
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
              wx.showToast({
                title: '删除成功',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {
                  setTimeout(() => {
                    this.$http.post({// 全部订单
                      url: '/order/order/orderListByPayStatu',
                      header: userInfo.token,
                      data: {
                        pageNum: '0',
                        pageSize: '100',
                        userId: userInfo.userId + '',
                        payStatu: '0'
                      }
                    }).then(res => {
                      console.log(res)
                      this.cont = 0
                      res.data.mapList.forEach(e => {
                        e.finalPay = e.finalPay.toFixed(2)
                      })
                      this.dataList = res.data.mapList
                    })
                  }, 1500)
                }
              })
            })
          }
        }
      })
    },
    navKey (value) {
      this.condition = value
    }
  }
}
</script>
<style lang="scss" scoped>
.order-nav {position: fixed;left: 0;width: 100%;}
.order-item {margin-bottom: 15px;padding: 20px 15px;background-color: #fff;
  .item-title {font-size: 16px;font-weight: bold;margin-bottom: 15px;
    .item-type {margin-right: 5px;}
  }
  .item-text {font-size: 14px;color: #666;margin-bottom: 5px;}
  .item-set {padding-top: 14px;margin-top: 20px;border-top: 1px solid #D9D9D9;font-size: 15px;
    .cancel, .pay {width: 84px;padding: 5px 0;border: 1px solid #999;border-radius: 4px;color: #999;text-align: center;}
    .pay {color: #C0A369;border: 1px solid #C0A369;margin-left: 15px;}
  }
  .hong {color: #ED5858;}
}
</style>


