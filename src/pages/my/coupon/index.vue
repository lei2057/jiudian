<template>
  <div>
    <div class="vant-tab">
      <van-tabs :active="active" @change="onChange">
        <van-tab title="未使用"></van-tab>
        <van-tab title="已使用"></van-tab>
        <van-tab title="已过期"></van-tab>
      </van-tabs>
    </div>
    <div v-if="cont === 0">
      <div class="coupon-wrapper">
        <div class="coupon-item disflex" v-for="item in couponList" :key="item">
          <div class="flex item-left">
            <div class="text">{{item.couponName}}</div>
            <div class="mgb">有效期：{{item.effectiveTime}}-{{item.expireTime}}</div>
            <div>适用范围：{{item.hotelIds}}</div>
          </div>
          <div class="item-right">
            <div class="left-price">¥<span class="num">{{item.reduceAmount}}元</span></div>
            <div v-text="item.common == 1?'优惠券':'折扣券'"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="cont === 1">
      <div class="coupon-wrapper">
        <div class="coupon-items disflex" v-for="item in couponList" :key="item">
          <div class="flex item-left">
            <div class="text">{{item.couponName}}</div>
            <div class="mgb">有效期：{{item.effectiveTime}}-{{item.expireTime}}</div>
            <div>适用范围：{{item.hotelIds}}</div>
          </div>
          <div class="item-right">
            <div class="left-price">¥<span class="num">{{item.reduceAmount}}元</span></div>
            <div class="white" v-text="item.common == 1?'优惠券':'折扣券'"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="cont === 2">
      <div class="coupon-wrapper">
        <div class="coupon-items disflex" v-for="item in couponList" :key="item">
          <div class="flex item-left">
            <div class="text">{{item.couponName}}</div>
            <div class="mgb">有效期：{{item.effectiveTime}}-{{item.expireTime}}</div>
            <div>适用范围：{{item.hotelIds}}</div>
          </div>
          <div class="item-right">
            <div class="left-price">¥<span class="num">{{item.reduceAmount}}元</span></div>
            <div class="white" v-text="item.common == 1?'优惠券':'折扣券'"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0, // 导航初始值
      cont: 0, // 显示内容
      couponList: []
    }
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    this.$http.get({
      url: `/user/coupon/getCouponList/0/${userInfo.userId}`,
      header: userInfo.token
    }).then(res => {
      console.log(res)
      res.data.forEach(el => {
        el.effectiveTime = el.effectiveTime.substr(0, 10)
        el.expireTime = el.expireTime.substr(0, 10)
      })
      this.couponList = res.data
    })
  },
  methods: {
    onChange (event) {
      let userInfo = wx.getStorageSync('userInfo')
      let index = event.mp.detail.index
      this.cont = index
      this.$http.get({
        url: `/user/coupon/getCouponList/${index}/${userInfo.userId}`,
        header: userInfo.token
      }).then(res => {
        console.log(res)
        res.data.forEach(el => {
          el.effectiveTime = el.effectiveTime.substr(0, 10)
          el.expireTime = el.expireTime.substr(0, 10)
        })
        this.couponList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon-wrapper {padding: 19px 16px;
  .coupon-item,.coupon-items {margin-bottom: 15px;padding: 13px 11px;
    .item-left {font-size: 10px;color: #999;margin-left: 9px;
      .text {font-size: 14px;color: #C0A369;margin-bottom: 5px;}
      .mgb {margin-bottom: 5px;}
    }
    .item-right {width: 74px;font-size: 15px;font-weight: 400;text-align: center;
      .left-price {font-size: 13px;color: #fff;margin-bottom: 5px;
        .num {font-size: 24px;}
      }
      .white {color: #fff;}
    }
  }
  .coupon-item {background-image: url('http://oss.jiatu360.cn/xcx/couponBg1.png');background-size: 100% 100%;}
  .coupon-items {background-image: url('http://oss.jiatu360.cn/xcx/couponBg2.png');background-size: 100% 100%;}
}
</style>