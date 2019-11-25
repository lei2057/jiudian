<template>
    <div class="comp-navbar">
        <!-- 占位栏 -->
        <view class="placeholder-bar" :style="{height: navBarHeight + 'px'}"> </view>
        <!-- 导航栏主体 -->
        <view class="navbar" :style="{height: navBarHeight + 'px',backgroundColor:navBackgroundColor}">
            <!-- 状态栏 -->
            <view class="nav-statusbar" :style="{height: statusBarHeight + 'px'}"></view>
            <!-- 标题栏 -->
            <view class="nav-titlebar" :style="{height: titleBarHeight + 'px' }">
                <!-- home及后退键 -->
                <view class="nav-back disflex" @click="backClick">
                  <div>{{navItem}}</div>
                  <div class="icon20"><img src="../assets/icon-garyx.png"></div>
                </view>
                <!-- 标题 -->
                <view :style="{color:titleColor}">{{title}}</view>
                <div class="nav-select" v-if="navListShow">
                  <div class="nav-cont" v-for="(item,index) in navList" :key="index">
                    <div class="item" :class="index==navIndex?'active':''" @click="active(item,index)">{{item.name}}</div>
                  </div>
                </div>
            </view>
        </view>
    </div>
</template>

<script>
export default {
  props: {
    // 导航栏背景色
    navBackgroundColor: {
      default: '#ffffff'
    },
    // 标题颜色
    titleColor: {
      default: '#000000'
    },
    // 标题文字
    title: {
      required: false,
      default: ''
    },
    // 是否显示后退按钮
    backVisible: {
      required: false,
      default: false
    }
  },
  data () {
    return {
      statusBarHeight: '', // 状态栏高度
      titleBarHeight: '', // 标题栏高度
      navBarHeight: '', // 导航栏总高度
      platform: '',
      model: '',
      brand: '',
      system: '',
      navListShow: false,
      navItem: '客房订单',
      navIndex: 0,
      navList: [
        {name: '客房订单', key: 1},
        {name: '餐饮订单', key: 4},
        {name: 'KTV订单', key: 2},
        {name: '足浴订单', key: 3}
      ]
    }
  },
  beforeMount () {
    const self = this
    wx.getSystemInfo({
      success (system) {
        self.statusBarHeight = system.statusBarHeight
        self.platform = system.platform
        self.model = system.model
        self.brand = system.brand
        self.system = system.system

        let platformReg = /ios/i
        if (platformReg.test(system.platform)) {
          self.titleBarHeight = 44
        } else {
          self.titleBarHeight = 48
        }

        self.navBarHeight = self.statusBarHeight + self.titleBarHeight
      }
    })
  },
  methods: {
    backClick () {
      this.navListShow = !this.navListShow
    },
    active (item, index) {
      this.navItem = item.name
      this.navIndex = index
      this.navListShow = false
      this.$emit('navKey', item.key)
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-navbar {width: 100%;z-index: 999;position: fixed;
  .navbar {width: 100%;position: fixed;left: 0;top: 0;
    .nav-titlebar {width: 100%;display: flex;align-items: center;justify-content: center;position: relative;
      .nav-back,.nav-select {position: absolute;left: 20px;font-size: 13px;}
      .nav-select {top: 40px;background-color: #000;width: 93px;border-radius: 4px;padding: 7px 0;text-align: center;
        .item {padding: 5px 0;color: #fff;font-size: 12px;}
        .active {color: #C0A369;}
      }
    }
  }
  .placeholder-bar{background-color: transparent;width: 100%;}
}
</style>
