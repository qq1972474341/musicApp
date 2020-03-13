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
		Audio: uni.createInnerAudioContext(), //创建一个全局音频对象
		Music: {}, //存储一个音乐对象
		MusicLocalIndex: 0, //音乐播放本地标记索引
		playMode: "",
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
		},
		//设置音乐对象
		setMusic(state, music) {
			state.Music = music;
		},
		//设置播放模式
		setPlayMode(state, mode) {
			state.playMode = mode;
		},
		//设置当前播放页音乐 本地数据索引
		setMusicLocalIndex(state, index) {
			state.MusicLocalIndex = index;
		}
	},
	//异步事件
	actions: {

	},
	getters: {
		//获取音乐弹出层状态
		getPopState(state) {
			return state.popState;
		},
		//获取播放状态
		getPlaying(state) {
			return state.playing;
		},
		//获取播放模式
		getPlayMode(state) {
			return state.playMode;
		}
	}
})

export default store
