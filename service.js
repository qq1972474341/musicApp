// 管理账号信息
const USERS_KEY = 'USERS_KEY';
//播放列表
const PLAY_LIST = 'PLAY_LIST';
//获取用户缓存数据
const getUser = function() {
	return uni.getStorageSync(USERS_KEY);
}
//设置用户缓存数据
const setUser = function(userInfo) {
	uni.setStorageSync(USERS_KEY, userInfo);
}
//清除用户缓存数据
const clearUser = function() {
	uni.clearStorageSync(USERS_KEY);
}
//清除播放列表
const clearPlayList = () => {
	uni.clearStorageSync(PLAY_LIST);
}
//播放列表
const addPlayList = (item) => {
	let list = uni.getStorageSync(PLAY_LIST);
	//console.log(JSON.stringify(list));
	if (list === '') {
		console.log("空播放列表初始化");
		list = [];
	};
	//过滤重复
	let tmp = list.find((oitem) => {
		return oitem.name === item.name;
	});
	if (tmp === undefined) {
		console.log("播放列表添加新数据");
		list.unshift(item); //插入到第一位
	} else {
		// 将播放历史提升到第一位
		let index = list.indexOf(tmp);
		list.splice(index, 1); //删除原位置数据
		list.unshift(item); //插入到第一位
	}


	uni.setStorageSync(PLAY_LIST, list);
}
//获取播放列表
const getPlayList = () => {
	return uni.getStorageSync(PLAY_LIST);
}
export default {
	getUser,
	setUser,
	clearUser,
	addPlayList,
	getPlayList,
	clearPlayList
}
