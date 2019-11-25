<template>
  <div style="background-color: #fff;height: 100%;padding: 15px;">
    <div class="disflex comment-user">
      <div class="comment-photo"><img src="../../../assets/toux.png"></div>
      <div class="flex">
        <div>YJ_{{userInfo.phone}}</div>
        <div class="comment-text">铂金会员 2019年7月入住</div>
      </div>
    </div>
    <div class="comment-cont">{{dataInfo.content}}</div>
    <div class="browse-item disflex">
      <div class="item-img"><img :src="dataInfo.coverImage"></div>
      <div class="flex item-cont">
        <div class="item-name">{{dataInfo.hotelName}}</div>
        <div class="mgb">{{dataInfo.roomName}}</div>
        <div>{{dataInfo.inTime}} - {{dataInfo.outTime}} 共{{dataInfo.days}}晚 {{dataInfo.rooms}}间</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataInfo: {},
      userInfo: {}
    }
  },
  onLoad (options) {
    this.dataInfo = JSON.parse(options.data)
    this.userInfo = wx.getStorageSync('userInfo')
  }
}
</script>

<style lang="scss" scoped>
.comment-user {font-size: 12px;
  .comment-photo {width: 30px;height: 30px;border-radius: 50%;overflow: hidden;margin-right: 8px;}
  .comment-text {font-size: 10px;color: #999;}
}
.comment-cont {font-size: 12px;color: #666;margin: 15px 0 14px 38px;line-height: 1.5;}
.browse-item {padding: 10px 38px;font-size: 11px;color: #666;background-color: #F9F9F9;
  .item-img {width: 60px;height: 60px;}
  .item-cont {margin-left: 10px;
    .item-name {font-size: 14px;color: #262626;margin-bottom: 3px;}
  }
  .mgb {margin-bottom: 3px;}
}
</style>