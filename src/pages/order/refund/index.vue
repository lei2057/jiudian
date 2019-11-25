<template>
  <div>
    <div class="refund-info disflex">
      <div class="info-img"><img :src="hotelInfo.coverImage"></div>
      <div class="info-cont flex">
        <div class="info-title">{{dataInfo.hotelName}}</div>
        <div>{{dataInfo.roomName}}  {{dataInfo.vipName}}</div>
        <div>{{dataInfo.inTime}} - {{dataInfo.outTime}}  共{{dataInfo.days}}晚 {{dataInfo.rooms}}间</div>
      </div>
    </div>
    <div class="refund-price disflex">退款总金额：<span class="refund-num flex">¥ {{dataInfo.finalPay}}</span></div>
    <div class="refund-explain">
      <div class="explain-title">退款说明：</div>
      <div class="explain-text">
        <textarea placeholder="请输入退订说明～" placeholder-style="color:#999;" maxlength="200" v-model="val"></textarea>
        <div class="textarea-num">{{textNum}}/200</div>
      </div>
    </div>
    <div class="refund-details">
      <div class="mgb">退款金额：¥ {{dataInfo.finalPay}}</div>
      <!-- <div class="mgb">申请时间：2019年07月15日</div> -->
      <div><span style="letter-spacing: 4px;margin-right: -4px;">订单号：</span>{{dataInfo.orderNo}}</div>
      <div class="disflex refund-call" @click="phone"><div class="icon20" style="margin-right: 8px;"><img src="../../../assets/icon-dhh.png"></div>联系酒店</div>
    </div>
    <div class="refund-tijiao" @click="submit">提交</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      val: '',
      textNum: 0,
      dataInfo: {},
      hotelInfo: {}
    }
  },
  onLoad (options) {
    this.val = ''
    this.dataInfo = JSON.parse(options.data)
    let userInfo = wx.getStorageSync('userInfo')
    this.$http.get({
      url: '/order/order/getImageAndPhone?orderNo=' + this.dataInfo.orderNo,
      header: userInfo.token
    }).then(res => {
      console.log(res)
      this.hotelInfo = res.data
    })
  },
  methods: {
    phone () {
      wx.makePhoneCall({
        phoneNumber: this.hotelInfo.hotelPhone
      })
    },
    submit () {
      let userInfo = wx.getStorageSync('userInfo')
      if (!this.val) {
        wx.showToast({
          title: '请输入退款说明',
          icon: 'none',
          duration: 1500,
          mask: false
        })
      } else {
        this.$http.get({
          url: '/order/ezt/eztRefund?orderNo=' + this.dataInfo.orderNo + '&refundReason=' + this.val,
          header: userInfo.token
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: '提交成功',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result) => {
              setTimeout(() => {
                wx.switchTab({
                  url: '../index/main'
                })
              }, 1500)
            }
          })
        })
      }
    }
  },
  watch: {
    'val' (res) {
      this.textNum = this.val.length
    }
  }
}
</script>
<style lang="scss" scoped>
.refund-info {padding: 8px 20px;margin-bottom: 10px;background-color: #fff;border-top: 1px solid #D9D9D9;
  .info-img {width: 73px;height: 73px;margin-right: 12px;}
  .info-cont {padding: 6px 0;font-size: 11px;color: #888;
    .info-title {font-size: 15px;font-weight: bold;color: #262626;margin-bottom: 5px;}
  }
}
.refund-price {padding: 15px;font-size: 14px;background-color: #fff;margin-bottom: 10px;
  .refund-num {font-size: 18px;font-weight: bold;color: #ED5858;margin-left: 5px;}
}
.refund-explain {padding: 10px 15px;background-color: #fff;margin-bottom: 10px;
  .explain-title {font-size: 14px;margin-bottom: 5px;}
  .explain-text {border: 1px solid #D9D9D9;border-radius: 8px;padding: 8px 12px;margin-bottom: 5px;font-size: 11px;position: relative;
    textarea {width: 100%;}
    .textarea-num {font-size: 11px;color: #999;position: absolute;right: 11px;bottom: 9px;}
  }
}
.refund-details {padding: 15px;font-size: 11px;color: #888;background-color: #fff;
  .refund-call {border-top: 1px solid #D9D9D9;padding-top: 15px;margin-top: 15px;font-size: 12px;color: #262626;}
  .mgb {margin-bottom: 3px;}
}
.refund-tijiao {width: 100%;line-height: 50px;position: fixed;left: 0;bottom: 0;text-align: center;font-size: 16px;background-color: #C0A369;color: #fff;}
</style>