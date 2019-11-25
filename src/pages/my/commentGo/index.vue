<template>
  <div style="background-color: #fff;height: 100%;">
    <div class="browse-item disflex">
      <div class="item-img"><img :src="orderInfo.coverImage"></div>
      <div class="flex item-cont">
        <div class="item-name">{{orderInfo.hotelName}}</div>
        <div class="mgb">{{orderInfo.roomName}}</div>
        <div>{{orderInfo.inTime}} - {{orderInfo.outTime}} 共{{orderInfo.days}}晚 {{orderInfo.rooms}}间</div>
      </div>
    </div>
    <div style="height: 15px;background-color: #F9F9F9;"></div>
    <div class="idea-cont">
      <textarea placeholder="将入住体验的感觉，分享给大家～" placeholder-style="color:#999;" maxlength="150" v-model="val"></textarea>
      <div class="textarea-num">{{textNum}}/150</div>  
    </div>
    <div class="xing-wrapper">
      <div style="font-size: 14px;margin-bottom: 10px;">入住体验评分</div>
      <div class="disflex xing-item"><span class="item-text">酒店服务</span><span class="flex"><van-rate :value="value1" :size="22" :id="1" icon="http://oss.jiatu360.cn/xcx/icon-xxh.png" void-icon="http://oss.jiatu360.cn/xcx/icon-xx.png" @change="onChange"/></span></div>
      <div class="disflex xing-item"><span class="item-text">酒店设施</span><span class="flex"><van-rate :value="value2" :size="22" :id="2" icon="http://oss.jiatu360.cn/xcx/icon-xxh.png" void-icon="http://oss.jiatu360.cn/xcx/icon-xx.png" @change="onChange"/></span></div>
      <div class="disflex xing-item"><span class="item-text">酒店卫生</span><span class="flex"><van-rate :value="value3" :size="22" :id="3" icon="http://oss.jiatu360.cn/xcx/icon-xxh.png" void-icon="http://oss.jiatu360.cn/xcx/icon-xx.png" @change="onChange"/></span></div>
      <div class="disflex xing-item"><span class="item-text">酒店网络</span><span class="flex"><van-rate :value="value4" :size="22" :id="4" icon="http://oss.jiatu360.cn/xcx/icon-xxh.png" void-icon="http://oss.jiatu360.cn/xcx/icon-xx.png" @change="onChange"/></span></div>
    </div>
    <div class="add-btn" @click="submit">提交</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      val: '',
      textNum: 0,
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      orderInfo: {},
      orderId: ''
    }
  },
  onLoad (options) {
    let userInfo = wx.getStorageSync('userInfo')
    if (options.orderNo) {
      this.orderId = options.id
      this.$http.get({
        url: '/order/order/getImageAndPhone?orderNo=' + options.orderNo,
        header: userInfo.token
      }).then(res => {
        console.log(res)
        this.orderInfo = res.data
      })
    } else {
      this.orderInfo = JSON.parse(options.data)
      this.orderId = JSON.parse(options.data).orderId
    }
  },
  methods: {
    onChange (event) {
      let id = event.mp.currentTarget.id
      if (id === '1') {
        this.value1 = event.mp.detail
      } else if (id === '2') {
        this.value2 = event.mp.detail
      } else if (id === '3') {
        this.value3 = event.mp.detail
      } else {
        this.value4 = event.mp.detail
      }
    },
    submit () {
      let userInfo = wx.getStorageSync('userInfo')
      this.$http.post({
        url: '/order/order/saveOrderComment',
        header: userInfo.token,
        data: {
          orderId: this.orderId + '',
          content: this.val,
          serviceScore: this.value1 + '',
          seatScore: this.value2 + '',
          hygieneScore: this.value3 + '',
          priceScore: this.value4 + ''
        }
      }).then(res => {
        console.log(res)
        wx.navigateBack({
          delta: 1
        })
      })
    }
  },
  watch: {
    'val' (res) {
      this.textNum = res.length
    }
  }
}
</script>

<style lang="scss" scoped>
.browse-item {padding: 20px 15px;font-size: 11px;color: #666;border-top: 1px solid #D9D9D9;
  .item-img {width: 60px;height: 60px;}
  .item-cont {margin-left: 10px;
    .item-name {font-size: 14px;color: #262626;margin-bottom: 3px;}
  }
  .mgb {margin-bottom: 3px;}
}
.idea-cont {padding-bottom: 9px;margin: 20px 15px 0 15px;font-size: 11px;position: relative;border-bottom: 1px solid #D9D9D9;
  textarea {width: 100%;height: 80px;}
  .textarea-num {font-size: 11px;color: #999;position: absolute;right: 11px;bottom: 9px;}
}
.xing-wrapper {padding: 15px;
  .xing-item{font-size: 11px;margin-bottom: 10px;
    .item-text {margin-right: 10px;}
  }
}
</style>