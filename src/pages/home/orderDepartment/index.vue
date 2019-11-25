<template>
  <div>
    <navigation-bar
    :navBackgroundColor="''"
    :titleColor="''"
    :back-visible="true"
    :home-path="false"></navigation-bar>
    <div class="bg-img"><img src="http://oss.jiatu360.cn/xcx/bg1.png"></div>
    <div class="order-wrapper" @click="detailClose">
      <div style="padding: 0 10px;">
        <div class="order-name">{{orderInfo.hotelName}}</div>
        <div class="disflex">
          <div class="flex order-title">尊敬的会员，欢迎您！</div>
          <div class="order-text" @click="house">包间详情 ></div>
        </div>
      </div>
      <!-- 订单信息 -->
      <div class="order-time disflex">
        <div class="flex">
          <div class="title">{{orderInfo.commodityName}}</div>
          <div class="text">{{orderInfo.introduction}}</div>
        </div>
        <div class="price">¥ {{orderInfo.commodityPrice}}</div>
      </div>
      <!-- 订单用户信息 -->
      <div class="order-info">
        <div class="info-item disflex" @click="times">
          <div class="info-title">预定时间</div>
          <div class="flex info-text">{{dateValue.week}} , {{timeValue}}</div>
          <div class="icon20"><img src="../../../assets/icon-garyx.png"></div>
        </div>
        <div class="info-item disflex">
          <div class="info-title" style="margin-right: 30px;">称呼(选填)</div>
          <div class="flex info-text"><input type="text" v-model="name"></div>
          <div v-for="(item,index) in sexList" :key="index">
            <div class="item" :style="index==0?'margin-right:5px;':''" :class="index==sexShow?' active':''" @click="activeSex(item,index)">{{item.name}}</div>
          </div>
        </div>
        <div class="info-item disflex">
          <div class="info-title">手机号码</div>
          <div class="flex info-text"><input type="text" v-model="phone"></div>
          <!-- <div class="icon20" style="margin: 0 13px;" @click="people"><img src="../../../assets/icon-lxr.png"></div> -->
        </div>
        <div class="info-item disflex" v-show="!show1">
          <div class="textarea">
          <textarea placeholder="可将您的其他需求告知商家" placeholder-style="color:#999;" maxlength="30" v-model="remarks"></textarea>

          </div>
          <div class="textarea-num flex">{{textNum}}/30</div>
        </div>
      </div>
      <!-- 优惠券 -->
      <div class="order-coupon disflex" @click="coupon">
        <div class="coupon-title flex">优惠券</div>
        <div class="coupon-title" v-if="!couponInfo.id">选择优惠券</div>
        <div class="coupon-text" v-else>-¥{{couponInfo.couponPrice}}</div>
        <div class="icon10"><img src="../../../assets/right-xiao.png"></div>
      </div>
      <!-- 发票 -->
      <div class="order-invoice disflex" @click="invoice">
        <div class="invoice-title">发票</div>
        <div class="icon13"><img src="../../../assets/icon-ts.png"></div>
        <div class="invoice-text flex" style="color:#C0A369;" v-if="orderInfo.infoInvioceVo.taxcode">【普通发票】 {{orderInfo.infoInvioceVo.company}}</div>
        <div class="invoice-text flex" v-else>请选择发票抬头</div>        
        <div class="icon10"><img src="../../../assets/right-xiao.png"></div>
      </div>
      <!-- 时间选择 -->
      <van-popup :show="show2" position="bottom" @close="onClose">
        <div class="select-time">
          <div class="time-title disflex">
            <div class="flex">时间选择</div>
            <div class="icon16" @click="onClose()"><img src="../../../assets/cha.png"></div>
          </div>
          <div class="time-cont">
            <scroll-view class="tab" scroll-x :scroll-left="tabScroll" scroll-with-animation="true">
              <block v-for="(item,index) in weekList" :key="index">
                <div class="item" :class="index==dateShow?' active':''" @click="activeDate(item,index)">
                  <div>{{item.week}}</div>
                  <div style="font-size:12px;">{{item.date}}</div>
                </div>
              </block>
            </scroll-view>
            <scroll-view class="tab1" scroll-x :scroll-left="tabScroll" scroll-with-animation="true">
              <block v-for="(item,index) in timeList" :key="index">
                <div class="item" :style="index==0?'width:72px;':''" :class="index==timeShow?' active':''" @click="activeTime(item,index)">
                  <div>{{item}}</div>
                </div>
              </block>
            </scroll-view>
          </div>
          <div class="time-btn" @click="onClose">确定</div>
        </div>
      </van-popup>
    </div>
    <!-- 提交订单 -->
    <div class="submit-wrapper vant-up">
      <div class="order-submit disflex">
        <div class="submit-title">总金额</div>
        <div class="submit-price flex">¥{{orderInfo.finalPay}}</div>
        <div class="submit-btn" @click="submit">去支付</div>
      </div>
    </div>
    <!-- 详情弹窗 -->
    <div class="vant-popup">
      <van-popup :show="show1" @close="onClose">
        <div class="house-popup">
          <swiper indicator-dots="true" circular="true">
            <block v-for="item in houseInfo.imgList" :key="item">
              <swiper-item>
                <img :src="item">
              </swiper-item>
            </block>
          </swiper>
          <div class="popup-title">{{houseInfo.name}}</div>
          <div class="popup-info">
            <div class="popup-item"><span class="popup-space">楼层</span>：{{houseInfo.floor}}</div>
            <div class="popup-item"><span>最多入住</span>：{{houseInfo.people}}</div>
            <div class="popup-item"><span class="popup-space">床型</span>：{{houseInfo.bed}}</div>
            <div class="popup-item"><span class="popup-space">加床</span>：<span v-text="enableBeds==0?'不可加床':'可以加床'"></span></div>
            <div class="popup-item"><span class="popup-space">早餐</span>：<span v-text="breakfast==0?'无早餐':'有早餐'"></span></div>
          </div>
          <div class="popup-info">
            <div class="popup-text">房间设施</div>
            <div>酒店采用Siri作为配套设施，全自动化智能家居设施.</div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import navigationBar from '../../../components/navigationBar'
import Moment from '../../../utils/moment.js'
export default {
  data () {
    return {
      show: false,
      show1: false,
      show2: false,
      checkInDate: '',
      checkOutDate: '',
      dataInfo: {},
      houseInfo: {},
      name: '',
      sex: '',
      phone: '',
      remarks: '',
      textNum: 0,
      orderInfo: {},
      couponInfo: {},
      couponOrder: '',
      tabScroll: 0,
      dateShow: 0,
      timeShow: 0,
      dateValue: '',
      timeValue: '',
      weekList: [],
      timeList: [
        '不限',
        '09:00~12:00',
        '12:00~18:00',
        '18:00~21:00',
        '21:00~00:00'
      ],
      sexList: [{name: '先生', key: 1}, {name: '女士', key: 2}],
      sexShow: -1
    }
  },
  components: {
    navigationBar
  },
  onLoad (options) {
    let startTime = new Date(new Date().setHours(0, 0, 0, 0))
    let SevenDayLater = []
    for (let i = 0; i <= 6; i++) {
      let str = {}
      str.date = startTime * 1 + 86400 * i * 1000
      str.week = i
      SevenDayLater.push(str)
    }
    let arrweek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    SevenDayLater.forEach(e => {
      let dateList = {}
      dateList.date = Moment(e.date).format('M.DD')
      let week = arrweek[new Date(e.date).getDay()]
      dateList.week = week
      if (e.week === 0) {
        dateList.week = '今天'
      } else if (e.week === 1) {
        dateList.week = '明天'
      }
      this.weekList.push(dateList)
    })
    this.show1 = false
    this.show = false
    this.dataInfo = {
      id: options.id,
      hotelId: options.hotelId
    }
    getApp().globalData.data = ''
  },
  onUnload () {
    this.couponInfo = {}
    this.couponOrder = ''
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    let couponData = getApp().globalData.data
    if (couponData) {
      let couponObj = {
        id: couponData.id,
        couponPrice: couponData.reduceAmount,
        couponName: couponData.couponName
      }
      this.couponInfo = couponObj
      this.couponOrder = JSON.stringify(couponObj)
    } else {
      let couponObj = {
        id: '',
        couponPrice: '',
        couponName: ''
      }
      this.couponInfo = couponObj
    }
    if (this.timeValue === '' || this.dateValue === '') {
      this.timeValue = this.timeList[0]
      this.dateValue = this.weekList[0]
    }
    if (this.sex === '') {
      this.sex = 0
    }
    this.$http.post({
      url: '/order/order/commodityInfoInit',
      header: userInfo.token,
      data: {
        userId: userInfo.userId + '',
        commodityId: this.dataInfo.id,
        hotelId: this.dataInfo.hotelId,
        couponOrderVoStr: this.couponOrder
      }
    }).then(res => {
      console.log(res)
      this.orderInfo = res.data
      this.name = res.data.infoInvioceVo.name
      this.phone = res.data.infoInvioceVo.phone
    })
  },
  watch: {
    remarks (res) {
      this.textNum = res.length
    }
  },
  methods: {
    detail () {
      this.show = !this.show
    },
    house () {
      this.show1 = true
    },
    times () {
      this.show2 = true
    },
    activeDate (item, index) {
      this.dateShow = index
      this.dateValue = item
    },
    activeTime (item, index) {
      this.timeShow = index
      this.timeValue = item
    },
    activeSex (item, index) {
      this.sexShow = index
      this.sex = item.key
    },
    onClose () {
      this.show1 = false
      this.show2 = false
    },
    detailClose () {
      this.show = false
    },
    onChange (event) {
      this.rooms = event.mp.detail.value
      this.show2 = false
    },
    people () { // 联系人
      wx.navigateTo({
        url: '../../my/usedInfo/main'
      })
    },
    coupon () { // 选择优惠券
      wx.navigateTo({
        url: '../coupon/main?hotelId=' + this.dataInfo.hotelId + '&price=' + this.orderInfo.commodityPrice
      })
    },
    invoice () { // 选择发票
      wx.navigateTo({
        url: '../invoice/main'
      })
    },
    submit () { // 订单提交
      console.log(this.couponInfo)
      let userInfo = wx.getStorageSync('userInfo')
      let data = {
        userId: userInfo.userId + '',
        hotelId: this.dataInfo.hotelId,
        totalPay: this.orderInfo.commodityPrice + '',
        finalPay: this.orderInfo.finalPay + '',
        commodityId: this.dataInfo.id,
        commodityScheduledTime: `${this.dateValue.date},${this.timeValue}`,
        userName: this.name,
        sex: this.sex + '',
        phone: this.phone,
        couponId: this.couponInfo.id + '',
        couponPay: this.couponInfo.couponPrice + '',
        memo: this.remarks,
        company: this.orderInfo.infoInvioceVo.company,
        taxcode: this.orderInfo.infoInvioceVo.taxcode
      }
      console.log(data)
      if (!this.name) {
        wx.showToast({
          title: '请输入联系人和电话',
          icon: 'none',
          duration: 1500,
          mask: false
        })
      } else if (!this.phone || !this.$commont.phoneReg.test(this.phone)) {
        wx.showToast({
          title: '请输入正确的电话号码',
          icon: 'none',
          duration: 1500,
          mask: false
        })
      } else {
        wx.navigateTo({
          url: '../../order/detailsDepartment/main?data=' + JSON.stringify(data)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.bg-img {width: 100%;height: 220px;}
.order-wrapper {padding: 0 10px;position: relative;top: -100px;
  .order-name {font-size: 20px;color: #C0A369;margin-bottom: 9px;}
  .order-title {font-size: 12px;color: #C0A369;}
  .order-text {font-size: 10px;color: #fff;}
  .order-time {background-color: #fff;padding: 12px 18px;margin: 24px 0 8px;border-radius: 4px;
    .title {font-size: 16px;font-weight: bold;margin-bottom: 5px;}
    .text {font-size: 11px;color: #888;margin-bottom: 5px;}
    .price {font-size: 15px;font-weight: bold;color: #ED5858;}
  }
  .order-info, .order-coupon, .order-invoice, .order-vip {background-color: #fff;border-radius: 4px;margin-bottom: 15px;}
  .order-info {padding:3px 18px 18px 18px;
    .info-item {border-bottom: 1px solid #D9D9D9;padding: 15px 0;
      .info-title {font-size: 14px;color: #888;margin-right: 24px;}
      .info-text {font-size: 14px;font-weight: bold;z-index: 0;}
      .textarea {width: 100%;height: 35px;font-size: 14px;color: #888;
        textarea {height: 100%;}
      }
      .item {width: 40px;line-height: 16px;text-align: center;border: 1px solid #999;border-radius: 4px;color: #999;font-size: 11px;display: inline-block;}
      .active {border-color: #C0A369;color: #C0A369;}
      .textarea-num {font-size: 11px;color: #999;}
    }
  }
  .order-coupon, .order-invoice {padding: 12px 10px;
    .coupon-title {font-size: 15px;margin-left: 8px;}
    .coupon-text {font-size: 15px;color: #ED5858;margin-right: 5px;}
  }
  .order-invoice {
    .invoice-title {font-size: 15px;margin-left: 8px;margin-right: 4px;}
    .invoice-text {font-size: 11px;color: #999;margin-right: 5px;text-align: right;}
  }
  .select-time {padding: 20px 0;
    .time-title {margin: 0 15px;font-size: 17px;margin-bottom: 15px;}
    .time-cont {font-size: 15px;margin-left: 15px;margin-bottom: 30px;
      .tab,.tab1 {white-space: nowrap;box-sizing: border-box;overflow: hidden;margin-bottom: 15px;
        .item {display: inline-block;padding: 3px 0;margin-right: 10px;border-radius: 4px;border: 1px solid #D9D9D9;width: 72px;text-align: center;}
        .active {border-color: #C0A369;background-color: #FFF2D9;color: #C0A369;}
      }
      .tab1 {
        .item {width: 124px;line-height: 36px;}
      }
    }
    .time-btn {line-height: 32px;font-size: 16px;border-radius: 8px;background-color: #C0A369;color: #fff;text-align: center;margin: 0 15px;}
  }
}
.submit-wrapper {position: fixed;bottom: 0;left: 0;width: 100%;z-index: 9;
  .order-submit {width: 100%;height: 50px;background-color: #fff;box-shadow: 0px -1px 4px 0px rgba(0,0,0,0.1);
    .submit-title {font-size: 16px;margin-left: 14px;}
    .submit-price {font-size: 20px;color: #ED5858;margin-left: 12px;}
    .submit-btn {width: 128px;height: 50px;line-height: 50px;text-align: center;font-size: 16px;background-color: #C0A369;color: #fff;}
  }
}
.house-popup {
  .popup-title {font-size: 15px;font-weight: bold;margin: 14px 0 14px 23px;}
  .popup-info {padding: 16px 23px;border-top: 1px solid #D9D9D9;font-size: 11px;
    .popup-item {margin-bottom: 5px;
      .popup-space {letter-spacing: 2em;margin-right:-2em;}
    }
    .popup-text {font-size: 15px;font-weight: bold;margin-bottom: 10px;}
  }
}

/*开启 底部 滚动条*/
page .wx-swiper-dots.wx-swiper-dots-horizontal{
margin-bottom: -2px;
}
/*滚动条属性*/
page .wx-swiper-dot{
width: 30px;
display: inline-flex;
height: 1px;
vertical-align: sub;/*垂直对齐文本的下标*/
}
/*默认滚动条属性*/
page .wx-swiper-dot::before{
content: '';
background: rgba(255,255,255,0.3);
flex-grow: 1;
}
/*选择时的滚动条属性*/
page .wx-swiper-dot-active::before{
content: '';
background: #fff;
flex-grow: 1;
}
</style>