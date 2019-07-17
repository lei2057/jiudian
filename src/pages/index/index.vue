<template>
  <div class="bg">
    <div class="home-bg"><img src="../../accets/bg_img.png" alt=""></div>
    <div class="home-mask"><img src="../../accets/bg.png" alt=""></div>
    <div style="width: 100%;position: absolute;top: 0;z-index: 1;">
      <div style="width: 100px; height: 262px;background-color: red;margin-bottom: 10px;"></div>
      <div style="width: 100px; height: 262px;background-color: red;margin-bottom: 10px;"></div>
      <div style="width: 100px; height: 262px;background-color: red;margin-bottom: 10px;"></div>
      <div style="width: 100px; height: 262px;background-color: red;margin-bottom: 10px;"></div>
      <div style="width: 100px; height: 262px;background-color: red;margin-bottom: 10px;"></div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {

    }
  },

  components: {
    card
  },

  methods: {

  }

}
</script>

<style lang="scss" scoped>
.bg {width: 100%;height: 100%;background-color: #000;}
.home-bg {height: 623px;}
.home-mask {width: 100%;height: 623px;position: absolute;top: 0;left: 0;z-index: 1;}
</style>

