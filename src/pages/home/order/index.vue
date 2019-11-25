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
          <div class="flex order-title">尊敬的会员，欢迎入住！</div>
          <div class="order-text" @click="house">房型详情 ></div>
        </div>
      </div>
      <!-- 订单时间 -->
      <div class="order-time disflex" style="text-align: center;">
        <div class="flex">
          <div class="text">入住日期</div>
          <div class="riqi">{{checkInDate}}</div>
        </div>
        <div class="xyouImg"><img src="../../../assets/xyou.png"></div>
        <div class="flex">
          <div class="text">离店日期</div>
          <div class="riqi">{{checkOutDate}}</div>
        </div>
        <div class="xianImg"></div>
        <div class="flex">
          <div class="text">入住晚数</div>
          <div class="riqi">共{{dataInfo.days}}晚</div>
        </div>
      </div>
      <!-- 订单用户信息 -->
      <div class="order-info">
        <div class="info-item disflex" @click="days">
          <div class="info-title">房间数量</div>
          <div class="flex info-text">{{rooms}}间</div>
        </div>
        <div class="info-item disflex">
          <div class="info-title" style="margin-right: 30px;">入 住 人</div>
          <div class="flex info-text"><input type="text" v-model="name"></div>
          <!-- <div class="icon13"><img src="../../../assets/del.png"></div> -->
          <div class="icon20" style="margin: 0 13px;" @click="people"><img src="../../../assets/icon-lxr.png"></div>
        </div>
        <div class="info-item disflex">
          <div class="info-title">到店时间</div>
          <div class="flex info-text">23:00 前 到店</div>
        </div>
        <div class="info-item disflex">
          <div class="info-title">联系电话</div>
          <div class="flex info-text"><input type="text" v-model="phone"></div>
          <!-- <div class="icon13"><img src="../../../assets/del.png"></div> -->
          <!-- <div class="icon20" style="margin: 0 13px;"><img src="../../../assets/icon-sj.png"></div> -->
        </div>
        <div class="info-item disflex" v-show="!show1">
          <div class="textarea">
          <textarea placeholder="请填写备注信息" placeholder-style="color:#999;" maxlength="30" v-model="remarks"></textarea>

          </div>
          <div class="textarea-num flex">{{textNum}}/30</div>
        </div>
      </div>
      <!-- 优惠券 -->
      <div class="order-coupon disflex" @click="coupon">
        <div class="coupon-title flex">优惠券</div>
        <div class="coupon-title" v-if="!couponInfo.id">选择优惠券</div>
        <div class="coupon-text" v-else>-¥{{couponInfo.reduceAmount}}</div>
        <div class="icon10"><img src="../../../assets/right-xiao.png"></div>
      </div>
      <!-- 发票 -->
      <div class="order-invoice disflex" @click="invoice" v-if="orderInfo.infoInvioceVo">
        <div class="invoice-title">发票</div>
        <div class="icon13"><img src="../../../assets/icon-ts.png"></div>
        <div class="invoice-text flex" style="color:#C0A369;" v-if="orderInfo.infoInvioceVo.taxcode">【普通发票】 {{orderInfo.infoInvioceVo.company}}</div>
        <div class="invoice-text flex" v-else>请选择发票抬头</div>        
        <div class="icon10"><img src="../../../assets/right-xiao.png"></div>
      </div>
      <!-- 贵宾服务 -->
      <div class="order-vip">
        <div class="disflex">
          <div class="icon20"><img src="../../../assets/icon-hg.png"></div>
          <div class="flex vip-title">贵宾服务</div>
        </div>
        <div class="disflex vip-cont" v-for="(item,index) in serviceList" :key="index">
          <div class="flex">
            <div class="disflex">
              <i class="vip-dot"></i>
              <div class="flex">{{item.name}}</div>
            </div>
            <div class="disflex">
              <div><span class="vip-price">¥ {{item.price}}</span>/位</div>
              <div class="flex vip-text" @click="serviceGo(item.id)">详情</div>
            </div>
          </div>
          <div class="icon20" @click="jian(index)"><img src="../../../assets/icon-yjian.png"></div>
          <input style="font-size:12px;width:20px;text-align:center;" type="text"  disabled="disabled" v-model="item.nums">
          <div class="icon20" @click="jia(index)"><img src="../../../assets/icon-yjia.png"></div>
        </div>
        <!-- <div class="disflex vip-more">
          <div>更多服务 </div>
          <div class="vip-look">查看</div>
          <div class="vip-icon"><img src="../../../assets/icon-xia.png"></div>
        </div> -->
      </div>
      <!-- 会员享受权益 -->
      <div class="order-accord">
        <div>您是<span class="accord-color">【</span>{{orderInfo.vipName}}<span class="accord-color">】</span></div>
        <div class="accord-text">本人预定本人入住可享以下权益</div>
        <div class="accord-info disflex">
          <div class="accord-icon"><img src="../../../assets/icon-hd.png"></div>
          <div class="flex">本单可累积{{orderInfo.rewardScore}}积分</div>
        </div>
        <!-- <div class="accord-info disflex">
          <div class="accord-icon"><img src="../../../assets/icon-hd.png"></div>
          <div class="flex">延迟退房至12:00</div>
        </div>
        <div class="accord-info disflex">
          <div class="accord-icon"><img src="../../../assets/icon-hd.png"></div>
          <div class="flex">免费早餐一次</div>
        </div> -->
      </div>
      <!-- 选择房间数 -->
      <van-popup :show="show2" position="bottom" @close="onClose">
        <van-picker :columns="columns" @change="onChange" />
      </van-popup>
    </div>
    <!-- 提交订单 -->
    <div class="submit-wrapper vant-up">
      <div class="order-submit disflex">
        <div class="submit-title">订单金额</div>
        <div class="submit-price flex">¥{{orderInfo.finalPay}}</div>
        <div class="disflex" @click="detail">
          <div class="submit-text">明细</div>
          <div class="submit-icon"><img src="../../../assets/arrow.png"></div>
        </div>
        <div class="submit-btn" @click="submit">提交订单</div>
      </div>
      <!-- 明细弹层 -->
      <van-transition :show="show" name="slide-up" @click="onClose">
        <div class="order-detail">
          <div class="detail-title">账单明细</div>
          <div v-for="item in orderInfo.expenseDetailVoList" :key="item">
            <div class="detail-item disflex" :class="{jin:item.type == '1'}">
              <div class="flex">{{item.expenseName}}</div>
              <div class="hong" :class="{jin:item.type == '1'}">{{item.expenseDetail}}</div>
            </div>
          </div>
        </div>
      </van-transition>
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
            <div>{{houseInfo.roomFacilities}}</div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import navigationBar from '../../../components/navigationBar'
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
      phone: '',
      remarks: '',
      textNum: 0,
      columns: ['1', '2', '3', '4', '5'],
      rooms: 1,
      serviceNum: 0,
      orderInfo: {},
      serviceList: [],
      couponInfo: {},
      couponOrder: '',
      serviceOrder: [],
      strAdd: false, // 是否点击添加按钮
      str: []// 贵宾服务添加数组
    }
  },
  components: {
    navigationBar
  },
  onLoad (options) {
    this.show1 = false
    this.show = false
    this.dataInfo = {
      id: options.id,
      hotelId: options.hotelId,
      days: options.days
    }
    this.houseInfo = JSON.parse(options.data)
    getApp().globalData.data = ''
  },
  onUnload () {
    this.serviceOrder = []
    this.serviceList.forEach(e => {
      e.nums = 0
    })
    this.rooms = 1
    this.couponInfo = {}
    this.couponOrder = ''
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    let getDate = wx.getStorageSync('ROOM_SOURCE_DATE')
    let inDate = getDate.checkInDate.split('-')
    let OutDate = getDate.checkOutDate.split('-')
    this.checkInDate = inDate[1] + '月' + inDate[2] + '日'
    this.checkOutDate = OutDate[1] + '月' + OutDate[2] + '日'
    this.couponInfo = getApp().globalData.data
    if (this.couponInfo) {
      let couponObj = {
        id: this.couponInfo.id,
        couponPrice: this.couponInfo.reduceAmount,
        couponName: this.couponInfo.couponName
      }
      this.couponOrder = JSON.stringify(couponObj)
    } else {
      let couponObj = {
        id: '',
        couponPrice: '',
        couponName: ''
      }
      this.couponInfo = couponObj
    }
    if (this.serviceOrder.length === 0) {
      this.serviceOrder = ''
    }
    this.$http.post({
      url: '/order/order/orderInfoInit',
      header: userInfo.token,
      data: {
        userId: userInfo.userId + '',
        hotelId: this.dataInfo.hotelId,
        roomId: this.dataInfo.id,
        rooms: this.rooms + '',
        inTime: getDate.checkInDate + ' 00:00:00',
        outTime: getDate.checkOutDate + ' 00:00:00',
        couponOrderVoStr: this.couponOrder,
        orderHotelServiceListStr: this.serviceOrder
      }
    }).then(res => {
      console.log(res)
      this.orderInfo = res.data
      this.name = res.data.infoInvioceVo.name
      this.phone = res.data.infoInvioceVo.phone
      if (!this.strAdd) {
        res.data.hotelServiceVoList.forEach(e => {
          this.$set(e, 'nums', 0)
        })
        this.serviceList = res.data.hotelServiceVoList
      }
    })
  },
  watch: {
    remarks (res) {
      this.textNum = res.length
    },
    rooms (res) {
      let getDate = wx.getStorageSync('ROOM_SOURCE_DATE')
      let userInfo = wx.getStorageSync('userInfo')
      if (this.couponOrder) {
        this.couponOrder = ''
        this.couponInfo = {}
      }
      this.$http.post({
        url: '/order/order/orderInfoInit',
        header: userInfo.token,
        data: {
          userId: userInfo.userId + '',
          hotelId: this.dataInfo.hotelId,
          roomId: this.dataInfo.id,
          rooms: res + '',
          inTime: getDate.checkInDate + ' 00:00:00',
          outTime: getDate.checkOutDate + ' 00:00:00',
          couponOrderVoStr: this.couponOrder,
          orderHotelServiceListStr: this.serviceOrder
        }
      }).then(res => {
        console.log(res)
        this.orderInfo = res.data
      })
    }
  },
  methods: {
    detail () {
      this.show = !this.show
    },
    house () {
      this.show1 = true
    },
    days () {
      this.show2 = true
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
    serviceGo (id) { // 服务详情
      wx.navigateTo({
        url: '../service/main?id=' + id
      })
    },
    coupon () { // 选择优惠券
      wx.navigateTo({
        url: '../coupon/main?hotelId=' + this.dataInfo.hotelId + '&price=' + this.orderInfo.originalPrice
      })
    },
    invoice () { // 选择发票
      wx.navigateTo({
        url: '../invoice/main'
      })
    },
    submit () { // 订单提交
      console.log(this.couponInfo)
      let getDate = wx.getStorageSync('ROOM_SOURCE_DATE')
      let userInfo = wx.getStorageSync('userInfo')
      let data = {
        hotelId: this.dataInfo.hotelId,
        roomId: this.dataInfo.id,
        couponId: this.couponInfo.id + '',
        days: this.dataInfo.days,
        inTime: getDate.checkInDate + ' 00:00:00',
        outTime: getDate.checkOutDate + ' 00:00:00',
        rooms: this.rooms + '',
        userId: userInfo.userId + '',
        userName: this.name,
        phone: this.phone,
        totalPay: this.orderInfo.totalPay + '',
        finalPay: this.orderInfo.finalPay + '',
        memo: this.remarks,
        company: this.orderInfo.infoInvioceVo.company,
        taxcode: this.orderInfo.infoInvioceVo.taxcode,
        vipLevel: this.orderInfo.vipLevel + '',
        hotelServiceVoListStr: this.serviceOrder,
        couponPrice: this.couponInfo.reduceAmount
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
          url: '../../order/details/main?data=' + JSON.stringify(data)
        })
      }
    },
    jian (index) {
      if (this.couponOrder) {
        this.couponOrder = ''
        this.couponInfo = {}
      }
      let userInfo = wx.getStorageSync('userInfo')
      if (this.serviceList[index].nums !== 0) {
        this.serviceList[index].nums--
        let obj = {
          id: this.serviceList[index].id,
          name: this.serviceList[index].name,
          numbers: this.serviceList[index].nums,
          price: this.serviceList[index].price
        }
        for (let i = 0; i < this.str.length; i++) {
          if (this.str[i].id === obj.id) {
            this.str[i].numbers = obj.numbers
          }
          if (this.str[i].id === obj.id && this.str[i].numbers === 0) {
            this.str.splice(i, 1)
          }
        }
        this.serviceOrder = JSON.stringify(this.str)
        let getDate = wx.getStorageSync('ROOM_SOURCE_DATE')
        this.$http.post({
          url: '/order/order/orderInfoInit',
          header: userInfo.token,
          data: {
            userId: userInfo.userId + '',
            hotelId: this.dataInfo.hotelId,
            roomId: this.dataInfo.id,
            rooms: this.rooms + '',
            inTime: getDate.checkInDate + ' 00:00:00',
            outTime: getDate.checkOutDate + ' 00:00:00',
            couponOrderVoStr: this.couponOrder,
            orderHotelServiceListStr: this.serviceOrder
          }
        }).then(res => {
          console.log(res)
          this.orderInfo = res.data
        })
      }
    },
    jia (index) {
      if (this.couponOrder) {
        this.couponOrder = ''
        this.couponInfo = {}
      }
      let userInfo = wx.getStorageSync('userInfo')
      this.strAdd = true
      this.serviceList[index].nums++
      let obj = {
        id: this.serviceList[index].id,
        name: this.serviceList[index].name,
        numbers: this.serviceList[index].nums,
        price: this.serviceList[index].price
      }
      if (this.str.length === 0) {
        this.str.push(obj)
      } else {
        for (let i = 0; i < this.str.length; i++) {
          if (this.str[i].id === obj.id) {
            this.str[i].numbers = obj.numbers
            break
          } else if (this.str[i].id !== obj.id && this.str.length === i + 1) {
            this.str.push(obj)
          } else {
          }
        }
      }
      this.serviceOrder = JSON.stringify(this.str)
      let getDate = wx.getStorageSync('ROOM_SOURCE_DATE')
      this.$http.post({
        url: '/order/order/orderInfoInit',
        header: userInfo.token,
        data: {
          userId: userInfo.userId + '',
          hotelId: this.dataInfo.hotelId,
          roomId: this.dataInfo.id,
          rooms: this.rooms + '',
          inTime: getDate.checkInDate + ' 00:00:00',
          outTime: getDate.checkOutDate + ' 00:00:00',
          couponOrderVoStr: this.couponOrder,
          orderHotelServiceListStr: this.serviceOrder
        }
      }).then(res => {
        console.log(res)
        this.orderInfo = res.data
      })
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
  .order-time {background-color: #fff;padding: 12px 0;margin: 24px 0 8px;border-radius: 4px;
    .text {font-size: 11px;color: #888;margin-bottom: 5px;}
    .riqi {font-size: 15px;}
    .xyouImg {width: 20px;height: 13px;}
    .xianImg {width: 1px;height: 19px;background-color: #979797;}
  }
  .order-info, .order-coupon, .order-invoice, .order-vip {background-color: #fff;border-radius: 4px;margin-bottom: 15px;}
  .order-info {padding:3px 18px 18px 18px;
    .info-item {border-bottom: 1px solid #D9D9D9;padding: 15px 0;
      .info-title {font-size: 14px;color: #888;margin-right: 24px;}
      .info-text {font-size: 14px;font-weight: bold;z-index: 0;}
      .textarea {width: 100%;height: 35px;font-size: 14px;color: #888;
        textarea {height: 100%;}
      }
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
  .order-vip {padding: 15px 11px 11px 11px;
    .vip-title {font-size: 15px;font-weight: bold;margin-left: 5px;}
    .vip-cont {margin: 13px 0 15px;padding: 10px 15px;font-size: 14px;background-image: url('http://oss.jiatu360.cn/xcx/bg2.png');background-size: 100% 100%;
      .vip-dot {width: 5px;height: 5px;border-radius: 50%;background-color: #C0A369;margin-right: 5px;}
      .vip-price {color: #FE5722;}
      .vip-text {font-size: 11px;color: #C0A369;margin-left: 10px;}
    }
    .vip-more {border-top: 1px solid #D9D9D9;color: #999;font-size: 11px;padding-top: 13px;
      .vip-look {margin-left: 8px;color: #C0A369;}
      .vip-icon {width: 9px;height: 6px;margin: 3px 0 0 2px;}
    }
  }
  .order-accord {font-size: 15px;
    .accord-color {color: #C0A369;}
    .accord-text {font-size: 14px;color: #666;margin: 11px 0 5px;}
    .accord-info {font-size: 12px;color: #666;margin-bottom: 3px;
      .accord-icon {width: 12px;height: 12px;margin-right: 5px;}
    }
  }
}
.submit-wrapper {position: fixed;bottom: 0;left: 0;width: 100%;z-index: 9;
  .order-submit {width: 100%;height: 50px;background-color: #fff;box-shadow: 0px -1px 4px 0px rgba(0,0,0,0.1);
    .submit-title {font-size: 16px;margin-left: 14px;}
    .submit-price {font-size: 20px;color: #ED5858;margin-left: 12px;}
    .submit-text {font-size: 12px;color: #999;}
    .submit-icon {width: 10px;height: 6px;margin: 0 15px 0 3px;}
    .submit-btn {width: 128px;height: 50px;line-height: 50px;text-align: center;font-size: 16px;background-color: #C0A369;color: #fff;}
  }
  .order-detail {background-color: #fff;padding: 0 15px;box-shadow: 0px -1px 4px 0px rgba(0,0,0,0.1);
    .detail-title {font-size: 13px;font-weight: bold;text-align: center;padding: 5px 0 10px;}
    .detail-item {padding: 10px 10px 7px 0;border-bottom: 1px solid #D9D9D9;font-size: 12px;}
    .hong {color: #ED5858;}
    .jin {color: #C0A369;}
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