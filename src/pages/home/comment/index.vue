<template>
  <div style="height: 100%;background-color: #fff;">
    <div class="comment-top">
      <div class="comment-grade">
        <div class="disflex grade-num" style="background-image: url('../../../assets/bg-comment.png');background-size: 100% 100%;">{{dataInfo.score}}</div>
        <div class="grade-cont">
          <div class="disflex">
            <div class="cont-item" style="margin-right: 35px;">
              <div class="cont-text">设施</div>
              <div class="cont-heng"></div>
            </div>
            <div class="cont-item">
              <div class="cont-text">卫生</div>
              <div class="cont-heng"></div>
            </div>
          </div>
          <div class="disflex">
            <div class="cont-item" style="margin-right: 35px;">
              <div class="cont-text">服务</div>
              <div class="cont-heng"></div>
            </div>
            <div class="cont-item">
              <div class="cont-text">网络</div>
              <div class="cont-heng"></div>
            </div>
          </div>
        </div>
      </div>
      <div style="font-size:15px;margin-bottom:5px;">{{dataInfo.total}}条客人评论</div>
    </div>
    <div class="commont-bottom">
      <div class="commont-item" v-for="item in dataInfo.voList" :key="item">
        <div class="disflex comment-user">
          <div class="comment-photo"><img :src="item.userInfo.avatar"></div>
          <div class="flex">
            <div>{{item.userInfo.nickName}}</div>
            <div class="comment-text">{{item.userInfo.vipName}} {{item.crtTime}}入住</div>
          </div>
        </div>
        <div class="comment-cont">{{item.content}}</div>
        <div class="comment-reply" v-if="item.replyContent">
          <div style="margin-bottom: 15px;">酒店回复：</div>
          <div>{{item.replyContent}}</div>
        </div>
      </div>
    </div>
    <div class="comment-hotel disflex">
      <div class="hotel-price flex">¥{{dataInfo.minPrice}}<span style="font-size: 11px;">起</span></div>
      <div class="hotel-pay" @click="back">去选房</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataInfo: {}
    }
  },
  onLoad (options) {
    let userInfo = wx.getStorageSync('userInfo')
    let userIdValue
    if (userInfo) {
      userIdValue = userInfo.userId + ''
    } else {
      userIdValue = '-1'
    }
    this.$http.post({
      url: '/hotel/hotelOrderComment/comment',
      header: userInfo.token,
      data: {
        userId: userIdValue,
        hotelId: options.hotelId,
        roomId: '',
        offset: '1',
        audit: '1'
      }
    }).then(res => {
      console.log(res)
      res.data.voList.forEach(e => {
        let times = e.crtTime.substr(0, 10).split('-')
        e.crtTime = times[0] + '年' + times[1] + '月'
      })
      this.dataInfo = res.data
    })
  },
  methods: {
    back () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-top {padding-left: 20px;border-bottom: 1px solid #D9D9D9;
  .comment-grade {padding-top: 20px;display: flex;
    .grade-num {width: 55px;height: 55px;border-radius: 8px;font-size: 24px;color: #C0A369;margin-right: 50px;}
    .grade-cont {font-size: 11px;color: #888;
      .cont-item {margin-bottom: 10px;
        .cont-text {margin-bottom: 5px;}
        .cont-heng {width: 100px;height: 3px;background-color: #D8D8D8;border-radius: 8px;}
      }
    }
  }
}
.commont-bottom {padding: 15px;
  .commont-item {border-bottom: 1px solid #D9D9D9;margin-top: 10px;
    .comment-user {font-size: 12px;
      .comment-photo {width: 30px;height: 30px;border-radius: 50%;overflow: hidden;margin-right: 8px;}
      .comment-text {font-size: 10px;color: #999;}
    }
    .comment-cont {font-size: 12px;color: #666;margin: 10px 0 10px 38px;line-height: 1.5;}
    .comment-reply {border-radius: 8px;background-color: #F9F9F9;padding: 9px;margin: 0 0 10px 38px;font-size: 10px;color: #999;}
  }
}
.comment-hotel {position: fixed;bottom: 0;left: 0;box-shadow:0px -1px 4px 0px rgba(0,0,0,0.1);width: 100%;
  .hotel-price {color: #ED5858;font-size: 20px;margin-left: 15px;}
  .hotel-pay {font-size: 16px;background-color: #C0A369;color: #fff;width: 128px;line-height: 49px;text-align: center;}
}
</style>
