<template>
  <div style="height: 100%;background-color: #fff;">
    <div class="coupon-text">优惠券、折扣券不可共享，只限单张使用</div>
    <div class="coupon-wrapper">
      <div class="coupon-item disflex" v-for="(item,index) in dataList" :key="index" @click="select(index,item)">
        <div class="item-left">
          <div class="left-price">¥<span class="num">{{item.reduceAmount}}元</span></div>
          <div>优惠券</div>
        </div>
        <div class="flex item-right">
          <div class="text">{{item.couponName}}</div>
          <div class="mgb">有效期：{{item.effectiveTime}}-{{item.expireTime}}</div>
          <div>适用范围：{{item.hotelIds}}</div>
        </div>
        <div class="icon22"><img :src="show == index?'../../../assets/icon-xz.png':'http://oss.jiatu360.cn/xcx/icon-xh.png'"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: -1,
      dataList: []
    }
  },
  onLoad (options) {
    let userInfo = wx.getStorageSync('userInfo')
    let userId = userInfo.userId + ''
    this.$http.get({
      url: '/user/coupon/getCouponListByHotelId?userId=' + userId + '&hotelId=' + options.hotelId + '&amount=' + options.price,
      header: userInfo.token
    }).then(res => {
      console.log(res)
      res.data.forEach(el => {
        el.effectiveTime = el.effectiveTime.substr(0, 10)
        el.expireTime = el.expireTime.substr(0, 10)
      })
      this.dataList = res.data
    })
  },
  methods: {
    select (index, item) {
      this.show = index
      getApp().globalData.data = item
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon-text {font-size: 11px;font-weight: 400;color: #999;padding: 13px 0;text-align: center;}
.coupon-wrapper {padding: 0 15px;
  .coupon-item {margin-bottom: 15px;padding: 13px 11px;background-image: url('http://oss.jiatu360.cn/xcx/couponBg.png');background-size: 100% 100%;
    .item-left {margin-right: 29px;font-size: 15px;font-weight: 400;text-align: center;
      .left-price {font-size: 13px;color: #fff;margin-bottom: 3px;
        .num {font-size: 24px;}
      }
    }
    .item-right {font-size: 10px;color: #999;
      .text {font-size: 14px;color: #C0A369;margin-bottom: 5px;}
      .mgb {margin-bottom: 5px;}
    }
  }
}
</style>
