<template>
  <div>
    <navigation-bar
    :navBackgroundColor="colorBar"
    :titleColor="''"
    :title="titleBar"
    :back-visible="true"
    :home-path="false"
    v-if="navigationShow"></navigation-bar>
    <div class="bg-img">
      <swiper circular="true" @change="swiperChange" style="height:100%;">
        <block v-for="item in imgList" :key="item">
          <swiper-item>
            <img :src="item" style="height"/>
          </swiper-item>
        </block>
      </swiper>
      <view class="dots"> 
        <block v-for="(item,index) in imgList" :key="index"> 
          <view class="dot" :class="index == swiperCurrent ? ' active' : ''"></view> 
        </block> 
      </view>
    </div>
    <!-- 首屏蒙层 -->
    <div class="mask-wrapper">
      <div class="disflex mask-title">
        <div class="flex">
          <div class="title20">{{detailList.hotelName}}</div>
          <div class="title15">{{detailList.enName}}</div>
          <div class="title11">{{detailList.tags}}</div>
        </div>
        <div class="mask-phone" @click="phone(detailList.phone)"><img src="../../../assets/icon-dh.png"></div>
      </div>
      <div class="mask-nav"></div><!-- 轮播图点占据位置 -->
      <div class="disflex mask-cont">
        <div class="mask-left" @click="commentGo">
          <div class="left-num">{{detailList.score}}</div>
          <div class="left-xian"></div>
          <div class="left-text">{{detailList.commentSize}}评论></div>
        </div>
        <div class="flex mask-right">
          <div class="disflex mask-details" @click="map">
            <div class="flex">
              <div class="details-title">{{detailList.address}}</div>
              <div class="details-text">{{detailList.addressDetail}}</div>
            </div>
            <div class="icon13"><img src="../../../assets/right.png"></div>
          </div>
        </div>
      </div>
      <div class="disflex mask-house" @click="pageScroll">
        <div>查看房型</div>
        <div class="house-icon"><img src="../../../assets/icon-btn.png"></div>
      </div>
    </div>
    <div class="hotel-wrapper">
      <div class="vant-tab" :class="colorBar?' fixed':''" :style="{top: titleBarHeight + 'px'}">
        <!-- <van-tabs :active="active" @change="onChange">
          <van-tab title="客房"></van-tab>
          <van-tab title="餐饮"></van-tab>
          <van-tab title="KTV"></van-tab>
          <van-tab title="足浴"></van-tab>
        </van-tabs> -->
        <van-tabs :active="active" :data="detailList.departmentInfos" @change="onChange">
          <div v-for="item in detailList.departmentInfos" :key="item">
            <van-tab :title="item.name"></van-tab>
          </div>
        </van-tabs>
      </div>
      <div v-if="vantTabShow" :style="{height: titleBarHeight + vantTabShowHeight - 24 + 'px'}"></div>
      <div v-if="vantTabShow1" :style="{height: titleBarHeight + vantTabShowHeight + 'px'}"></div>
      <div v-if="cont === 1">
        <!-- 入住时间/会员 -->
        <div class="hotel-date">
          <div class="disflex hotel-vip" v-if="loginShow" @click="vipDetails(detailList.vipName)">
            <div class="vip-logo"><img src="../../../assets/logo1.png"></div>
            <div class="flex">
              <div class="vip-title">您是{{detailList.vipName}}，本人预订本人入住可享</div>
              <div class="vip-text">免费早餐 会员积分 延迟退房</div>
            </div>
            <div class="icon16"><img src="../../../assets/right-gary.png"></div>
          </div>
          <div class="disflex hotel-vip" v-else>
            <div class="vip-logo"><img src="../../../assets/logo1.png"></div>
            <div class="flex">
              <div class="vip-title">印记会员尊享礼遇</div>
              <div class="vip-text">免费早餐 会员积分 延迟退房</div>
            </div>
            <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" style="font-size: 12px;color: #C0A369;" @click="login">登陆查看</button>
            <div class="icon16"><img src="../../../assets/right-gary.png"></div>
          </div>
          <div class="hotel-time disflex" @click="selectTime">
            <div class="flex" style="margin-right: 30px;">
              <div class="time-text">入住时间</div>
              <div class="time-num">{{checkInDate}}</div>
            </div>
            <div class="flex">
              <div class="time-text">离店时间</div>
              <div class="time-num">{{checkOutDate}}</div>
            </div>
            <div class="flex" style="font-size: 12px;text-align: center;margin: 0 15px;">共{{days}}晚</div>
            <div class="flex">
              <div class="time-text">入住人数</div>
              <div class="time-num">1~2人</div>
            </div>
          </div>
        </div>
        <!-- 房间列表 -->
        <div v-for="(item,index) in hotelList" :key="index">
          <div class="hotel-list" style="margin-bottom: 10px;">
            <div class="list-img" @click="imgLook(item.imgList)">
              <img :src="item.imgList[0]">
              <div class="img-num">{{item.imgList.length}}张</div>
            </div>
            <div class="disflex list-cont" style="border-bottom: 1px solid #D9D9D9;" @click="showList(index,item.id)">
              <div class="list-title">{{item.name}}</div>
              <div class="list-text" @click.stop="hotelDetails(item)">详情</div>
              <div class="flex"></div>
              <div>
                <div class="list-price">¥<span class="price">{{item.price}}</span>起</div>
                <div class="list-num">门市价<span style="text-decoration:line-through;">¥{{item.defaultPrice}}</span></div>
              </div>
              <div class="list-icon" :class="shows==1&&show==index?'icon180':'icon0'"><img src="../../../assets/top.png"></div>
            </div>
          </div>
          <div class="list-item" v-if="shows==1&&show==index">
            <div class="disflex list-cont border_cell2">
              <div class="flex">
                <div class="list-title">{{item.priceName}}</div>
                <div class="list-num"><span v-text="item.cancel==0?'不可取消':'可取消'"></span> | <span v-text="item.breakfast==0?'不含餐饮':'含餐饮'"></span></div>
              </div>
              <div>
                <div class="list-pay">¥{{item.price}}</div>
                <div class="list-num">含税+服务费</div>
              </div>
              <div class="list-btn" v-if="item.status==1" @click="subscribe(item.id,item)">预定</div>
              <div class="list-btn gary" v-else>满房</div>
            </div>
            <div v-for="(items,indexs) in roomList" :key="indexs">
              <div class="disflex list-cont border_cell2">
                <div class="flex">
                  <div class="list-title">{{items.priceName}}</div>
                  <div style="height: 14px;" v-if="items.breakfast==0"></div>
                  <div class="list-num" v-else><span v-text="items.breakfast==1?'含一份早餐':'含两份早餐'"></span></div>
                </div>
                <div>
                  <div class="room-pay">¥{{items.price}}起</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 酒店设施 -->
        <div class="hotel-facilities">
          <div class="disflex facilities-title" @click="facilitiesGo">
            <div class="icon16"><img src="../../../assets/icon-ss.png"></div>
            <div class="flex facilities-left">基础设施和介绍</div>
            <div class="facilities-right">详情</div>
            <div class="icon8"><img src="../../../assets/right-xiao.png"></div>
          </div>
          <div class="disflex facilities-icon">
            <div class="flex">
              <div class="icon25"><img src="../../../assets/icon-rs.png"></div>
              <div class="icon-text">24小时热水</div>
            </div>
            <div class="flex">
              <div class="icon25"><img src="../../../assets/icon-xl.png"></div>
              <div class="icon-text">行李寄存</div>
            </div>
            <div class="flex">
              <div class="icon25"><img src="../../../assets/icon-hys.png"></div>
              <div class="icon-text">会议室</div>
            </div>
            <div class="flex">
              <div class="icon25"><img src="../../../assets/icon-tc.png"></div>
              <div class="icon-text">免费停车</div>
            </div>
            <div class="flex">
              <div class="icon25"><img src="../../../assets/more.png"></div>
              <div class="icon-text">更多</div>
            </div>
          </div>
        </div>
        <!-- 酒店服务 -->
        <div v-for="(item,index) in serviceList" :key="index">
          <div class="hotel-service">
            <div class="disflex">
              <div class="icon16" style="border-radius:50%;overflow:hidden;"><img src="../../../assets/icon-ss.png"></div>
              <div class="flex service-name">{{item.title}}</div>
              <div>{{item.current}}/{{item.hotelDetailExtraVos.length}}</div>
            </div>
            <swiper :circular="circular" :duration="duration" :id="index" style="height: 100%;" @change="imgIndex">
              <block v-for="(items,indexs) in item.hotelDetailExtraVos" :key="indexs">
                <swiper-item>
                  <div class="service-cont">
                    <div class="service-img"><img :src="items.image"></div>
                    <div class="service-title">{{items.title}}</div>
                    <div class="service-text">{{items.text}}</div>
                  </div>
                </swiper-item>
              </block>
            </swiper>
          </div>
        </div>
      </div>
      <div v-if="cont === 4">
        <div class="chat" v-if="chatShow" @click="download"><img src="../../../assets/icon-liaotian.png"></div>
        <div class="swiper-box">
          <swiper circular="true" @change="swiperChange">
            <block v-for="item in bannerList" :key="item">
              <swiper-item>
                <image :src="item.image"/>
              </swiper-item>
            </block>
          </swiper>
          <view class="dots"> 
            <block v-for="(item,index) in bannerList" :key="index"> 
              <view class="dot" :class="index == swiperCurrent ? ' active' : ''"></view> 
            </block> 
          </view>
        </div>
        <div style="margin:20px 0 15px 15px;font-size:20px;">{{departmentCompartment.name}}</div>
        <div class="balcony-box">
          <swiper circular="true" next-margin="50px" style="height: 100%;">
            <block v-for="(item,index) in departmentCompartment.value" :key="index">
              <swiper-item>
                <div class="balcony-wrapper">
                  <div class="balcony-img"><img :src="item.commodityImg" /></div>
                  <div class="balcony-cont">
                    <div class="balcony-title">{{item.name}}</div>
                    <div class="balcony-text">{{item.introduction}}</div>
                    <div class="balcony-btn" @click="departmentOrder(item.id,item)">预订</div>
                  </div>
                </div>
              </swiper-item>
            </block>
          </swiper>
        </div>
        <div style="margin:20px 0 15px 15px;font-size:20px;">{{departmentFood.name}}</div>
        <div class="ktv-list disflex" v-for="(item,index) in departmentFood.value" :key="index">
          <div class="ktv-img"><img :src="item.commodityImg"></div>
          <div class="flex">
            <div class="ktv-title">{{item.name}}</div>
            <div class="ktv-text">{{item.introduction}}</div>
          </div>
          <div class="ktv-price">￥{{item.price}}</div>
        </div>
      </div>
      <div v-if="cont === 2">
        <div class="chat" v-if="chatShow" @click="download"><img src="../../../assets/icon-liaotian.png"></div>
        <div class="swiper-box">
          <swiper circular="true" @change="swiperChange">
            <block v-for="item in bannerList" :key="item">
              <swiper-item>
                <image :src="item.image"/>
              </swiper-item>
            </block>
          </swiper>
          <view class="dots"> 
            <block v-for="(item,index) in bannerList" :key="index"> 
              <view class="dot" :class="index == swiperCurrent ? ' active' : ''"></view> 
            </block> 
          </view>
        </div>
        <div style="margin:20px 0 15px 15px;font-size:20px;">{{departmentAmusement.name}}</div>
        <div class="ktv-wrapper disflex" v-for="(item,index) in departmentAmusement.value" :key="index">
          <div class="ktv-fristImg"><img :src="item.workAvatar"><div class="chatx" v-if="chatShow"><img src="../../../assets/icon-liaot.png"></div></div>
          <div class="ktv-endImg" v-for="(items,indexs) in item.underlingInfos" :key="indexs"><img :src="items.workAvatar"></div>
        </div>
        <div style="margin:20px 0 15px 15px;font-size:20px;">{{departmentBalcony.name}}</div>
        <div class="ktv-list disflex" v-for="item in departmentBalcony.value" :key="item">
          <div class="ktv-img"><img :src="item.commodityImg"></div>
          <div class="flex">
            <div class="ktv-title">{{item.name}}</div>
            <div class="ktv-text">{{item.introduction}}</div>
          </div>
          <div>
            <div class="ktv-price hong">￥{{item.price}} <span style="font-size:14px;">整晚</span></div>
            <div class="ktv-btn" @click="departmentOrder(item.id,item)">预订</div>
          </div>
        </div>
      </div>
      <div v-if="cont === 3">
        <div class="chat" v-if="chatShow" @click="download"><img src="../../../assets/icon-liaotian.png"></div>
        <div class="swiper-box">
          <swiper circular="true" @change="swiperChange">
            <block v-for="item in bannerList" :key="item">
              <swiper-item>
                <image :src="item.image"/>
              </swiper-item>
            </block>
          </swiper>
          <view class="dots"> 
            <block v-for="(item,index) in bannerList" :key="index"> 
              <view class="dot" :class="index == swiperCurrent ? ' active' : ''"></view> 
            </block> 
          </view>
        </div>
        <div style="margin:20px 0 15px 15px;font-size:20px;text-align:center;">{{departmentSetMeal.name}}</div>
        <div class="foot-list disflex" v-for="item in departmentSetMeal.value" :key="item">
          <div class="foot-img"><img :src="item.commodityImg"></div>
          <div class="flex">
            <div class="foot-title">{{item.name}}</div>
            <div class="foot-text">{{item.introduction}}</div>
            <div class="foot-price hong">￥{{item.price}}</div>
          </div>
          <div>
            <div class="foot-btn" @click="departmentOrder(item.id,item)">预订</div>
          </div>
        </div>
        <div style="margin:20px 0 15px 15px;font-size:20px;text-align:center;">{{departmentArtificer.name}}</div>
        <div class="foot-wrapper" v-if="departmentArtificer.value">
          <div class="foot-listImg" v-for="item in departmentArtificer.value[0].underlingInfos" :key="item">
            <div class="foot-img"><img :src="item.workAvatar"></div>
            <div class="foot-text">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 详情弹窗 -->
    <div class="vant-popup">
      <van-popup :show="show1" @close="onClose">
        <div class="house-popup">
          <swiper indicator-dots="true" circular="true">
            <block v-for="item in hotelItem.imgList" :key="item">
              <swiper-item>
                <img :src="item">
              </swiper-item>
            </block>
          </swiper>
          <div class="popup-title">{{hotelItem.name}}</div>
          <div class="popup-info">
            <div class="popup-item"><span class="popup-space">楼层</span>：{{hotelItem.floor}}</div>
            <div class="popup-item"><span>最多入住</span>：{{hotelItem.people}}</div>
            <div class="popup-item"><span class="popup-space">床型</span>：{{hotelItem.bed}}</div>
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
      videoTitle: '自定义标题',
      collectShow: false,
      show1: false,
      activeNames: ['1'],
      circular: true,
      duration: 1000,
      current: 1,
      show: 0,
      shows: 0,
      loginShow: false, // 登陆显示用户权益
      hotelId: '',
      detailList: {}, // 详情信息
      imgList: [], // 房型图片
      serviceList: [], // 酒店服务
      hotelList: [], // 房型信息
      hotelImgList: [], // 房型图片
      hotelItem: {}, // 房型弹窗信息
      bannerList: [], // 部门banner图
      departmentList: [], // 部门信息
      departmentCompartment: {}, // 包间
      departmentFood: {}, // 菜品
      departmentAmusement: {}, // 娱乐经理
      departmentBalcony: {}, // 包厢
      departmentArtificer: {}, // 技师
      departmentSetMeal: {}, // 套餐
      roomList: [], // 其他平台房型价格
      checkInDate: '',
      checkOutDate: '',
      cont: 1,
      days: '', // 共住几晚
      swiperCurrent: 0,
      navigationShow: true,
      vantTabShow: false,
      vantTabShow1: false,
      titleBarHeight: 0,
      vantTabShowHeight: 0,
      screenHeight: 0,
      colorBar: '',
      titleBar: '',
      chatShow: false
    }
  },
  components: {
    navigationBar
  },
  onShareAppMessage (res) { // 转发分享
    if (res.from === 'button') {
    }
    return {
      title: '转发',
      path: '',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  onUnload () {
    this.show1 = false
    this.cont = 1
    this.colorBar = ''
    this.titleBar = ''
    this.vantTabShow = false
    this.swiperCurrent = 0
  },
  onLoad (options) {
    this.show = 0
    this.hotelId = options.id
    var that = this
    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
      }
    })
    wx.checkSession({
      success (res) {
        console.log(res)
        if (wx.getStorageSync('userInfo')) {
          that.loginShow = true
        }
      },
      fail (res) {
        console.log(res)
        that.loginShow = false
      }
    })
    wx.getSystemInfo({
      success (system) {
        that.screenHeight = system.screenHeight
        let statusBarHeight = system.statusBarHeight
        let platformReg = /ios/i
        if (platformReg.test(system.platform)) {
          that.titleBarHeight = 44 + statusBarHeight
        } else {
          that.titleBarHeight = 48 + statusBarHeight
        }
      }
    })
    wx.setStorageSync('days', 1)
    this.days = wx.getStorageSync('days')
  },
  onShow () {
    this.show = 0
    let userInfo = wx.getStorageSync('userInfo')
    let getDate = wx.getStorageSync('ROOM_SOURCE_DATE')
    let inDate = getDate.checkInDate.split('-')
    let OutDate = getDate.checkOutDate.split('-')
    this.checkInDate = inDate[1] + '月' + inDate[2] + '日'
    this.checkOutDate = OutDate[1] + '月' + OutDate[2] + '日'
    this.days = wx.getStorageSync('days')
    this.$http.post({
      url: '/hotel/hotelDetailInfo/selectDetailByHotelId',
      header: userInfo.token,
      data: {
        // userId: userInfo.userId + '',
        userId: '-1',
        hotelId: this.hotelId + ''
      }
    }).then(res => {
      let str = res.data.detailImages.split(',')
      this.imgList = this.$common.httpTypeImg(str)
      res.data.hotelDetailExtraInfoVos.forEach(e => {
        e.current = 1
      })
      this.serviceList = res.data.hotelDetailExtraInfoVos
      this.detailList = res.data
    })
    this.$http.post({
      url: '/hotel/roomInfo/queryRoomTypeByDate',
      header: userInfo.token,
      data: {
        // userId: userInfo.userId + '',
        userId: '-1',
        hotelId: this.hotelId + '',
        startTime: getDate.checkInDate,
        endTime: getDate.checkOutDate
      }
    }).then(res => {
      res.data.forEach(el => {
        let str = el.roomPic.split(',')
        el.imgList = this.$common.httpTypeImg(str)
        // el.$set('show', 0)
      })
      this.hotelList = res.data
      this.showList(0, res.data[0].id)
    })
  },
  onPageScroll (e) { // 监听页面滚动的高度，导航加背景文字，切换吸顶
    if (e.scrollTop >= this.screenHeight - this.titleBarHeight) {
      this.colorBar = '#fff'
      this.titleBar = this.detailList.hotelName
      this.vantTabShow = true
    } else {
      this.colorBar = ''
      this.titleBar = ''
      this.vantTabShow = false
    }
    if (e.scrollTop >= 400) {
      this.chatShow = true
    } else {
      this.chatShow = false
    }
  },
  methods: {
    pageScroll () { // 页面向下滑动当前屏幕的高度
      wx.getSystemInfo({
        success (res) {
          wx.pageScrollTo({
            scrollTop: res.screenHeight
          })
        }
      })
    },
    collect () {
      this.collectShow = !this.collectShow
    },
    onClose () {
      this.show1 = false
    },
    onChange (event) {
      let userInfo = wx.getStorageSync('userInfo')
      let departmentId
      this.detailList.departmentInfos.forEach(e => {
        if (event.target.title === e.name) {
          this.cont = e.id
          departmentId = e.id
        }
      })
      if (departmentId === 1) {

      } else {
        this.$http.get({// 部门banner
          url: `/hotel/hotelInfo/getBanner/3/${this.hotelId}/${departmentId}`,
          header: userInfo.token
        }).then(res => {
          res.data.forEach(el => {
            if (el.image.substr(0, 4) !== 'http') {
              el.image = 'http://' + el.image
            }
          })
          this.bannerList = res.data
        })
        this.$http.get({// 部门信息
          url: `/hotel/commodityInfo/selectCommodityByHotelIdAndDepartment/${this.hotelId}/${departmentId}`,
          header: userInfo.token
        }).then(res => {
          res.data.forEach(el => {
            if (departmentId === 4) {
              if (el.typeId === 3) {
                this.departmentFood = el
              } else if (el.typeId === 4) {
                this.departmentCompartment = el
              }
            } else if (departmentId === 2) {
              if (el.typeId === 0) {
                this.departmentAmusement = el
              } else if (el.typeId === 1) {
                this.departmentBalcony = el
              }
            } else if (departmentId === 3) {
              if (el.typeId === 0) {
                this.departmentArtificer = el
              } else if (el.typeId === 2) {
                this.departmentSetMeal = el
              }
            }
          })
        })
      }
    },
    swiperChange (e) {
      this.swiperCurrent = e.mp.detail.current
    },
    hotelDetails (item) { // 酒店查看详情弹窗
      this.show1 = true
      this.hotelItem = item
    },
    commentGo () { // 酒店点评信息
      wx.navigateTo({
        url: '../comment/main?hotelId=' + this.detailList.hotelId
      })
    },
    imgLook (item) {
      // let imgArr = []
      // item.forEach(e => {
      //   e = 'http://' + e
      //   imgArr.push(e)
      // })
      wx.previewImage({
        current: item[0], // 当前显示图片的http链接
        urls: item // 需要预览的图片http链接列表
      })
    },
    imgIndex (e) { // 图片索引值
      let index = e.mp.currentTarget.id
      this.serviceList[index].current = e.mp.detail.current + 1
    },
    selectTime () { // 选择时间
      wx.navigateTo({
        url: '../time/main'
      })
    },
    vipDetails (res) { // 会员权益
      wx.navigateTo({
        url: '../vipInfo/main?data=' + res
      })
    },
    phone (res) { // 联系客服
      wx.makePhoneCall({
        phoneNumber: res
      })
    },
    facilitiesGo () { // 服务与设施
      wx.navigateTo({
        url: '../facilities/main?id=' + this.detailList.serviceId + '&hotelId=' + this.detailList.hotelId
      })
    },
    showList (index, id) { // 下拉菜单
      let getDate = wx.getStorageSync('ROOM_SOURCE_DATE')
      let inDate = getDate.checkInDate
      let userInfo = wx.getStorageSync('userInfo')
      if (index === this.show) {
        if (this.shows === 1) {
          this.shows = 0
        } else {
          this.shows = 1
          this.$http.get({// 部门banner
            url: `/hotel/roomCrawlerPrice/selectRoomCrawls/${id}/${inDate} 0:0:0`,
            header: userInfo.token
          }).then(res => {
            this.roomList = res.data
          })
        }
      } else {
        this.show = index
        this.shows = 1
        this.$http.get({// 部门banner
          url: `/hotel/roomCrawlerPrice/selectRoomCrawls/${id}/${inDate} 0:0:0`,
          header: userInfo.token
        }).then(res => {
          this.roomList = res.data
        })
      }

      // if (this.show !== index || index === 0) {
      //   this.show = index
      //   this.$http.get({// 部门banner
      //     url: `/hotel/roomCrawlerPrice/selectRoomCrawls/${id}/${inDate} 0:0:0`,
      //     header: userInfo.token
      //   }).then(res => {
      //     this.roomList = res.data
      //   })
      // } else {
      //   this.show = -1
      // }
    },
    subscribe (id, item) { // 订单预订
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        let data = JSON.stringify(item)
        wx.navigateTo({
          url: '../order/main?id=' + id + '&hotelId=' + this.hotelId + '&days=' + this.days + '&data=' + data
        })
      } else {
        wx.showToast({
          title: '登陆即可体验',
          icon: 'none',
          image: '',
          duration: 1500,
          success: (result) => {
            setTimeout(() => {
              wx.switchTab({url: '../../my/index/main'})
            }, 1500)
          }
        })
      }
    },
    departmentOrder (id, item) { // 部门订单
      // let data = JSON.stringify(item)
      wx.navigateTo({
        url: '../orderDepartment/main?hotelId=' + this.hotelId + '&id=' + id
      })
    },
    map () { // 地图导航
      console.log('ssssss')
      var that = this
      let position = that.detailList.position.split(',')
      // wx.getLocation({// 获取当前经纬度
      //   type: 'wgs84',
      //   success: function (res) {
      //     console.log(res)
      wx.openLocation({// 使用微信内置地图查看位置
        latitude: parseFloat(position[1]),
        longitude: parseFloat(position[0]),
        name: that.detailList.hotelName,
        address: that.detailList.address
      })
      //   }
      // })
    },
    getPhoneNumber (e) {
      let sharePhone = wx.getStorageSync('sharePhone')
      if (e.mp.detail.errMsg === 'getPhoneNumber:ok') {
        wx.login({
          success: (res) => {
            this.$http.post({
              url: '/user/xcxLogin',
              data: {
                code: res.code,
                ivStr: e.mp.detail.iv,
                encDataStr: e.mp.detail.encryptedData,
                sharePhone: sharePhone
              }
            }).then(res => {
              console.log(res)
              this.show = true
              this.userInfo = res.data
              wx.setStorageSync('userInfo', res.data)
            })
          }
        })
      }
    },
    download () { // 下载页
      wx.navigateTo({
        url: '../webView/main'
      })
    }
  }
}
</script>

<style lang="scss">
.bg-img {width: 100%;height: 100vh;position: relative;
  .dots{position: absolute;left: 0;right: 0;bottom: 130px;display: flex; justify-content: center;z-index: 9;
    .dot{margin: 0 4px;width: 20%;height: 2px;background: #CFD0D2;transition: all .6s;opacity: .5;}
    .active{background: #fff;opacity: .9;}
  }
}
.icon180 {transform: rotate(180deg);transition: all .5s;}
.icon0 {transition: all .5s;}
.chat {width: 35px;height: 30px;position: fixed;right: 10px;bottom: 100px;z-index: 999;}
.mask-wrapper {width: 100%;padding: 12px 0 24px 0;position: absolute;bottom: 0;color: #fff;background-image: url('http://oss.jiatu360.cn/xcx/mask.png');background-size: 100% 100%;
  .mask-title {padding: 0 14px;
    .title20 {font-size: 20px;font-weight: 500;margin-bottom: 1px}
    .title15 {font-size: 15px;margin-bottom: 5px;}
    .title11 {font-size: 11px;font-weight: 300;}
    .mask-phone {width: 26px;height: 26px;margin-right: 15px;}
  }
  .mask-nav {height: 13px;}
  .mask-cont {padding: 0 14px;margin-top: 5px;
    .mask-left {border: 1px solid #C0A369;text-align: center;padding: 9px;border-radius: 0px 4px 0px 4px;
      .left-num {font-size: 20px;font-weight: 500;}
      .left-xian {width: 37px;height: 1px;background-color: #fff;margin: 8px auto;}
      .left-text {font-size: 10px;font-weight: 300;}
    }
    .mask-right {margin-left: 13px;
      .mask-details {margin-right: 7px;
        .details-title {font-size: 13px;margin-bottom: 7px;display: inline-block;}
        .details-text {font-size: 11px;font-weight: 300;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;}
      }
    }
  }
  .mask-house {font-size: 15px;font-weight: 500;float: right;margin-right: 12px;
    .house-icon {width: 16px;height: 10px;margin-left: 6px;}
  }
}
.hotel-wrapper {
  .fixed {width: 100%;position: fixed;z-index: 999;}
  .hotel-date {padding: 15px;
    .hotel-vip {background-color: #fff;padding: 5px 15px;margin-bottom: 12px;
      .vip-logo {width: 31px;height: 25px;margin-right: 13px;}
      .vip-title {font-size: 14px;}
      .vip-text {font-size: 11px;font-weight: 400;color: #888;}
    }
    .hotel-time {background-color: #fff;padding: 13px 10px 13px 20px;
      .time-text {font-size: 11px;color: #888;margin-bottom: 4px;}
      .time-num {font-size: 14px;font-weight: 600;}
    }
  }
  .hotel-list, .list-item {padding: 15px 15px 0 15px;background-color: #fff;
    .list-img {height: 140px;border-radius: 8px;overflow: hidden;position: relative;
      .img-num {position: absolute;right: 10px;bottom: 10px;background-color: rgba(0,0,0,0.5);color: #fff;font-size: 10px;text-align: center;border-radius: 7px;width: 30px;line-height: 15px;}
    }
    .list-cont {padding: 10px 0;
      .list-title {font-size: 18px;}
      .list-text {font-size: 10px;color: #BA9847;margin-left: 4px;}
      .list-price {color: #ED5858;font-size: 11px;margin-bottom: 3px;
        .price {font-size: 20px;margin: 0 4px;font-weight: 600;}
      }
      .list-num {font-size: 10px;color: #888;}
      .list-icon {width: 15px;height: 9px;margin-left: 5px;}
    }
  }
  .list-item {padding: 0 15px 10px 15px;background-color: #F9F9F9;
    .list-pay {font-size: 20px;font-weight: 600;color: #ED5858;text-align: right;}
    .list-btn {width: 58px;height: 32px;line-height: 32px;text-align: center;background-color: #C0A369;color: #fff;font-size: 14px;border-radius: 4px;margin-left: 9px;}
    .room-pay {color: #999;font-size:18px;}
    .gary {background-color: #D9D9D9;}
  }
  .hotel-facilities {padding: 19px 15px;margin-bottom: 10px;background-color: #fff;
    .facilities-title {padding: 0 0 13px 2px;border-bottom: 1px solid #D9D9D9;
      .facilities-left {font-size: 12px;margin-left: 8px;font-weight: 500;}
      .facilities-right {font-size: 10px;margin-right: 2px;}
    }
    .facilities-icon {padding: 13px 0 10px 0;
      .icon-text {font-size: 10px;color: #999;text-align: center;margin-top: 6px;}
    }
  }
  .hotel-service {padding: 19px 15px 0 15px;background-color: #fff;height: 353px;
    .service-name {font-size: 12px;margin-left: 8px;font-weight: 500;}
    .service-cont {border: 1px solid #D9D9D9;border-radius:8px;margin-top: 15px;overflow: hidden;
      .service-img {height: 230px;}
      .service-title {font-size: 15px;margin: 14px 0 7px 10px;}
      .service-text {font-size: 10px;color: #909090;height: 40px;padding: 0 10px;}
    }
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
.swiper-box{position: relative;width: 100%;
  .dots{position: absolute;left: 0;right: 0;bottom: 10px;display: flex; justify-content: center;
    .dot{margin: 0 4px;width: 8px;height: 8px;background: #CFD0D2;border-radius: 50%;transition: all .6s;}
    .active{width: 8px;background: #fff;}
  }
}
.balcony-box {height: 225px;
  .balcony-wrapper {border-radius: 8px;margin-left: 15px;background-color: #fff;overflow: hidden;
    .balcony-img {height: 150px;}
    .balcony-cont {padding: 5px 10px 10px 10px;font-size: 11px;color: #999;position: relative;
      .balcony-title {font-size: 20px;color: #262626;}
      .balcony-text {width: 200px;margin-bottom: 3px;}
      // .balcony-text {width: 200px;margin-bottom: 3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
      .balcony-btn {width: 64px;line-height: 28px;border-radius: 4px;text-align: center;background: rgba(192,163,105,1);color: #fff;font-size: 14px;position: absolute;bottom: 15px;right: 10px;}
    }
  }
}
.ktv-list {background-color: #fff;margin-bottom: 4px;padding: 3px 15px;
  .ktv-img {width: 110px;height: 84px;margin-right: 10px;}
  .ktv-title {font-size: 20px;margin-bottom: 3px;}
  .ktv-text {font-size: 10px;color: #999;}
  .ktv-price {font-size: 20px;margin-bottom: 20px;}
  .ktv-btn {width: 78px;line-height: 30px;border-radius: 4px;text-align: center;margin: 0 auto;background: rgba(192,163,105,1);color: #fff;font-size: 14px;}
  .hong {color: #ED5858;}
}
.ktv-wrapper {padding: 0 15px;background-color: #fff;margin-bottom: 15px;
  .ktv-fristImg {width: 109px;height: 109px;border-radius: 3px;overflow: hidden;margin-right: 10px;position: relative;
    .chatx {width: 22px;height: 18px;position: absolute;bottom: 0;right: 0;}
  }
  .ktv-endImg {width: 74px;height: 109px;border-radius: 3px;overflow: hidden;margin: 0 1px;}
}
.foot-list {background-color: #fff;margin-bottom: 4px;padding: 3px 15px;
  .foot-img {width: 155px;height: 94px;margin-right: 20px;}
  .foot-title {font-size: 18px;margin-bottom: 3px;}
  .foot-text {font-size: 12px;color: #999;}
  .foot-price {font-size: 20px;margin-top: 15px;}
  .foot-btn {width: 60px;line-height: 24px;border-radius: 4px;text-align: center;margin-top: 62px;background: rgba(192,163,105,1);color: #fff;font-size: 14px;}
  .hong {color: #ED5858;}
}
.foot-wrapper {padding: 0 12px;display: flex;flex-flow: row wrap;align-content: flex-start;
  .foot-listImg {margin: 0 3px;flex: 0 0 31.333%;box-sizing: border-box;
    .foot-img {width: 110px;height: 140px;border-radius: 5px;overflow: hidden;}
    .foot-text {font-size: 10px;text-align: center;padding: 5px 0;}
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