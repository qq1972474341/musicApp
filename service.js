// 管理账号信息
const USERS_KEY = 'USERS_KEY';
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
export default {
	getUser,
	setUser,
	clearUser
}
