<template>
  <div style="background-color: #fff;">
    <div class="border_cell browse-item disflex" v-for="(item,index) in dataList" :key="index" @click="detailsGo(item.id)">
      <div class="item-img"><img :src="item.coverImage"></div>
      <div class="flex item-cont">
        <div class="item-name">{{item.hotelName}}</div>
        <div class="mgb"><span class="item-num">{{item.score}}分/</span> {{item.commentSize}}条评论</div>
        <div>{{item.address}}</div>
      </div>
      <div style="margin-right: 3px;">
        <div style="display: flex;justify-content: flex-end;">
          <div class="item-xin" v-if="item.isFav !== 1" @click.stop="shou(item.isFav,item.id,index)"><img src="../../../assets/icon-sc.png"></div>
          <div class="item-xin" v-else @click.stop="shou(item.isFav,item.id,index)"><img src="../../../assets/icon-sch.png"></div>
        </div>
        <div class="item-price"><span style="font-size: 18px;">¥ {{item.price}}</span> 起</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      xin: false,
      userInfo: {},
      dataList: []
    }
  },
  onShow () {
    this.userInfo = wx.getStorageSync('userInfo')
    this.$http.get({
      url: `/user/userHotelFav/searchFav?userId=${this.userInfo.userId}`,
      header: this.userInfo.token
    }).then(res => {
      console.log(res)
      this.dataList = res.data
    })
  },
  methods: {
    shou (type, id, index) {
      if (type === 0) {
        this.$http.post({
          url: `/user/userHotelFav/addFav`,
          header: this.userInfo.token,
          data: {
            userId: this.userInfo.userId + '',
            hotelId: id + ''
          }
        }).then(res => {
          console.log(res)
          this.dataList[index].isFav = 1
        })
      } else {
        this.$http.post({
          url: `/user/userHotelFav/cancelFav`,
          header: this.userInfo.token,
          data: {
            userId: this.userInfo.userId + '',
            hotelId: id + ''
          }
        }).then(res => {
          console.log(res)
          this.dataList[index].isFav = 0
        })
      }
    },
    detailsGo (id) {
      wx.redirectTo({
        url: '../../home/details/main?id=' + id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.browse-item {padding: 15px;font-size: 12px;color: #999;
  .item-img {width: 70px;height: 70px;border-radius: 8px;overflow: hidden;}
  .item-cont {margin-left: 10px;
    .item-name {font-size: 15px;color: #262626;margin-bottom: 10px;}
    .item-num {color: #C0A369;}
  }
  .item-xin {width: 30px;height: 30px;margin: 5px 0 15px;}
  .item-price {color: #ED5858;}
  .mgb {margin-bottom: 3px;}
}
</style>