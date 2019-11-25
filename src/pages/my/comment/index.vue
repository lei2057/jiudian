<template>
  <div style="background-color: #fff;height: 100%;">
    <div class="vant-tab-active">
      <van-tabs :active="active" @change="onChange">
        <van-tab title="未点评"></van-tab>
        <van-tab title="已点评"></van-tab>
      </van-tabs>
    </div>
    <div v-if="cont === 0">
      <div class="border_cell1 browse-item disflex" v-for="item in dataList" :key="item">
        <div class="item-img"><img :src="item.coverImage"></div>
        <div class="flex item-cont">
          <div class="item-name">{{item.hotelName}}</div>
          <div class="mgb">{{item.roomName}}</div>
          <div>{{item.inTime}} - {{item.outTime}} 共{{item.days}}晚 {{item.rooms}}间</div>
        </div>
        <div class="item-btn" @click="assessGo(item)">立即点评</div>
      </div>
    </div>
    <div v-if="cont === 1">
      <div class="border_cell1 browse-item disflex" v-for="item in dataList" :key="item">
        <div class="item-img"><img :src="item.coverImage"></div>
        <div class="flex item-cont">
          <div class="item-name">{{item.hotelName}}</div>
          <div class="mgb">{{item.roomName}}</div>
          <div>{{item.inTime}} - {{item.outTime}} 共{{item.days}}晚 {{item.rooms}}间</div>
        </div>
        <div class="item-btn1" @click="assessMy(item)">查看点评</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      cont: 0,
      dataList: []
    }
  },
  onShow () {
    this.cont = 0
    let userInfo = wx.getStorageSync('userInfo')
    this.$http.get({
      url: '/order/order/getIsCommentByUserId?payStatus=7&userId=' + userInfo.userId,
      header: userInfo.token
    }).then(res => {
      console.log(res)
      res.data.forEach(e => {
        e.inTime = e.inTime.substr(0, 10)
        e.outTime = e.outTime.substr(0, 10)
      })
      this.dataList = res.data
    })
  },
  methods: {
    onChange (event) {
      let userInfo = wx.getStorageSync('userInfo')
      this.cont = event.mp.detail.index
      if (this.cont === 1) {
        this.$http.get({
          url: '/order/order/getIsCommentByUserId?payStatus=8&userId=' + userInfo.userId,
          header: userInfo.token
        }).then(res => {
          console.log(res)
          res.data.forEach(e => {
            e.inTime = e.inTime.substr(0, 10)
            e.outTime = e.outTime.substr(0, 10)
          })
          this.dataList = res.data
        })
      } else {
        this.$http.get({
          url: '/order/order/getIsCommentByUserId?payStatus=7&userId=' + userInfo.userId,
          header: userInfo.token
        }).then(res => {
          console.log(res)
          res.data.forEach(e => {
            e.inTime = e.inTime.substr(0, 10)
            e.outTime = e.outTime.substr(0, 10)
          })
          this.dataList = res.data
        })
      }
    },
    assessGo (data) {
      wx.navigateTo({
        url: '../commentGo/main?data=' + JSON.stringify(data)
      })
    },
    assessMy (data) {
      wx.navigateTo({
        url: '../commentDetails/main?data=' + JSON.stringify(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.browse-item {padding: 15px;font-size: 11px;color: #666;
  .item-img {width: 73px;height: 73px;}
  .item-cont {margin-left: 10px;
    .item-name {font-size: 15px;font-weight: bold;color: #262626;margin-bottom: 7px;}
  }
  .item-btn {width: 53px;line-height: 20px;border: 1px solid #C0A369;border-radius: 4px;color: #C0A369;text-align: center;margin-right: 3px;margin-bottom: 30px;}
  .item-btn1 {width: 53px;line-height: 20px;border: 1px solid #999;border-radius: 4px;color: #999;text-align: center;margin-right: 3px;margin-bottom: 30px;}
  .mgb {margin-bottom: 7px;}
}
</style>