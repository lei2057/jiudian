<template>
  <div class="bill">
    <div class="disflex">
      <div class="flex bill-title">订单总价：</div>
      <div class="bill-num">¥ {{totalPay}}</div>
    </div>
    <div class="bill-cont">
      <div class="bill-text disflex" v-for="item in dataList" :key="item">
        <div class="flex">{{item.expenseName}}</div>
        <div :class="item.type == 1?hong:''">{{item.expenseDetail}}</div>
      </div>
    </div>
    <div class="disflex">
      <div class="flex bill-title">实付款：</div>
      <div class="bill-num">¥ {{finalPay}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [],
      totalPay: 0,
      finalPay: 0
    }
  },
  onLoad (options) {
    this.dataList = JSON.parse(options.data)
    this.totalPay = options.totalPay
    this.finalPay = options.finalPay
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.bill {padding: 15px;font-size: 14px;background-color: #fff;color: #888;
  .bill-cont {padding: 15px 0;margin: 15px 0;border-top: 1px solid #D9D9D9;border-bottom: 1px solid #D9D9D9;}
  .bill-title {font-size: 15px;font-weight: bold;color: #262626;}
  .bill-text {margin-bottom: 20px;}
  .bill-num {font-size: 18px;color: #ED5858;}
  .hong {color: #ED5858;}
}
</style>