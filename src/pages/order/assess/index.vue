<template>
  <div>
    <div class="refund-info disflex">
      <div class="info-img"><img src="../../../assets/icon-quan.png"></div>
      <div class="info-cont flex">
        <div class="info-title">南安明利大酒店</div>
        <div>豪华间大床房</div>
        <div>2019.07.08 - 2019.07.09  共1晚 1间</div>
      </div>
    </div>
    <div class="refund-explain">
      <div class="explain-text">
        <textarea placeholder="将入住体验的感觉，分享给大家～" placeholder-style="color:#999;" maxlength="90" v-model="val"></textarea>
        <div class="textarea-num">{{textNum}}/90</div>
      </div>
      <div class="explain-xing">
        <div class="xing-title">入住体验评分</div>
        <div class="disflex xing-item">
          <div style="margin-right: 20px;">酒店服务</div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="flex"></div>
        </div>
        <div class="disflex xing-item">
          <div style="margin-right: 20px;">酒店设施</div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="flex"></div>
        </div>
        <div class="disflex xing-item">
          <div style="margin-right: 20px;">酒店卫生</div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="flex"></div>
        </div>
        <div class="disflex xing-item">
          <div style="margin-right: 20px;">酒店网络</div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="icon18"><img src="../../../assets/icon-xx.png"></div>
          <div class="flex"></div>
        </div>
      </div>
    </div>
    <div class="refund-tijiao">提交</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      val: '',
      textNum: 0
    }
  },
  methods: {

  },
  watch: {
    'val' (res) {
      this.textNum = this.val.length
    }
  }
}
</script>
<style lang="scss" scoped>
.refund-info {padding: 8px 20px;margin-bottom: 10px;background-color: #fff;border-top: 1px solid #D9D9D9;
  .info-img {width: 73px;height: 73px;margin-right: 12px;}
  .info-cont {padding: 6px 0;font-size: 11px;color: #888;
    .info-title {font-size: 15px;font-weight: bold;color: #262626;margin-bottom: 5px;}
  }
}
.refund-explain {padding: 10px 15px;background-color: #fff;margin-bottom: 10px;
  .explain-text {padding: 8px 0;margin-bottom: 15px;font-size: 11px;position: relative;border-bottom: 1px solid #D9D9D9;
    textarea {width: 100%;height: 80px;}
    .textarea-num {font-size: 11px;color: #999;position: absolute;right: 11px;bottom: 9px;}
  }
  .explain-xing {padding-left: 2px;font-size: 11px;
    .xing-title {font-size: 14px;margin-bottom: 10px;}
    .xing-item {margin-bottom: 15px;}
  }
}
.refund-tijiao {width: 100%;line-height: 50px;position: fixed;left: 0;bottom: 0;text-align: center;font-size: 16px;background-color: #C0A369;color: #fff;}
</style>