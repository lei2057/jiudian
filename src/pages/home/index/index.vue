<template>
  <div>
    <div class="bg-img"><img src="../../../assets/bg-img.png"></div>
    <div class="bg-img"><img src="http://oss.jiatu360.cn/xcx/bg.png"></div>
    <div class="list-wrapper">
      <div class="logo">
        <div class="logo-icon"><img src="../../../assets/logo.png"></div>
      </div>
      <div class="list-item">
        <div class="item" v-for="(item,index) in dataList" :key="index" @click="nextDetails(item.id)">
          <div class="item-img disflex" v-if="item.imgList.length>1">
            <div class="img-left"><img :src="item.imgList[0]"></div>
            <div class="flex" style="height: 100%;">
              <div style="margin-bottom: 5px;height: 50%;"><img :src="item.imgList[1]"></div>
              <div style="height: 50%;"><img :src="item.imgList[2]"></div>
            </div>
            <div class="item-tag">{{item.tags}}</div>
          </div>
          <div class="item-img" v-else>
            <div class="img-right"><img :src="item.imgList[0]"></div>
            <div class="item-tag">{{item.tags}}</div>
          </div>
          <div class="item-cont">
            <div class="disflex">
              <div class="flex fts16">{{item.hotelName}}</div>
              <div class="disflex fts13">¥<i class="fts16 mg">{{item.price}}</i>起</div>
            </div>
            <div class="fts12">{{item.slogan}}</div>
          </div>
          <div class="item-share disflex">
            <div class="icon22" v-if="item.isFav==1" @click.stop="collect(item.id,item.isFav,index)"><img src="../../../assets/xiny.png"></div>
            <div class="icon22" v-else @click.stop="collect(item.id,item.isFav,index)"><img src="../../../assets/xiny-k.png"></div>
            <button class="share-btn icon22" open-type="share" @click.stop=""><img src="../../../assets/share.png"></button>
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
      videoTitle: '自定义标题',
      show: -1,
      dataList: []
    }
  },
  onShareAppMessage (res) { // 转发分享
    let phone = wx.getStorageSync('userInfo').phone
    return {
      title: '印记小程序',
      imageUrl: '../../../assets/shareImg.png',
      path: 'pages/home/index/main?sharePhone=' + phone,
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  onLoad (options) {
    console.log(options)
    if (options.sharePhone) {
      wx.setStorageSync('sharePhone', options.sharePhone)
    } else if (options.scene) {
      let str = options.scene.split('%3D')
      wx.setStorageSync('sharePhone', str[1])
    } else {
      wx.setStorageSync('sharePhone', '')
    }
    wx.checkSession({
      success (res) {
        console.log(res)
      },
      fail (res) {
        // session_key 已经失效，需要重新执行登录流程
        console.log(res)
        wx.removeStorageSync('userInfo')
      }
    })
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.$http.post({
        url: '/hotel/hotelInfo/index',
        header: userInfo.token,
        data: {
          pageNo: '0',
          pageSize: '100',
          userId: userInfo.userId + ''
        }
      }).then(res => {
        console.log(res)
        res.data.forEach(el => {
          let str = el.coverImage.split(',')
          el.imgList = this.$common.httpTypeImg(str)
        })
        this.dataList = res.data
      })
    } else {
      this.$http.post({
        url: '/hotel/hotelInfo/index',
        data: {
          pageNo: '0',
          pageSize: '100',
          userId: '-1'
        }
      }).then(res => {
        console.log(res)
        res.data.forEach(el => {
          let str = el.coverImage.split(',')
          el.imgList = this.$common.httpTypeImg(str)
        })
        this.dataList = res.data
      })
    }
  },
  methods: {
    collect (id, isFav, index) { // 收藏
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        if (isFav === 0) {
          this.$http.post({
            url: `/user/userHotelFav/addFav`,
            header: userInfo.token,
            data: {
              userId: userInfo.userId + '',
              hotelId: id + ''
            }
          }).then(res => {
            this.dataList[index].isFav = 1
          })
        } else {
          this.$http.post({
            url: `/user/userHotelFav/cancelFav`,
            header: userInfo.token,
            data: {
              userId: userInfo.userId + '',
              hotelId: id + ''
            }
          }).then(res => {
            this.dataList[index].isFav = 0
          })
        }
      } else {
        wx.switchTab({
          url: '../../my/index/main'
        })
        wx.showToast({
          title: '登陆即可体验',
          icon: 'none',
          image: '',
          duration: 1500
        })
      }
    },
    nextDetails (id) { // 详情
      wx.navigateTo({
        url: '../details/main?id=' + id
      })
      // let userInfo = wx.getStorageSync('userInfo')
      // if (!userInfo) {
      //   wx.switchTab({
      //     url: '../../my/index/main'
      //   })
      //   wx.showToast({
      //     title: '登陆即可体验',
      //     icon: 'none',
      //     image: '',
      //     duration: 1500
      //   })
      // } else {
      //   wx.navigateTo({
      //     url: '../details/main?id=' + id
      //   })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-img {width: 100%;height: 100%;position: fixed;top: 0;left: 0;}
.list-wrapper {width: 100%;position: absolute;top: 0;left: 0;
  .logo {height: 182px;
    .logo-icon {width: 93px;height: 93px;margin: 91px auto 0;}
  }
  .list-item {padding: 0 15px;
    .item {position: relative;width: 100%;height: 262px;background-color: #F4F4F4;margin-bottom: 25px;border-radius: 8px;overflow: hidden;
      .item-img {height: 185px;position: relative;border-top-left-radius: 8px;border-top-right-radius: 8px;overflow: hidden;
        .img-left {width: 205px;height: 100%;margin-right: 5px;}
        .img-right {width: 100%;height: 100%;}
        .item-tag {position: absolute;bottom: 10px;left: 13px;font-size: 10px;color: #fff;}
      }
      .item-cont {padding: 13px;
        .fts16 {font-size: 16px;font-weight: bold;margin-bottom: 7px;}
        .fts13 {font-size: 13px;}
        .fts12 {font-size: 12px;color: #404040;}
        .mg {margin: 0 3px;}
      }
      .item-share {position: absolute;top: 8px;right: 8px;
        .share-btn {margin-left: 10px;}
      }
    }
  }
}
.aa {background-color: blueviolet}
</style>