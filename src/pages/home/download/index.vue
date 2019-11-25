<template>
  <div style="background-color: #fff;height: 100%;">
    <div class="logo"><img src="../../../assets/logo2.png"></div>
    <div class="text">随时随地,一键预约酒店出行、旅游不用愁</div>
    <div class="bgImg"><img src="../../../assets/register-img.png"></div>
    <div class="btn disflex" style="margin-top:44px;margin-bottom:24px;" @click="apple">
      <div class="icon"><img src="../../../assets/apple.png"></div>
      <div>Iphone版下载</div>
    </div>
    <a href="http://api.tvt8.cn/g/mfu5c9">ssss</a>
    <div class="btn disflex">
      <div class="icon"><img src="../../../assets/anzhuo.png"></div>
      <div>Android版下载</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: {},
      vipName: ''
    }
  },
  methods: {
    apple () {
      wx.navigateTo({
        url: 'http://api.tvt8.cn/g/mfu5c9'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {width: 50px;height: 50px;margin: auto;padding-top: 30px;}
.text {width: 210px;font-size: 16px;color: #AB915C;text-align: center;margin: 10px auto;letter-spacing: 3px;}
.bgImg {height: 262px;}
.btn {width: 260px;height: 44px;border: 1px solid #262626;border-radius: 22px;font-size: 16px;margin: auto;
  .icon {width: 24px;height: 24px;margin-right: 5px;}
}
</style>
