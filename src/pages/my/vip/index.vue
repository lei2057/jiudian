<template>
  <div style="background-color: #fff;height: 100%;">
    <div style="font-size: 14px;text-align: center;">MEMBER BENEFITS</div>
    <div style="letter-spacing: 5px;margin: 3px -5px 10px 0;font-size: 12px;color: #C0A369;text-align: center;">会员尊享专属礼遇</div>
    <div class="swiper-container">
      <swiper class="swiper"  @change="swiperChange" previous-margin="40px" next-margin="40px" circular="true">
        <block v-for="item in slider" :key="item">
          <swiper-item class="disflex" :data-url="item.linkUrl">
            <image :class="swiperCurrent==item.imgId?'img_current':'img'" :src="item.picUrl" mode="widthFix"></image>
            <div class="icon-wt" :class="swiperCurrent==item.imgId?'':'icon-wtx'" @click="wenti(swiperCurrent)"><img src="../../../assets/icon-wt.png" alt=""></div>
            <div class="icon-vip" :class="swiperCurrent==item.imgId?'':'icon-vipx'"><img :src="current==item.linkUrl?'../../../assets/icon-vipx.png':''" alt=""></div>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="integral-wrapper">
      <div class="integral-title">{{dataList.name}}权益</div>
      <div class="integral-list">
        <div class="integral-item" v-for="item in dataList.userVipBenefits" :key="item">
          <div class="icon42" style="border-radius: 50%;overflow: hidden;"><img :src="item.image"></div>
          <div>{{item.title}}</div>
          <div class="integral-text">{{item.subject}}</div>
        </div>
      </div>
    </div>
    <div class="vant-popup">
      <van-popup :show="show" @close="onClose" class="aa">
        <div class="popup-wrapper">
          <div class="popup-title"><span>| </span><span>{{questionData[swiperCurrent].name}}升级规则</span></div>
          <div class="popup-text">{{questionData[swiperCurrent].text}}</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slider: [
        { imgId: '0', linkUrl: 1, picUrl: 'http://oss.jiatu360.cn/xcx/vip1.png' },
        { imgId: '1', linkUrl: 2, picUrl: 'http://oss.jiatu360.cn/xcx/vip2.png' },
        { imgId: '2', linkUrl: 3, picUrl: 'http://oss.jiatu360.cn/xcx/vip3.png' },
        { imgId: '3', linkUrl: 4, picUrl: 'http://oss.jiatu360.cn/xcx/vip4.png' },
        { imgId: '4', linkUrl: 5, picUrl: 'http://oss.jiatu360.cn/xcx/vip5.png' }
      ],
      swiperCurrent: 0,
      current: 0,
      dataList: [],
      show: false,
      questionData: [
        {name: '星会员', text: '注册成为印记会员，无入住记录和消费记录的，会员等级为星会员；星会员若无消费或入住记录的，一直保持星会员等级'},
        {name: '银会员', text: '累积满1间夜后可升级为银会员'},
        {name: '金会员', text: '累积满5间夜后可升级为金会员'},
        {name: '铂金会员', text: '累积满20间夜后可升级为铂金会员'},
        {name: '黑金会员', text: '两年内连续每年25间夜，可升级为黑金会员'}
      ]
    }
  },
  onShow () {
    let vipLevel = wx.getStorageSync('userInfo').vipLevel
    let token = wx.getStorageSync('userInfo').token
    this.$http.get({
      url: `/user/userVipBenefits/getVipBenefitsList/${vipLevel}`,
      header: token
    }).then(res => {
      console.log(res)
      this.dataList = res.data.userVipBenefitsVos[0]
      this.current = res.data.current
    })
  },
  watch: {
    swiperCurrent (i) {
      let vipLevel = wx.getStorageSync('userInfo').vipLevel
      let token = wx.getStorageSync('userInfo').token
      this.$http.get({
        url: `/user/userVipBenefits/getVipBenefitsList/${vipLevel}`,
        header: token
      }).then(res => {
        this.dataList = res.data.userVipBenefitsVos[i]
        this.current = res.data.current
      })
    }
  },
  methods: {
    swiperChange (e) {
      this.swiperCurrent = e.mp.detail.current
    },
    wenti (index) {
      this.show = true
    },
    onClose () {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-container{position: relative;
  .swiper{padding-top: 8px;height: 187px;text-align: center;
    .img_current{width: 100%;height: 100% !important;border-radius: 10px;transition: all .2s ease-in 0s;}
    .img{width: 88%;height: 88% !important;border-radius: 10px;transition: all .2s ease-in 0s;}
    .icon-wt {width: 14px;height: 14px;position: absolute;bottom: 11px;right: 13px;transition: all .2s ease-in 0s;}
    .icon-wtx {bottom: 22px;right: 26px;transition: all .2s ease-in 0s;}
    .icon-vip {width: 61px;height: 20px;position: absolute;top: 0;right: 0;transition: all .2s ease-in 0s;}
    .icon-vipx {top: 11px;right: 18px;transition: all .2s ease-in 0s;}
  }
}
.integral-wrapper {margin-top: 20px;font-size: 11px;text-align: center;
  .integral-title {font-size: 12px;color: #C0A369;}
  .integral-list {padding: 0 20px;margin-top: 25px;display: flex;flex-flow: row wrap;align-content: flex-start;
    .integral-item {box-sizing: border-box;flex: 0 0 25%;padding-bottom: 19px;font-size: 10px;
      .integral-text {color: #999;}
    }
  }
}
.popup-wrapper {padding: 20px;
  .popup-title {font-size: 17px;color: #C0A369;}
  .popup-text {font-size: 12px;color: #666;margin-top: 20px;}
}
</style>