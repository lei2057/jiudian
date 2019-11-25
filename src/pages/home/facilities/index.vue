<template>
  <div>
    <div class="facilities-title">酒店信息</div>
    <div class="hotel-facilities">
      <div class="facilities-icon">
        <div class="icon-item" v-for="item in dataInfo.hotelDetailExtraVos" :key="item">
          <div class="icon25"><img :src="item.image"></div>
          <div class="icon-text">{{item.title}}</div>
        </div>
      </div>
      <div class="hotel-info">
        <div class="info-item">酒店名称：<span class="info-text">{{dataInfo.hotelName}}</span></div>
        <div class="info-item">开业时间：<span class="info-text">{{dataInfo.openYear}}</span></div>
        <div class="info-item">酒店类型：<span class="info-text">{{dataInfo.hotelType}}</span></div>
        <div class="info-item">酒店地址：<span class="info-text">{{dataInfo.address}}</span></div>
        <div class="info-item">联系电话：<span class="info-text">{{dataInfo.phone}}</span></div>
      </div>
    </div>
    <div class="facilities-title">服务与设施</div>
    <div class="hotel-facilities facilities-cont" v-if="dataInfo.service">
      <div style="margin-bottom: 10px;">不论商务差旅或休闲旅游、我们都将为您提供各种服务和设施，满足宾客的所有需求。</div>
      <div>如您所需的服务未列于此，请随时联系我们，我们将竭诚为您服务。</div>
      <div v-for="(item,index) in dataInfo.service.list" :key="index">
        <div class="cont-title">{{item.name}}</div>
        <span v-for="(items,indexs) in item.list" :key="indexs">{{items.name+'、'}}</span>
      </div>
    </div>
    <div class="facilities-title">酒店政策</div>
    <div class="hotel-facilities facilities-cont" v-if="dataInfo.notice">
      <div class="cont-item" v-for="item in dataInfo.notice.list" :key="item">
        <div>{{item.name}}</div>
        <div style="color: #000;">{{item.value}}</div>
      </div>
    </div>
    <div class="facilities-title">酒店简介</div>
    <div class="hotel-facilities facilities-cont">{{dataInfo.detailText}}</div>
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
    this.$http.get({
      url: '/hotel/hotelDetailExtra/searchByParentId?id=' + options.id + '&hotelId=' + options.hotelId,
      header: userInfo.token
    }).then(res => {
      console.log(res)
      this.dataInfo = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.facilities-title {padding: 3px 15px;color: #C0A369;font-size: 12px;}
.hotel-facilities {padding: 15px;background-color: #fff;
  .facilities-icon {padding-bottom: 10px;display: flex;flex-flow: row wrap;align-content: start;border-bottom: 1px solid #D9D9D9;
    .icon-item {flex: 0 0 25%;box-sizing: border-box;padding: 10px 0;
      .icon-text {font-size: 10px;color: #999;text-align: center;margin-top: 6px;}
    }
  }
  .hotel-info {font-size: 12px;padding: 17px 0;color: #999;
    .info-item {margin-bottom: 10px;
      .info-text {color: #262626;}
    }
  }
}
.facilities-cont {font-size: 12px;color: #666;
  .cont-title {color: #C0A369;margin: 12px 0 5px 0;font-size: 11px;}
  .cont-item {padding: 6px 0;}
}
</style>
