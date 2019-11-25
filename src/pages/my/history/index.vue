<template>
  <div>
    <div v-for="(item,index) in dataList" :key="index">
      <div class="times">{{item.inTimeStr}}</div>
      <div style="background-color: #fff;" v-for="(items,indexs) in item.hotelInfoMap" :key="indexs">
        <div class="border_cell browse-item disflex" @click="detailsGo(items.id)">
          <div class="item-img"><img :src="items.coverImage"></div>
          <div class="flex item-cont">
            <div class="item-name">南安名利大酒店</div>
            <div class="mgb">{{items.roomName}}{{items.vipLevelPrice}}</div>
            <div>{{items.inTime}} - {{items.outTime}} 共{{items.days}}晚 {{items.rooms}}间</div>
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
      userInfo: {},
      dataList: []
    }
  },
  onShow () {
    this.userInfo = wx.getStorageSync('userInfo')
    this.$http.get({
      url: `/order/orderRest/getHotelList?userId=${this.userInfo.userId}`,
      header: this.userInfo.token
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