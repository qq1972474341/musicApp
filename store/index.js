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
		userInfo: {},
		Audio:uni.createInnerAudioContext() //创建一个全局音频对象
	},
	//同步事件
	mutations: {
		//登录
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo = userInfo;
			service.setUser(userInfo);
		},
		//退出登录
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
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
		//获取音乐弹出层位置
		getPopState(state) {
			return state.popState;
		},
		//获取播放状态
		getPlaying(state) {
			return state.playing;
		}
	}
})

export default store
