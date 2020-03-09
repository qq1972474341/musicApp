import Vue from 'vue'
import Vuex from 'vuex'
//状态管理器
Vue.use(Vuex)

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
		userName: ""
	},
	//同步事件
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
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
