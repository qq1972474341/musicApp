//首次启动
const FIRST = 'FIRST';
// 管理账号信息
const USERS_KEY = 'USERS_KEY';
//播放列表
const PLAY_LIST = 'PLAY_LIST';
//用户设置
const SETTING = 'SETTING';
//搜索历史
const SEARCH_HISTORY = 'SEARCH_HISTORY';
//未登陆试听次数
const NONE_LOGIN_PLAY = 'NONE_LOGIN_PLAY';

export default {
	DOMAIN: "http://music.woaichuanqi.com/",
	//获取用户缓存数据
	getUser() {
		return uni.getStorageSync(USERS_KEY);
	},
	//设置用户缓存数据
	setUser(userInfo) {
		uni.setStorageSync(USERS_KEY, userInfo);
	},
	//清除用户缓存数据
	clearUser() {
		uni.removeStorageSync(USERS_KEY);
	},
	//清除搜索历史
	clearSearchHistory() {
		uni.removeStorageSync(SEARCH_HISTORY);
	},
	//添加到搜索历史
	addSearchHistory(item) {
		let list = uni.getStorageSync(SEARCH_HISTORY);
		if (!list) {
			console.log("空搜索历史列表初始化");
			list = []; //设置空数组
		};
		//过滤重复,如果已存在直接返回对象数据
		let tmp = list.find((oitem) => {
			return oitem === item;
		});
		if (tmp === undefined) {
			console.log("播放列表添加新数据");
			if (list.length >= 10) {
				list.splice(10, 1); //删除第10个数据数据
				list.unshift(item); //插入到第一位
			} else {
				list.unshift(item); //插入到第一位
			}

		} else {
			// 将搜索历史提升到第一位
			let index = list.indexOf(tmp);
			list.splice(index, 1); //删除原位置数据
			list.unshift(item); //插入到第一位
		}
		uni.setStorageSync(SEARCH_HISTORY, list);
	},
	//获取搜索历史列表
	getSearchHistory() {
		return uni.getStorageSync(SEARCH_HISTORY);
	},
	//删除历史记录一条数据
	deleteHistoryItem(index) {
		let list = uni.getStorageSync(SEARCH_HISTORY);
		list.splice(index, 1);
		uni.setStorageSync(SEARCH_HISTORY, list);
	},
	//清除播放列表
	clearPlayList() {
		uni.removeStorageSync(PLAY_LIST);
	},
	//添加到播放列表
	addPlayList(item) {
		let list = uni.getStorageSync(PLAY_LIST);
		//console.log(JSON.stringify(list));
		if (!list) {
			console.log("空播放列表初始化");
			list = []; //设置空数组
		};
		//过滤重复
		let tmp = list.find((oitem) => {
			return oitem.title === item.title; //根据歌曲名查找过滤
		});
		if (tmp === undefined) {
			console.log("播放列表添加新数据");
			list.unshift(item); //插入到第一位
		} else {
			//废弃排序 会影响顺序播放等
			// 将播放历史提升到第一位

			// let index = list.indexOf(tmp);
			// list.splice(index, 1); //删除原位置数据
			// list.unshift(item); //插入到第一位
		}
		uni.setStorageSync(PLAY_LIST, list);
	},
	//获取播放列表
	getPlayList() {
		return uni.getStorageSync(PLAY_LIST);
	},
	//获取播放列表指定索引音乐
	getPlayListMusic(index) {
		let list = uni.getStorageSync(PLAY_LIST);
		return list[index];
	},
	//删除播放列表中一条数据
	deletePlayListItem(index) {
		let list = uni.getStorageSync(PLAY_LIST);
		list.splice(index, 1);
		uni.setStorageSync(PLAY_LIST, list);
	},
	//用户习惯设置
	setSetting(key, value) {
		let item = getSetting();
		if (!item) {
			console.log("用户设置为空");
			item = {}; //设置空对象
		}
		item[key] = value;
		uni.setStorageSync(SETTING, item);
	},
	//获取用户习惯设置
	getSetting() {
		return uni.getStorageSync(SETTING);
	},
	//未登陆播放次数 检测
	checkNoneLoginPlay() {
		//uni.removeStorageSync(NONE_LOGIN_PLAY);
		let res = uni.getStorageSync(NONE_LOGIN_PLAY);
		console.log("播放次数:" + res);
		console.log(typeof(res));
		if (res === '') {
			console.log('首次试听');
			uni.setStorageSync(NONE_LOGIN_PLAY, 9); //减去一次
			return true;
		} else if (res > 0) {
			uni.setStorageSync(NONE_LOGIN_PLAY, res - 1);
			return true;
		} else {
			return false;
		}
	}
}
