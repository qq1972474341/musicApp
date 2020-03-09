import Vue from 'vue'
import Vuex from 'vuex'
//状态管理器
Vue.use(Vuex)
import service from '@/service.js';
const store = new Vuex.Store({
	state: {
		/* 音乐播放状态*/
		//音乐播放状态
		playing: false,
		//音乐状态弹出层显示
		popState: false,
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userInfo: {}
	},
	//同步事件
	mutations: {
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo = userInfo;
			service.setUser(userInfo);
			//console.log(JSON.stringify(service.getUser()));
		},
		logout(state) {
			state.hasLogin = false;
			service.clearUser();
		},
		//更改音乐弹出层显示状态
		setPopState(state, bool) {
			state.popState = bool;
		},
		//更改音乐播放状态
		setPlaying(state, bool) {
			state.playing = bool;
		}
	},
	//异步事件
	actions: {

	},
	getters: {
		getPopState(state) {
			return state.popState;
		},
		getPlaying(state) {
			return state.playing;
		}
	}
})

export default store
