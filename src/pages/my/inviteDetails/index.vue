<template>
  <div style="background-color: #F8F5F0;padding: 0 15px 24px 15px;font-size: 11px;text-align: center;">
    <div class="disflex" style="padding: 7px 33px;">
      <div class="flex">手机号</div>
      <div class="flex">邀请情况</div>
      <div class="flex">我的收益</div>
    </div>
    <div class="invite-cont">
      <div class="disflex invite-list">
        <div class="flex">138****4507</div>
        <div class="flex">成功</div>
        <div class="flex">88元</div>
      </div>
      <div class="disflex invite-list">
        <div class="flex">138****4507</div>
        <div class="flex">成功</div>
        <div class="flex">88元</div>
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
.invite-cont {background-color: #fff;border-radius: 8px;padding: 0 33px;
  .invite-list {padding: 10px 0;border-bottom: 1px solid #D9D9D9;}
}
</style>