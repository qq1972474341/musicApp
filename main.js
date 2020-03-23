import Vue from 'vue'
import App from './App'
import store from './store/index.js'
Vue.config.productionTip = false

App.mpType = 'app'
//状态管理器
Vue.prototype.$store = store
//工具类
import util from './common/Util.js'
Vue.prototype.$U = util;

const app = new Vue({
	store,
	...App
})
app.$mount()
