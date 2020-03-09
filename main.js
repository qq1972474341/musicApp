import Vue from 'vue'
import App from './App'
import store from './store/index.js'
Vue.config.productionTip = false

App.mpType = 'app'
//状态管理器
Vue.prototype.$store = store
const app = new Vue({
	store,
	...App
})
app.$mount()
