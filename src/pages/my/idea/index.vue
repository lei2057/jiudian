<template>
  <div>
    <div class="idea-top">指出印记的不足</div>
    <div style="padding: 0 25px;">
      <div class="idea-title">关于体验</div>
      <div class="idea-list">
        <div v-for="(item,index) in list" :key="index" style="flex: 0 0 25%;">
          <div class="idea-item" :class="indexs==index?'item-active':''" @click="items(index)">{{item}}</div>
        </div>
      </div>
      <div class="idea-cont">
        <textarea placeholder="将入住体验的感觉，分享给大家～" placeholder-style="color:#999;" maxlength="150" v-model="val"></textarea>
        <div class="textarea-num">{{textNum}}/150</div>  
      </div>
    </div>
    <div class="add-btn" @click="submit">提交</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      val: '',
      textNum: 0,
      indexs: -1,
      selectName: '',
      list: ['操作流程', '程序错误', '卡顿现象', '操作流程', '付款流程', '服务态度', '其他']
    }
  },
  onShow () {
    this.val = ''
  },
  methods: {
    items (index) {
      this.indexs = index
      this.selectName = this.list[index]
    },
    submit () {
      let userInfo = wx.getStorageSync('userInfo')
      this.$http.post({
        url: '/user/userFeedback',
        header: userInfo.token,
        data: {
          userId: userInfo.userId + '',
          question: this.selectName,
          desDetail: this.val
        }
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: '提交成功！',
          icon: 'none',
          duration: 2000,
          mask: true,
          success: () => {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        })
      })
    }
  },
  watch: {
    'val' (res) {
      this.textNum = res.length
    }
  }
}
</script>

<style lang="scss" scoped>
.idea-top {font-size: 14px;line-height: 35px;text-align: center;color: #FFC0A369;background-image: url('http://oss.jiatu360.cn/xcx/bg7.png');background-size: 100% 100%;}
.idea-title {padding: 25px 0;}
.idea-list {display: flex;flex-flow: row wrap;align-content: flex-start;margin: 0 -10px;
  .idea-item {width: 60px;height: 22px;line-height: 22px;border:1px solid rgba(237,237,237,1);color: #888;font-size: 11px;text-align: center;margin: 0 auto 20px;}
  .item-active {width: 60px;height: 22px;border:1px solid #262626;color: #262626;}
}
.idea-cont {padding: 8px 0 8px 9px;margin-top: 15px;font-size: 11px;position: relative;border: 1px solid #D9D9D9;
  textarea {width: 100%;height: 80px;}
  .textarea-num {font-size: 11px;color: #999;position: absolute;right: 11px;bottom: 9px;}
}
.bill-btn {padding: 8px 15px;background-color: #fff;font-size: 12px;margin-top: 20px;}
</style>