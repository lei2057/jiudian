<template>
  <div>
    <div v-for="(item,index) in dataList" :key="index">
      <div class="times">{{item.time}}</div>
      <div style="background-color: #fff;" v-for="(items,indexs) in item.hotelVos" :key="indexs">
        <div class="border_cell browse-item disflex" @click="detailsGo(items.id)">
          <div class="item-img"><img :src="items.coverImage"></div>
          <div class="flex item-cont">
            <div class="item-name">{{items.hotelName}}</div>
            <div class="mgb"><span class="item-num">{{items.score}}分/</span> {{items.commontSize}}条评论</div>
            <div>{{items.address}}</div>
          </div>
          <div style="margin-right: 3px;">
            <div style="height: 50px;"></div>
            <div class="item-price"><span style="font-size: 18px;">¥ {{items.price}}</span> 起</div>
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
      dataList: []
    }
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    this.$http.get({
      url: `/user/hotelView/searchView?userId=${userInfo.userId}`,
      header: userInfo.token
    }).then(res => {
      console.log(res)
      this.dataList = res.data
    })
  },
  methods: {
    detailsGo (id) {
      wx.redirectTo({
        url: '../../home/details/main?id=' + id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.times {padding: 7px 15px;font-size: 11px;}
.browse-item {padding: 15px;font-size: 12px;color: #999;
  .item-img {width: 70px;height: 70px;border-radius: 8px;overflow: hidden;}
  .item-cont {margin-left: 10px;
    .item-name {font-size: 15px;color: #262626;margin-bottom: 10px;}
    .item-num {color: #C0A369;}
  }
  .item-price {color: #ED5858;}
  .mgb {margin-bottom: 3px;}
}
</style>