<template>
  <div>
    <div class="bg-img"><img src="http://oss.jiatu360.cn/xcx/bg6.png"></div>
    <div class="jifen-num-wrapper">
      <div class="jifen-num">
        <div class="icon22" style="margin: auto;"><img src="../../../assets/icon-jf.png"></div>
        <div class="num-text" v-if="data">{{data.points}}</div>
        <div class="num-text" v-else>0</div>
        <div>当前积分</div>
      </div>
    </div>
    <div class="jifen-tishi disflex">
      <div class="flex" style="text-align: right;">查看会员积分权益</div>
      <div class="icon13"><img src="../../../assets/right-gary.png"></div>
    </div>
    <div class="cont-title">积分记录</div>
    <div v-for="(item,index) in data.pdList" :key="index">
      <div class="jifen-time"><span class="shu"></span>{{item.displayTime}}</div>
      <div class="jifen-cont">
        <div class="cont-item disflex" v-for="(items,indexs) in item.pointDetailVoList" :key="indexs" :style="item.pointDetailVoList.length-1==indexs?'border:0;':''">
          <div class="flex">
            <div>{{items.pointName}}</div>
            <div class="cont-text">{{items.creatTime}}</div>
          </div>
          <div class="cont-num">+{{items.point}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    this.$http.get({
      url: '/user/pointsDetail/selPointsDetail?userId=' + userInfo.userId + '&startTime=2019-01-01&endTime=' + this.$commont.dataTime,
      header: userInfo.token
    }).then(res => {
      console.log(res)
      res.data.pdList.forEach(e => {
        let newTime = e.displayTime.split('-')
        e.displayTime = newTime[0] + '年' + newTime[1] + '月'
        e.pointDetailVoList.forEach(el => {
          el.creatTime = el.creatTime.substr(0, 10)
        })
      })
      this.data = res.data
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.bg-img {height: 170px;}
.jifen-num-wrapper {width: 100%;position: absolute;top: 48px;
  .jifen-num {text-align: center;color: #C0A369;font-size: 11px;
    .num-text {font-size: 20px;font-weight: bold;margin: 8px 0;}
  }
}
.jifen-tishi {padding: 8px 15px 8px 0;font-size: 11px;color: #999;}
.cont-title {font-size: 16px;font-weight: bold;padding: 5px 15px;color: #C0A369;background-color: #fff;}
.jifen-time {font-size: 12px;color: #666;padding: 5px 15px;
  .shu {width: 4px;height: 14px;background-color: #C0A369;display: block;float: left;margin-right: 5px;}
}
.jifen-cont {padding: 5px 15px;font-size: 15px;background-color: #fff;
  .cont-item {border-bottom: 1px solid #D9D9D9;padding: 10px 0;
    .cont-text {font-size: 10px;margin-top: 5px;color: #999;}
    .cont-num {color: #C0A369;}
  }
}
</style>