<template>
  <div style="padding: 17px 24px;background-color: #fff;height: 100%;">
    <div class="bg-img"><img src="../../../assets/img2.png"></div>
    <div class="btn-yaoqing">立即邀请</div>
    <div class="invite"><img src=""></div>
    <div class="invite-wrapper">
      <div>我的邀请</div>
      <div class="disflex invite-cont">
        <div class="invite-item">
          <div><span class="hong">1</span>人</div>
          <div>已成功邀请</div>
        </div>
        <div class="invite-item">
          <div><span class="hong">88</span>元</div>
          <div>已获取奖励</div>
        </div>
      </div>
    </div>
    <div class="btn-xiangqing" @click="xiangqing">邀请详情 ></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    xiangqing () {
      wx.navigateTo({
        url: '../inviteDetails/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-img {width: 238px;height: 195px;margin: auto;}
.btn-yaoqing {width: 100px;line-height: 27px;background-color: #F9DFAB;text-align: center;border-radius: 17px;margin: -24px auto 20px;}
.invite-wrapper {background-color: #F8F5F0;border-radius: 8px;padding: 20px 10px;text-align: center;
  .invite-cont {background-color: #fff;margin-top: 20px;padding: 10px 0;
    .invite-item {margin: 0 30px;}
  }
}
.btn-xiangqing {width: 80px;line-height: 27px;text-align: center;font-size: 12px;color: #999;border-radius: 8px;border: 1px solid rgba(217,217,217,1);margin: 10px auto 0;}
</style>