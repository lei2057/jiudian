<template>
  <div>
    <div class="bg-img"><img src="http://oss.jiatu360.cn/xcx/bg1.png"></div>
    <div class="order-wrapper">
      <div style="padding: 0 19px;">
        <div class="order-title">退款中</div>
        <div class="order-text">支付金额退还  预计2个工作日左右到账  请您耐心等待</div>
      </div>
      <div class="refund-out">
        <div class="disflex pd" style="border-bottom: 1px solid #D9D9D9;">
          <div class="flex">退款总金额</div>
          <div class="hong">¥ 458</div>
        </div>
        <div class="disflex pd">
          <div class="flex">退回微信账户</div>
          <div style="font-size: 15px;">¥ 458</div>
        </div>
      </div>
      <div class="refund-process disflex">
        <div>
          <div class="icon14"><img src="../../../assets/icon-xz.png"></div>
          <div class="process-text">平台已受理</div>
          <div>2019-07-08 11:36</div>
        </div>
        <div class="xian"></div>
        <div>
          <div class="icon14"><img src="../../../assets/icon-quan.png"></div>
          <div class="process-text">退款成功</div>
          <div>2019-07-08 11:37</div>
        </div>
      </div>
      <div style="padding: 10px 15px;font-size: 14px;background-color: #fff;">
        退款信息
      </div>
      <div class="refund-info disflex">
        <div class="info-img"><img src="../../../assets/icon-quan.png"></div>
        <div class="info-cont flex">
          <div class="info-title">南安明利大酒店</div>
          <div>豪华间大床房  铂金会员专享价</div>
          <div>2019.07.08 - 2019.07.09  共1晚 1间</div>
        </div>
      </div>
      <div class="refund-details">
        <div class="mgb">退款金额：¥ 458</div>
        <div class="mgb">申请时间：2019年07月15日</div>
        <div><span style="letter-spacing: 4px;margin-right: -4px;">订单号：</span>2019071538376</div>
        <div class="disflex refund-call"><div class="icon20" style="margin-right: 8px;"><img src="../../../assets/icon-dhh.png"></div>联系酒店</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.bg-img {height: 220px;}
.order-wrapper {position: relative;top: -120px;
  .order-title {font-size: 20px;font-weight: bold;margin-bottom: 10px;color: #fff;}
  .order-text {font-size: 12px;color: #fff;margin-bottom: 20px;}
  .refund-out {background-color: #fff;padding: 0 15px;font-size: 14px;
    .pd {padding: 10px 0;}
    .hong {font-size: 18px;color: #ED5858;}
  }
  .refund-process {padding: 20px 0 10px;font-size: 8px;color: #999;text-align: center;
    .process-text {font-size: 12px;color: #262626;margin: 5px 0 2px;}
    .xian {width: 160px;height: 2px;background-color: #C0A369;margin: -33px -27px 0 -27px;}
  }
  .refund-info {padding: 8px 20px;
    .info-img {width: 73px;height: 73px;margin-right: 12px;}
    .info-cont {padding: 6px 0;font-size: 11px;color: #888;
      .info-title {font-size: 15px;font-weight: bold;color: #262626;margin-bottom: 5px;}
    }
  }
  .refund-details {padding: 15px;font-size: 11px;color: #888;background-color: #fff;
    .refund-call {border-top: 1px solid #D9D9D9;padding-top: 15px;margin-top: 15px;font-size: 12px;color: #262626;}
    .mgb {margin-bottom: 3px;}
  }
}
</style>