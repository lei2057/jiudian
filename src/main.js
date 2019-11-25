import Vue from 'vue'
import App from './App'
import Request from './utils/request'
import Store from './store/store'
import Commont from './utils/index'
import Common from './utils/common'
import './styles/base.scss'
import './styles/resetuiVant.scss'

Vue.prototype.$http = Request
Vue.prototype.$store = Store
Vue.prototype.$commont = Commont
Vue.prototype.$common = Common
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
