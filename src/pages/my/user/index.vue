<template>
  <div>
    <div class="bill-title">旅客信息</div>
    <div class="bill-cont">
      <div class="disflex bill-text" style="border-bottom: 1px solid #D9D9D9;">
        <div class="text">姓名</div>
        <div class="flex bill-val"><input type="text" v-model="name" placeholder="姓名" placeholder-style="color: #999;"></div>
        <div class="icon14"><img src="../../../assets/icon-mc.png"></div>
      </div>
      <div class="disflex bill-text">
        <div class="text">手机</div>
        <div class="flex bill-val"><input type="text" v-model="phone" placeholder="请填写手机号码" placeholder-style="color: #999;"></div>
      </div>
    </div>
    <div class="bill-title">证件信息</div>
    <div class="bill-cont">
      <div class="disflex bill-text" style="border-bottom: 1px solid #D9D9D9;">
        <div>证件类型</div>
        <div class="flex bill-val" style="color: #262626;">身份证</div>
      </div>
      <div class="disflex bill-text">
        <div>证件号码</div>
        <div class="flex bill-val"><input type="text" v-model="idCard" placeholder="请填写证件号码/可选" placeholder-style="color: #999;"></div>
      </div>
    </div>
    <div class="bill-btn">
      <div class="disflex">
        <div class="flex">设为默认</div>
        <van-switch :checked="checked" size="24px" active-color="#74C11F" inactive-color="#D8D8D8" @change="onChange" />
      </div>
    </div>
    <div class="add-btn" v-if="textType" @click="userAdd">添加</div>
    <div class="add-btn" v-else @click="userPut">修改</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: false,
      userInfo: {},
      name: '',
      phone: '',
      idCard: '',
      id: '',
      status: '0',
      textType: true
    }
  },
  onLoad (options) {
    if (options.data) {
      this.name = JSON.parse(options.data).name
      this.phone = JSON.parse(options.data).phone
      this.idCard = JSON.parse(options.data).idcard
      this.id = JSON.parse(options.data).id
      this.textType = false
      if (JSON.parse(options.data).status === 0) {
        this.checked = false
      } else {
        this.checked = true
      }
    } else {
      this.name = ''
      this.phone = ''
      this.idCard = ''
    }
  },
  onShow () {
    this.userInfo = wx.getStorageSync('userInfo')
  },
  methods: {
    onChange (detail) {
      this.checked = !this.checked
      if (this.checked) {
        this.status = '1'
      } else {
        this.status = '0'
      }
    },
    userAdd () {
      if (!this.name) {
        wx.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
      } else if (!this.$commont.phoneReg.test(this.phone)) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
      } else {
        this.$http.post({
          url: `/user/customerInfo/addCustomerInfoList`,
          header: this.userInfo.token,
          data: {
            userId: this.userInfo.userId + '',
            name: this.name,
            phone: this.phone,
            status: this.status,
            idcard: this.idCard
          }
        }).then(res => {
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
        })
      }
    },
    userPut () {
      if (!this.name) {
        wx.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
      } else if (!this.$commont.phoneReg.test(this.phone)) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
      } else {
        this.$http.put({
          url: `/user/customerInfo/updateCustomerInfoList`,
          header: this.userInfo.token,
          data: {
            userId: this.userInfo.userId + '',
            id: this.id + '',
            name: this.name,
            phone: this.phone,
            status: this.status,
            idcard: this.idCard
          }
        }).then(res => {
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bill-title {font-size: 12px;padding: 14px 0 9px 15px;}
.bill-cont {padding: 4px 15px;font-size: 12px;background-color: #fff;color: #666;
  .bill-text {padding: 7px 0;}
  .bill-val {margin-left: 30px;}
  .text {letter-spacing: 12px;}
}
.bill-btn {padding: 8px 15px;background-color: #fff;font-size: 12px;margin-top: 20px;}
</style>