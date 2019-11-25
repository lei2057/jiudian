<template>
  <div>
    <div class="vant-tab-active">
      <van-tabs :active="active" @change="onChange">
        <van-tab title="入住人"></van-tab>
        <van-tab title="发票信息"></van-tab>
      </van-tabs>
    </div>
    <div v-if="cont === 0">
      <div class="vant-cell" v-for="(item, index) in customerList" :key="index">
        <van-swipe-cell :id="item.id" :right-width="80" :left-width="1" async-close @close="contactsDel">
          <div class="userInfo-wrapper" >
            <div class="userInfo-top disflex">
              <div class="flex">
                <div class="top-name">{{item.name}}</div>
                <div>手机号：{{item.phone}}</div>
              </div>
              <div class="top-icon" @click="contactsPut(item)"><img src="../../../assets/xiugai.png"></div>
            </div>
            <div class="userInfo-bottom disflex" @click="customerAgree(item)">
              <div class="icon13" v-if="item.status == 0"><img src="../../../assets/icon-y20.png"></div>
              <div class="icon13" v-else><img src="../../../assets/icon-y20x.png"></div>
              <div class="flex bottom-text">设为默认</div>
            </div>
          </div>
          <div slot="right">删除</div>
        </van-swipe-cell>
      </div>
      <div class="add-btn" @click="contactsAdd">添加</div>
    </div>
    <div v-if="cont === 1">
      <div v-if="!invoiceList">
        <div class="userInfo-btn" @click="invoiceAdd">+ 新增发票</div>
        <div class="userInfo-text">暂无发票，快去添加吧</div>
      </div>
      <div v-else>
        <div class="vant-cell" v-for="(item, index) in invoiceList" :key="index">
          <van-swipe-cell :id="item.id" :right-width="80" :left-width="1" async-close @close="invoiceDel">
            <div class="userInfo-wrapper">
              <div class="userInfo-top disflex">
                <div class="flex">
                  <div class="top-name">{{item.company}}</div>
                  <div>识别号：{{item.taxcode}}</div>
                </div>
                <div class="top-icon" @click="invoicePut(item)"><img src="../../../assets/xiugai.png"></div>
              </div>
              <div class="userInfo-bottom disflex">
                <div class="disflex flex" @click="invoiceAgree(item)">
                  <div class="icon13" v-if="item.status == 0"><img src="../../../assets/icon-y20.png"></div>
                  <div class="icon13" v-else><img src="../../../assets/icon-y20x.png"></div>
                  <div class="flex bottom-text">设为默认</div>
                </div>
                <div style="color: #C0A369;">普通发票</div>
              </div>
            </div>
            <div slot="right">删除</div>
          </van-swipe-cell>
        </div>
      </div>
      <div class="add-btn" v-if="invoiceList" @click="invoiceAdd">添加</div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Dialog from '../../../../static/vant/dialog/dialog'
export default {
  data () {
    return {
      active: 0,
      cont: 0,
      show: 0,
      userInfo: {},
      customerList: [],
      invoiceList: []
    }
  },
  onShow () {
    this.userInfo = wx.getStorageSync('userInfo')
    this.cont = 0
    this.$http.get({// 发票
      url: `/user/invoiceInfo/getInvoiceList/${this.userInfo.userId}`,
      header: this.userInfo.token
    }).then(res => {
      console.log(res)
      this.invoiceList = res.data
    })
    this.$http.get({// 入住人
      url: `/user/customerInfo/getCustomerInfoList/${this.userInfo.userId}`,
      header: this.userInfo.token
    }).then(res => {
      console.log(res)
      this.customerList = res.data
    })
  },
  methods: {
    onChange (event) {
      this.cont = event.mp.detail.index
    },
    customerAgree (item) {
      if (item.status === 0) {
        this.$http.put({
          url: `/user/customerInfo/updateCustomerInfoList`,
          header: this.userInfo.token,
          data: {
            id: item.id + '',
            userId: this.userInfo.userId + '',
            status: '1'
          }
        }).then(res => {
          console.log(res)
          this.invoiceList.status = 1
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          })
          this.$http.get({// 入住人
            url: `/user/customerInfo/getCustomerInfoList/${this.userInfo.userId}`,
            header: this.userInfo.token
          }).then(res => {
            console.log(res)
            this.customerList = res.data
          })
        })
      } else {
        // this.$http.put({
        //   url: `/user/customerInfo/updateCustomerInfoList`,
        //   header: this.userInfo.token,
        //   data: {
        //     id: item.id + '',
        //     userId: this.userInfo.userId + '',
        //     status: '0'
        //   }
        // }).then(res => {
        //   console.log(res)
        //   this.invoiceList.status = 0
        //   wx.showToast({
        //     title: '修改成功',
        //     icon: 'success'
        //   })
        // })
      }
    },
    invoiceAgree (item) {
      if (item.status === 0) {
        this.$http.put({
          url: `/user/invoiceInfo/updateInvoice`,
          header: this.userInfo.token,
          data: {
            id: item.id + '',
            userId: this.userInfo.userId + '',
            status: '1'
          }
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          })
          this.$http.get({// 发票
            url: `/user/invoiceInfo/getInvoiceList/${this.userInfo.userId}`,
            header: this.userInfo.token
          }).then(res => {
            console.log(res)
            this.invoiceList = res.data
          })
        })
      } else {
        // this.$http.put({
        //   url: `/user/invoiceInfo/updateInvoice`,
        //   header: this.userInfo.token,
        //   data: {
        //     id: item.id + '',
        //     userId: this.userInfo.userId + '',
        //     status: '0'
        //   }
        // }).then(res => {
        //   console.log(res)
        //   wx.showToast({
        //     title: '修改成功',
        //     icon: 'success'
        //   })
        // })
      }
    },
    contactsDel (event) {
      let id = event.currentTarget.id
      const { position, instance } = event.mp.detail
      switch (position) {
        case 'cell':
          instance.close()
          break
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close()
            this.$http.del({
              url: `/user/customerInfo/delCustomerInfoList/${id}`,
              header: this.userInfo.token
            }).then(res => {
              console.log(res)
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500,
                success: (result) => {
                  setTimeout(() => {
                    this.$http.get({// 入住人
                      url: `/user/customerInfo/getCustomerInfoList/${this.userInfo.userId}`,
                      header: this.userInfo.token
                    }).then(res => {
                      console.log(res)
                      this.customerList = res.data
                    })
                  }, 1500)
                }
              })
            })
          }).catch(() => {
            instance.close()
          })
          break
      }
    },
    invoiceDel (event) {
      let id = event.currentTarget.id
      const { position, instance } = event.mp.detail
      switch (position) {
        case 'cell':
          instance.close()
          break
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close()
            this.$http.del({
              url: `/user/invoiceInfo/delInvoiceList/${id}`,
              header: this.userInfo.token
            }).then(res => {
              console.log(res)
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              })
              setTimeout(() => {
                this.$http.get({// 发票
                  url: `/user/invoiceInfo/getInvoiceList/${this.userInfo.userId}`,
                  header: this.userInfo.token
                }).then(res => {
                  console.log(res)
                  this.invoiceList = res.data
                })
              }, 1500)
            })
          }).catch(() => {
            instance.close()
          })
          break
      }
    },
    contactsAdd () { // 常住联系人添加
      wx.navigateTo({
        url: '../user/main'
      })
    },
    contactsPut (item) { // 常住联系人修改
      wx.navigateTo({
        url: '../user/main?data=' + JSON.stringify(item)
      })
    },
    invoiceAdd () { // 发票添加
      wx.navigateTo({
        url: '../bill/main'
      })
    },
    invoicePut (item) { // 发票修改
      wx.navigateTo({
        url: '../bill/main?data=' + JSON.stringify(item)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.userInfo-wrapper {padding: 8px 15px;background-color: #fff;font-size: 12px;color: #999;margin-top: 15px;
  .userInfo-top {padding: 4px 6px 9px 23px;border-bottom: 1px solid #D9D9D9;
    .top-name {font-size: 17px;margin-bottom: 7px;color: #262626;}
    .top-icon {width: 22px;height: 22px;}
  }
  .userInfo-bottom {padding: 10px 0 0 23px;
    .bottom-text {margin-left: 5px;}
  }
}
.userInfo-btn {padding: 15px 0;text-align: center;font-size: 16px;margin-top: 15px;background-color: #fff;}
.userInfo-text {font-size: 12px;color: #999;margin-top: 20px;text-align: center;}
</style>