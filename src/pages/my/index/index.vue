<template>
  <div>
    <div class="bg-img"><img src="http://oss.jiatu360.cn/xcx/bg3.png"></div>
    <div class="my-wrapper">
      <div class="disflex my" v-if="show">
        <div class="my-photo"><img src="../../../assets/toux.png"></div>
        <div class="flex my-info">
          <div class="my-name">YJ_{{userInfo.phone}}</div>
          <div v-text="vipLevelName==0?'您是星会员':vipLevelName==1?'您是白银会员':vipLevelName==2?'您是黄金会员':vipLevelName==3?'您是铂金会员':'您是黑金会员'"></div>
        </div>
      </div>
      <div v-else class="login-btn">
        <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">登陆</button>
      </div>
      <div class="my-vip">
        <div>MEMBER BENEFITS</div>
        <div @click="vipGo">
          <div class="vip-text">会员权益</div>
          <div class="icon8" style="margin: auto;"><img src="../../../assets/icon-xiah.png"></div>
        </div>
      </div>
      <div class="my-option">
        <div class="option-list">
          <div class="option-text">我的酒店</div>
          <div class="disflex option-item">
            <div class="flex item" @click="collectGo">
              <div class="icon30"><img src="../../../assets/icon-12.png"></div>
              <div>收藏酒店</div>
            </div>
            <div class="flex item" @click="browseGo">
              <div class="icon30"><img src="../../../assets/icon-13.png"></div>
              <div>浏览历史</div>
            </div>
            <div class="flex item" @click="hotleGo">
              <div class="icon30"><img src="../../../assets/icon-14.png"></div>
              <div>曾住酒店</div>
            </div>
            <div class="flex item" @click="assessGo">
              <div class="icon30"><img src="../../../assets/icon-15.png"></div>
              <div>评价订单</div>
            </div>
          </div>
        </div>
        <div class="option-list1">
          <div class="option-text">我的钱包</div>
          <div class="disflex option-item">
            <div class="flex item" @click="couponGo">
              <div class="icon30"><img src="../../../assets/icon-16.png"></div>
              <div>优惠券</div>
            </div>
            <div class="flex item" @click="jifenGo">
              <div class="icon30"><img src="../../../assets/icon-17.png"></div>
              <div>我的积分</div>
            </div>
            <div class="flex item" @click="usedInfoGo">
              <div class="icon30"><img src="../../../assets/icon-18.png"></div>
              <div>常用信息</div>
            </div>
            <div class="flex item" @click="ideaGo">
              <div class="icon30"><img src="../../../assets/icon-19.png"></div>
              <div>意见反馈</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: -190px 0 12px 34px;font-size: 15px;">邀请好友</div>
    <div style="height: 50px;"><img src="../../../assets/invite.png" @click="getQrCode"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wxLoginCode: '', // code
      userInfo: {},
      show: false,
      qrCodeImg: [],
      vipLevelName: ''
    }
  },
  onLoad () {
    var that = this
    wx.checkSession({
      success (res) {
        console.log(res)
        if (wx.getStorageSync('userInfo')) {
          that.show = true
        }
      },
      fail (res) {
        // session_key 已经失效，需要重新执行登录流程
        console.log(res)
        that.show = false
        wx.removeStorageSync('userInfo')
      }
    })
  },
  onShow () {
    this.userInfo = wx.getStorageSync('userInfo')
    if (wx.getStorageSync('userInfo')) {
      this.$http.get({
        url: `/user/userInfo/getUserInfo/${this.userInfo.userId}`,
        header: this.userInfo.token
      }).then(res => {
        this.vipLevelName = res.data.vipLevel
      })
    }
  },
  computed: {

  },
  watch: {
    userInfo (res) {
      if (res.phone) {
        if (this.qrCodeImg.length < 1) {
          this.$http.get({
            url: `/user/xcxShareQRCode/${res.phone}`,
            header: res.token
          }).then(res => {
            this.qrCodeImg.push(res.data.shareQR)
          })
        }
      }
    }
  },
  methods: {
    onClose () {
      this.show1 = false
    },
    getQrCode () { // 邀请好友
      if (this.userInfo) {
        this.$http.get({
          url: `/user/xcxShareQRCode/${this.userInfo.phone}`,
          header: this.userInfo.token
        }).then(res => {
          this.qrCodeImg = []
          this.qrCodeImg.push(res.data.shareQR)
        })
        this.previewImage()
      } else {
        wx.showToast({
          title: '登陆即可体验',
          icon: 'none',
          image: '',
          duration: 1500
        })
      }
    },
    previewImage (e) { // 二维码分享
      wx.previewImage({
        current: this.qrCodeImg[0],
        urls: this.qrCodeImg
      })
    },
    getPhoneNumber (e) { // 登陆
      let sharePhone = wx.getStorageSync('sharePhone')
      if (e.mp.detail.errMsg === 'getPhoneNumber:ok') {
        wx.login({
          success: (res) => {
            this.$http.post({
              url: '/user/xcxLogin',
              data: {
                code: res.code,
                ivStr: e.mp.detail.iv,
                encDataStr: e.mp.detail.encryptedData,
                sharePhone: sharePhone
              }
            }).then(res => {
              console.log(res)
              this.show = true
              this.userInfo = res.data
              this.vipLevelName = res.data.vipLevel
              wx.setStorageSync('userInfo', res.data)
            })
          }
        })
      }
    },
    collectGo () { // 收藏酒店
      wx.navigateTo({
        url: '../collect/main'
      })
    },
    browseGo () { // 浏览历史
      wx.navigateTo({
        url: '../browse/main'
      })
    },
    hotleGo () { // 曾住酒店
      wx.navigateTo({
        url: '../history/main'
      })
    },
    assessGo () { // 评价订单
      wx.navigateTo({
        url: '../comment/main'
      })
    },
    couponGo () { // 优惠券
      wx.navigateTo({
        url: '../coupon/main'
      })
    },
    jifenGo () { // 积分
      wx.navigateTo({
        url: '../jifen/main'
      })
    },
    usedInfoGo () { // 常用信息
      wx.navigateTo({
        url: '../usedInfo/main'
      })
    },
    vipGo () { // 会员权益
      wx.navigateTo({
        url: '../vip/main'
      })
    },
    ideaGo () { // 意见反馈
      wx.navigateTo({
        url: '../idea/main'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.bg-img {width: 100%;height: 260px;}
.login-btn {padding-top: 30px;text-align: left;
  button {width: 100px;line-height: 30px;text-align: center;border-radius: 10px;background-color: #DBBA77;font-size: 15px;}
}
.my-wrapper {width: 100%;position: relative;top: -200px;left: 0;
  .my {margin-left: 27px;
    .my-photo {width: 60px;height: 60px;border-radius: 50%;overflow: hidden;}
    .my-info {margin-left: 13px;font-size: 14px;color: #DBBA77;
      .my-name {font-size: 18px;font-weight: bold;margin-bottom: 5px;color: #fff;}
    }
  }
  .my-vip {height: 100px;margin-top: 41px;padding-top: 18px;text-align: center;background-image: url('http://oss.jiatu360.cn/xcx/bg5.png');background-size: 100% 100%;
    .vip-text {font-size: 14px;font-weight: bold;margin: 3px 0;}
  }
  .my-option {background-color: #fff;padding: 0 15px;
    .option-list, .option-list1 {padding-bottom: 25px;border-bottom: 1px solid #D9D9D9;
      .option-text {font-size: 15px;margin: 0 0 10px 19px;}
      .option-item {font-size: 12px;text-align: center;margin: 0 20px;
        .item {padding: 0 10px;}
      }
    }
    .option-list1 {padding: 19px 0 25px;border: 0;}
  }
}

.vant-popup-qrcode { //圆角弹窗
	.van-popup {
		width: 200px;
		border-radius: 8px;
		overflow: hidden;
	}
}
</style>

<style lang="scss">
.vant-popup-qrcode { //圆角弹窗
	.van-popup {
		width: 200px;
		border-radius: 8px;
		overflow: hidden;
	}
}
</style>