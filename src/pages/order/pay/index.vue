<template>
  <div style="background: #fff;height: 100%;">
    <div class="pay-img"><img src="../../../assets/icon-pay.png"></div>
    <div class="pay-text">订单支付成功！</div>
    <div class="info-cont" style="border-bottom: 1px solid #D9D9D9;">
      <div class="info-item disflex">
        <div>订单编号:</div>
        <div class="flex info-text">{{dataInfo.orderNo}}</div>
      </div>
      <div class="info-item disflex">
        <div>实付金额:</div>
        <div class="flex info-text">{{dataInfo.price}}元</div>
      </div>
      <div class="info-item disflex">
        <div>支付方式:</div>
        <div class="flex info-text">微信支付</div>
      </div>
    </div>
    <div class="info-cont">
      <div class="info-item disflex">
        <div>支付账户:</div>
        <div class="flex info-text">{{dataInfo.hotelName}}</div>
      </div>
    </div>
    <div class="pay-btn" @click="order">查看订单</div>
    <div class="pay-btn-index" @click="shouye">返回首页</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataInfo: {},
      key: ''
    }
  },
  onLoad (options) {
    console.log(options)
    this.dataInfo = JSON.parse(options.data)
    this.key = options.key
  },
  methods: {
    order () {
      if (this.key === '1') {
        wx.redirectTo({
          url: '../detailsDepartment/main?orderNo=' + this.dataInfo.orderNo
        })
      } else {
        wx.redirectTo({
          url: '../details/main?orderNo=' + this.dataInfo.orderNo
        })
      }
    },
    shouye () {
      wx.switchTab({
        url: '../../home/index/main'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.pay-img {width: 54px;height: 54px;margin: auto;padding-top: 30px;}
.pay-text {text-align: center;padding: 10px 0;font-size: 15px;}
.info-cont {padding: 10px 15px;
  .info-item {padding: 5px 0;font-size: 14px;color: #888;
    .info-text {margin-left: 10px;}
  }
}
.pay-btn {width: 240px;height: 44px;line-height: 44px;border-radius: 8px;background: rgba(192,163,105,1);color: #fff;text-align: center;margin: 78px auto 30px;}
.pay-btn-index {width: 240px;height: 44px;line-height: 44px;border-radius: 8px;border: 1px solid rgba(192,163,105,1);color: rgba(192,163,105,1);text-align: center;margin: auto;}
</style>