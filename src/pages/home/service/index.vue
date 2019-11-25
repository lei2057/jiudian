<template>
  <div style="height: 100%;background-color: #fff;">
    <div class="bg-img"><img :src="dataInfo.images"></div>
    <div class="service-title">
      <div class="service-num">¥ {{dataInfo.price}}</div>
      <div>{{dataInfo.name}}</div>
    </div>
    <div class="service-cont">
      <div>商品描述</div>
      <div class="service-text" v-html="text"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataInfo: {},
      text: ''
    }
  },
  onLoad (options) {
    let userInfo = wx.getStorageSync('userInfo')
    this.$http.get({
      url: '/hotel/hotelService/searchById?id=' + options.id,
      header: userInfo.token
    }).then(res => {
      this.dataInfo = res.data
      this.text = res.data.text.replace(/\n|\r\n/g, '<br/>')
    })
  }
}
</script>

<style lang="scss" scoped>
.bg-img {width: 100%;height: 209px;}
.service-title {padding: 12px 15px;font-size: 15px;font-weight: 400;border-bottom: 1px solid #D9D9D9;
  .service-num {font-size: 20px;color: #ED5858;margin-bottom: 10px;}
}
.service-cont {padding: 16px 15px;font-size: 12px;font-weight: 400;color: #666;
  .service-text {font-size: 10px;color: #999;margin-top: 8px;}
}
</style>
