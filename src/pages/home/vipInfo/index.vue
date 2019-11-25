<template>
  <div style="height: 100%;background-color: #fff;">
    <navigation-bar
    :navBackgroundColor="''"
    :titleColor="'#ffffff'"
    :title="''"
    :back-visible="true"></navigation-bar>
    <div class="bg-img"><img src="http://oss.jiatu360.cn/xcx/bg4.png"></div>
    <div class="integral">
      <div class="integral-num">{{dataList.point}}</div>
      <div>当前积分</div>
    </div>
    <div class="integral-wrapper">
      <div class="integral-title">您当前是{{vipName}}</div>
      <div>入住该酒店可享受以下权益</div>
      <div class="integral-list">
        <div class="integral-item" v-for="item in dataList.userVipBenefits" :key="item">
          <div class="icon42" style="border-radius: 50%;overflow: hidden;"><img :src="item.image"></div>
          <div>{{item.title}}</div>
          <div class="integral-text">{{item.subject}}</div>
        </div>
      </div>
    </div>
    <div class="integral-out icon20" @click="close"><img src="../../../assets/cha.png"></div>
  </div>
</template>

<script>
import navigationBar from '../../../components/navigationBar'
export default {
  data () {
    return {
      dataList: {},
      vipName: ''
    }
  },
  components: {
    navigationBar
  },
  onLoad (options) {
    this.vipName = options.data
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    this.$http.get({
      url: `/user/userVipBenefits/getUserVipBenefits/${userInfo.userId}/${userInfo.vipLevel}`,
      header: userInfo.token
    }).then(res => {
      console.log(res)
      this.dataList = res.data
    })
  },
  methods: {
    close () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-img {width: 100%;height: 169px;}
.integral {width: 100%;position: absolute;top: 80px;left: 0;text-align: center;color: #C0A369;font-size: 10px;
  .integral-num {font-size: 20px;font-weight: bold;margin-bottom: 3px;}
}
.integral-wrapper {margin-top: 12px;font-size: 11px;text-align: center;
  .integral-title {font-size: 20px;margin-bottom: 2px;}
  .integral-list {padding: 0 20px;margin-top: 25px;display: flex;flex-flow: row wrap;align-content: flex-start;
    .integral-item {box-sizing: border-box;flex: 0 0 25%;padding-bottom: 19px;font-size: 10px;
      .integral-text {color: #999;}
    }
  }
}
.integral-out {margin: 57px auto 0;}
</style>
