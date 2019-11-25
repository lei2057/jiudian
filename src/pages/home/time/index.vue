<template>
  <div style="background-color: #fff;">
    <view style="position:fixed;top:0;background-color: #fff;padding-top: 20px;border-top: 1px solid #D9D9D9;">
      <view class="disflex" style="margin-bottom: 5px;">
        <view class="date-time">
          <view class="date-time-text">入住时间</view>
          <view class="disflex">
            <view class="date-time-day">{{daycheckInDate}}</view>
            <view>
              <view style="font-size: 13px;">{{weekcheckInDate}}</view>
              <view class="date-time-mouth">{{mouthcheckInDate}}月</view>
            </view>
          </view>
        </view>
        <view class="date-line"><img src="../../../assets/line.png"></view>
        <view class="date-time">
          <view class="date-time-text">退房时间</view>
          <view class="disflex">
            <view class="date-time-day">{{daycheckOutDate}}</view>
            <view>
              <view style="font-size: 13px;">{{weekcheckOutDate}}</view>
              <view class="date-time-mouth">{{mouthcheckOutDate}}月</view>
            </view>
          </view>
        </view>
      </view>
      <view class="layout-flex row" style="background-color: #FFF4E0;font-size: 12px;">
        <text class="date-week" :style="{width:systemInfo.windowWidth/7-10+'px',height:20+'px'}" v-for="(item,index) in weekStr" :key="index">
                    <text v-if="item !=='日' && item !=='六'">{{item}}</text>
        <text v-if="item ==='日' || item ==='六'" class="week">{{item}}</text>
        </text>
      </view>
    </view>
    <view style="margin-top:120px"></view>
    <view v-for="(item,index) in dateList" :key="index" style="padding:30rpx 0">
      <view class="date-year-month" style="text-align: center;font-size:35rpx;color: #C0A369">{{item.year}}年{{item.month}}月</view>
      <view class="layout-flex row" style="flex-wrap: wrap;margin-top:30rpx;">
        <view v-for="(items,indexs) in item.days" :key="indexs">
        <view class="date-day" :class="items.day<=0?'bgwhite':items.class1+items.class"  :data-year="item.year" :data-month="item.month" :data-day="items.day" @click="onPressDate">
          <div :class="items.day<=0?'bgwhite':items.class2" >
            <view class='item-days'>
              <text style='font-size:28rpx;'>{{items.day>0?items.day:''}}</text>
              <!-- <text style='font-size:30rpx;' v-if="items.inday">入住</text>
              <text style='font-size:30rpx;' v-if="items.outday">离店</text> -->
            </view>
          </div>
        </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import Moment from '../../../utils/moment.js'
var DATE_LIST = []
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()
export default {
  data () {
    return {
      maxMonth: 9, // 最多渲染月数
      dateList: [],
      systemInfo: {},
      weekStr: ['日', '一', '二', '三', '四', '五', '六'],
      checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
      checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
      markcheckInDate: false, // 标记开始时间是否已经选择
      markcheckOutDate: false, // 标记结束时间是否已经选择
      weekcheckInDate: '', // 开始时间星期
      weekcheckOutDate: '', // 结束时间星期
      mouthcheckInDate: '', // 开始时间月
      mouthcheckOutDate: '', // 结束时间月
      daycheckInDate: '', // 开始时间日
      daycheckOutDate: '', // 结束时间日
      days: ''
    }
  },
  onLoad (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.createDateListData()
    var _this = this
    // 页面初始化 options为页面跳转所带来的参数

    var checkInDate = options.checkInDate ? options.checkInDate : Moment(new Date()).format('YYYY-MM-DD')
    var checkOutDate = options.checkOutDate ? options.checkOutDate : Moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
    wx.getSystemInfo({
      success (res) {
        _this.systemInfo = res
        _this.checkInDate = checkInDate
        _this.checkOutDate = checkOutDate
      }
    })
  },
  onShow () {
    let { checkInDate, checkOutDate } = wx.getStorageSync('ROOM_SOURCE_DATE')
    this.mouthcheckInDate = checkInDate.split('-')[1]
    this.mouthcheckOutDate = checkOutDate.split('-')[1]
    this.daycheckInDate = checkInDate.split('-')[2]
    this.daycheckOutDate = checkOutDate.split('-')[2]
    let weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    let InDate = new Date(Date.parse(checkInDate))
    let OutDate = new Date(Date.parse(checkOutDate))
    this.weekcheckInDate = weekDay[InDate.getDay()]
    this.weekcheckOutDate = weekDay[OutDate.getDay()]
    this.selectDataMarkLine()
  },
  methods: {
  // 选择的入住与离店时间段
    selectDataMarkLine () {
      let dateList = this.dateList
      let dangyue = []
      let kuayueqian = []
      let kuayuezhong = []
      let kuayuehou = []
      let { checkInDate, checkOutDate } = wx.getStorageSync('ROOM_SOURCE_DATE')
      let curreInid = checkInDate.substr(0, 4) + '-' + (checkInDate.substr(5, 2) < 10 ? checkInDate.substr(6, 1) : checkInDate.substr(5, 2))// 选择入住的id
      let curreOutid = checkOutDate.substr(0, 4) + '-' + (checkOutDate.substr(5, 2) < 10 ? checkOutDate.substr(6, 1) : checkOutDate.substr(5, 2))// 选择离店的id
      let dayIn = checkInDate.substr(8, 2) >= 10 ? checkInDate.substr(8, 2) : checkInDate.substr(9, 1)// 选择入住的天id
      let dayOut = checkOutDate.substr(8, 2) >= 10 ? checkOutDate.substr(8, 2) : checkOutDate.substr(9, 1)// 选择离店的天id
      let monthIn = checkInDate.substr(5, 2) >= 10 ? checkInDate.substr(5, 2) : checkInDate.substr(6, 1)// 选择入店的月id
      let monthOut = checkOutDate.substr(5, 2) >= 10 ? checkOutDate.substr(5, 2) : checkOutDate.substr(6, 1)// 选择离店的月id
      if (curreInid === curreOutid) { // 入住与离店是当月的情况
        for (let i = 0; i < dateList.length; i++) {
          if (dateList[i].id === curreInid) {
            let days = dateList[i].days
            for (let k = 0; k < days.length; k++) {
              if (days[k].day >= dayIn && days[k].day <= dayOut) {
                days[k].class = days[k].class + ' bgitem'
                dangyue.push(k)
              }
              if (days[k].day + '' === dayIn) {
                days[k].class1 = days[k].class1 + ' active'
                days[k].class2 = days[k].class2 + ' active2'
                days[k].inday = true
              }
              if (days[k].day + '' === dayOut) {
                days[k].class1 = days[k].class1 + ' active1'
                days[k].class2 = days[k].class2 + ' active2'
                days[k].outday = true
              }
            }
            wx.setStorageSync('days', dangyue.length - 1)
            this.days = dangyue.length - 1
          }
        }
      } else { // 跨月
        for (let j = 0; j < dateList.length; j++) {
          if (dateList[j].month + '' === monthIn) { // 入住的开始月份
            let days = dateList[j].days
            for (let k = 0; k < days.length; k++) {
              if (days[k].day >= dayIn) {
                days[k].class = days[k].class + ' bgitem'
                if (days[k].day > 0) {
                  kuayueqian.push(days[k].day)
                }
              }
              if (days[k].day + '' === dayIn) {
                days[k].class1 = days[k].class1 + ' active'
                days[k].class2 = days[k].class2 + ' active2'
                days[k].inday = true
              }
            }
          } else { // 入住跨月月份
            if (dateList[j].month < monthOut && dateList[j].month > monthIn) { // 离店中间的月份
              let days = dateList[j].days
              for (let k = 0; k < days.length; k++) {
                days[k].class = days[k].class + ' bgitem'
                if (days[k].day > 0) {
                  kuayuezhong.push(days[k].day)
                }
              }
            } else if (dateList[j].month + '' === monthOut) { // 离店最后的月份
              let days = dateList[j].days
              for (let k = 0; k < days.length; k++) {
                if (days[k].day <= dayOut) {
                  days[k].class = days[k].class + ' bgitem'
                  if (days[k].day > 0) {
                    kuayuehou.push(days[k].day)
                  }
                }
                if (days[k].day + '' === dayOut) {
                  days[k].class1 = days[k].class1 + ' active1'
                  days[k].class2 = days[k].class2 + ' active2'
                  days[k].outday = true
                }
              }
            }
          }
        }
        let dayNum = 0
        dayNum = (kuayueqian.length + kuayuezhong.length + kuayuehou.length) - 1
        wx.setStorageSync('days', dayNum)
        this.days = dayNum
        // if (kuayuezhong.length >= 28 || kuayuezhong.length >= 29 || kuayuezhong.length >= 30) {
        //   console.log(kuayuezhong)
        //   dayNum = (kuayueqian.length + kuayuezhong.length + kuayuehou.length) - 1
        //   wx.setStorageSync('days', dayNum)
        // } else {
        //   console.log(kuayueqian)
        //   console.log(kuayuezhong, '1')
        //   console.log(kuayuehou)
        //   dayNum = (kuayueqian.length + kuayuezhong.length + kuayuehou.length) - 1
        //   wx.setStorageSync('days', dayNum)
        // }
      }
      this.dateList = dateList
    },

    createDateListData () {
      var dateList = []
      var now = new Date()
      /*
      设置日期为 年-月-01,否则可能会出现跨月的问题
      比如：2017-01-31为now ,月份直接+1（now.setMonth(now.getMonth()+1)），则会直接跳到跳到2017-03-03月份.
        原因是由于2月份没有31号，顺推下去变成了了03-03
    */
      now = new Date(now.getFullYear(), now.getMonth(), 1)
      for (var i = 0; i < this.maxMonth; i++) {
        var momentDate = Moment(now).add(this.maxMonth - (this.maxMonth - i), 'month').date
        var year = momentDate.getFullYear()
        var month = momentDate.getMonth() + 1

        var days = []
        var totalDay = this.getTotalDayByMonth(year, month)
        var week = this.getWeek(year, month, 1)
        // -week是为了使当月第一天的日期可以正确的显示到对应的周几位置上，比如星期三(week = 2)，
        // 则当月的1号是从列的第三个位置开始渲染的，前面会占用-2，-1，0的位置,从1开正常渲染
        for (var j = -week + 1; j <= totalDay; j++) {
          var tempWeek = -1
          if (j > 0) { tempWeek = this.getWeek(year, month, j) }
          var clazz = ''
          if (tempWeek === 0 || tempWeek === 6) { clazz = ' week' }
          if (j < DATE_DAY && year === DATE_YEAR && month === DATE_MONTH) {
          // 当天之前的日期不可用
            clazz = 'unavailable ' + clazz
          } else { clazz = '' + clazz }
          days.push({ day: j, class: clazz, class1: '', class2: '' })
        }
        var dateItem = {
          id: year + '-' + month,
          year: year,
          month: month,
          days: days
        }
        dateList.push(dateItem)
      }
      this.dateList = dateList
      DATE_LIST = dateList
    },

    /*
      * 获取月的总天数
      */
    getTotalDayByMonth (year, month) {
      month = parseInt(month, 10)
      var d = new Date(year, month, 0)
      return d.getDate()
    },
    /*
    * 获取月的第一天是星期几
    */
    getWeek (year, month, day) {
      var d = new Date(year, month - 1, day)
      return d.getDay()
    },
    /**
     * 点击日期事件
     */
    onPressDate (e) {
      var { year, month, day } = e.mp.currentTarget.dataset
      // 当前选择的日期为同一个月并小于今天，或者点击了空白处（即day<0），不执行
      if ((day < DATE_DAY && month === DATE_MONTH) || day <= 0) return
      var tempMonth = month
      var tempDay = day
      if (month < 10) tempMonth = '0' + month
      if (day < 10) tempDay = '0' + day

      var date = year + '-' + tempMonth + '-' + tempDay
      // 如果点击选择的日期A小于入住时间，则重新渲染入住时间为A
      if ((this.markcheckInDate && Moment(date).before(this.checkInDate)) || this.checkInDate === date) {
        this.markcheckInDate = false
        this.markcheckOutDate = false
        this.dateList = DATE_LIST.concat()
      }
      if (!this.markcheckInDate) {
        this.checkInDate = date
        this.markcheckInDate = true
        this.dateList = DATE_LIST.concat()
      } else if (!this.markcheckOutDate) {
        this.checkOutDate = date
        this.markcheckOutDate = true
        // 设缓存，返回页面时，可在onShow时获取缓存起来的日期
        wx.setStorage({
          key: 'ROOM_SOURCE_DATE',
          data: {
            checkInDate: this.checkInDate,
            checkOutDate: this.checkOutDate
          }
        })
        this.markcheckInDate = false
        this.markcheckOutDate = false
        this.selectDataMarkLine()
        // getApp().globalData.days = this.days
        wx.navigateBack({
          delta: 1 // 回退前 delta(默认为1) 页面
        })
      }

      this.renderPressStyle(year, month, day)
    },
    renderPressStyle (year, month, day) {
      this.createDateListData()// 重新点击时数据初始化
      var dateList = this.dateList
      // 渲染点击样式
      for (var i = 0; i < dateList.length; i++) {
        var dateItem = dateList[i]
        var id = dateItem.id
        if (id === year + '-' + month) {
          var days = dateItem.days
          for (var j = 0; j < days.length; j++) {
            var tempDay = days[j].day
            if (tempDay === day) {
              days[j].class = days[j].class + ' bgitem'
              days[j].class1 = days[j].class1 + ' active1 active'
              days[j].class2 = days[j].class2 + ' active2'
              days[j].inday = true
              break
            }
          }
          break
        }
      }
      this.dateList = dateList
    }
  }
}
</script>

<style>
.date-time {text-align: center;}
.date-time-text {font-size: 10px;color: #666;margin-bottom: 8px;}
.date-time-day {font-size: 38px;font-weight: bold;margin-right: 5px;}
.date-time-mouth {font-size: 16px;font-weight: bold;text-align: left;}
.date-line {width: 41px;height: 58px;margin: 0 20px;}
.date-day{
    display: flex;
    padding: 10px;
    text-align:center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 33px;
    height: 30px;
    margin: 10px 0;
}
.date-day.bgitem{
  background-color: #FFF2D9;
  position: relative;
}
.active{
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;   
}
.active1{
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;  
}
.active2 {
    background-color: #C0A369;
    color: #000;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    width: 33px;
    height: 30px;
    display: flex;
    padding: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}
.date-day.unavailable{
    color:#aaa;
}
.date-week{
    display: flex;
    justify-content: center;
    align-content: center;
    margin:5px;
}
.week{
    color:#999;
}
.row{
  display: flex;
  flex-direction: row;
}
 .item-days{
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  font-size: 35rpx;
} 
.bgwhite{
  background-color: #fff;
}
</style>
