import Vue from 'vue'
import Vuex from 'vuex'
//状态管理器
Vue.use(Vuex)
import service from '@/service.js';
const store = new Vuex.Store({
	state: {
		//平台 ios或android
		platform: '',
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
		Audio: uni.getBackgroundAudioManager(), //获取全局唯一的背景音频管理器
		Music: {}, //存储一个音乐对象
		MusicLocalIndex: 0, //音乐播放本地标记索引
		playMode: 1, //1列表播放 单曲循环 随机播放
	},
	//同步事件
	mutations: {
		//设置平台
		setPlatform(state, platform) {
			state.platform = platform;
		},
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
			//setPopState
			console.log("关闭音乐弹出层" + bool);
			state.popState = bool;
		},
		//更改音乐播放状态
		setPlaying(state, bool) {
			// console.log("设置播放状态:" + bool)
			state.playing = bool;
		},
		//设置音乐对象
		setMusic(state, music) {
			//设置全局音乐资源
			state.Music = music;
			//mutations必须为同步事件，或者不要改变任何变量状态
			uni.request({
				url: service.DOMAIN + 'api/v1.Music/countPlayNum',
				method: 'POST',
				data: {
					id: state.Music.id
				}
			});
			service.addPlayList(music);
			//置音频资源
			state.Audio.src = music.src;
			//置音频标题
			state.Audio.title = music.title;
			//置音频封面图
			state.Audio.coverImgUrl = music.cover;
		},
		//设置播放模式
		setPlayMode(state, mode) {
			state.playMode = mode;
		},
		//设置当前播放列表 播放索引
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
			//console.log("播放状态:" + state.playing);
			return state.playing;
		},
		//获取播放模式
		getPlayMode(state) {
			return state.playMode;
		}
	}
})

export default store
