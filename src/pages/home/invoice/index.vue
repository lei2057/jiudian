<template>
  <div style="padding: 0 15px;">
    <div class="invoice-text">提示：按照国税总局公告, 自2017年7月1日起, 企业索取的增值税普通发票需要填写纳税人识别号, 不符合规定的发票, 不得作为合法税收凭证.</div>
    <div class="invoice-wrapper" v-for="(item,index) in dataList" :key="index" @click="select(index,item)" :class="show == index||item.status == 1?'active':''">
      <div class="jin">普通发票</div>
      <div class="invoice-num">{{item.company}}</div>
      <div style="margin-bottom: 5px;">识别号：<span>{{item.taxcode}}</span></div>
      <div>领取方式：<span>酒店柜台领取</span></div>
      <div class="invoice-icon" ><img :src="show == index||item.status == 1?'../../../assets/icon-xz-per.png':''"></div>
    </div>
    <!-- <div class="add-btn" @click="invoiceAdd">添加</div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: -1,
      aa: 0,
      dataList: []
    }
  },
  onLoad (options) {
    let userInfo = wx.getStorageSync('userInfo')
    let userId = userInfo.userId + ''
    this.$http.get({
      url: `/user/invoiceInfo/getInvoiceList/${userId}`,
      header: userInfo.token
    }).then(res => {
      console.log(res)
      this.dataList = res.data
    })
  },
  methods: {
    select (index, item) {
      let userInfo = wx.getStorageSync('userInfo')
      this.show = index
      this.$http.put({
        url: `/user/invoiceInfo/updateInvoice`,
        header: userInfo.token,
        data: {
          id: item.id + '',
          userId: userInfo.userId + '',
          status: '1'
        }
      }).then(res => {
        console.log(res)
        wx.navigateBack({
          delta: 1
        })
      })
    },
    invoiceAdd () { // 发票添加
      wx.navigateTo({
        url: '../bill/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-text {font-size: 11px;font-weight: 400;color: #999;padding: 13px 0;}
.invoice-wrapper {padding: 12px 15px;background-color: #fff;margin-bottom: 15px;border-radius: 8px;font-size: 12px;color: #666;position: relative;
  .invoice-icon {width: 29px;height: 28px;position: absolute;top: 0;right: 0;}
  .invoice-num {font-size: 15px;font-weight: bold;color: #262626;margin: 5px 0;}
  .jin {color: #C0A369;}
}
.active {color: #C0A369;border: 1px solid #C0A369;}
</style>
