<template>
  <div>
    <div class="bill-cont">
      <div class="disflex bill-text" style="border-bottom: 1px solid #D9D9D9;">
        <div>发票抬头</div>
        <div class="flex bill-val"><input type="text" v-model="company" placeholder="必填，银业执照上的法定名称" placeholder-style="color: #999;"></div>
      </div>
      <div class="disflex bill-text">
        <div>信用代码</div>
        <div class="flex bill-val"><input type="text" v-model="taxcode" placeholder="统一社会信用代码" placeholder-style="color: #999;"></div>
      </div>
    </div>
    <div class="bill-btn">
      <div class="disflex">
        <div class="flex">设为默认</div>
        <van-switch :checked="checked" size="24px" active-color="#74C11F" inactive-color="#D8D8D8" @change="onChange" />
      </div>
    </div>
    <div class="add-btn" v-if="textType" @click="billAdd">添加</div>
    <div class="add-btn" v-else @click="billPut">修改</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: false,
      userInfo: {},
      company: '',
      taxcode: '',
      id: '',
      status: '0',
      textType: true
    }
  },
  onLoad (options) {
    if (options.data) {
      this.company = JSON.parse(options.data).company
      this.taxcode = JSON.parse(options.data).taxcode
      this.id = JSON.parse(options.data).id
      this.textType = false
      if (JSON.parse(options.data).status === 0) {
        this.checked = false
      } else {
        this.checked = true
      }
    } else {
      this.company = ''
      this.taxcode = ''
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
    billAdd () {
      if (!this.company) {
        wx.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
      } else if (!this.taxcode) {
        wx.showToast({
          title: '请输入识别号',
          icon: 'none'
        })
      } else {
        this.$http.post({
          url: `/user/invoiceInfo/addInvoice`,
          header: this.userInfo.token,
          data: {
            userId: this.userInfo.userId + '',
            company: this.company,
            taxcode: this.taxcode,
            status: this.status
          }
        }).then(res => {
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
        })
      }
    },
    billPut () {
      if (!this.company) {
        wx.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
      } else if (!this.taxcode) {
        wx.showToast({
          title: '请输入识别号',
          icon: 'none'
        })
      } else {
        this.$http.put({
          url: `/user/invoiceInfo/addInvoice`,
          header: this.userInfo.token,
          data: {
            userId: this.userInfo.userId + '',
            id: this.id + '',
            company: this.company,
            taxcode: this.taxcode,
            status: this.status
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
.bill-cont {padding: 4px 15px;font-size: 12px;background-color: #fff;color: #666;margin-top: 15px;
  .bill-text {padding: 7px 0;}
  .bill-val {margin-left: 30px;}
}
.bill-btn {padding: 8px 15px;background-color: #fff;font-size: 12px;margin-top: 20px;}
</style>