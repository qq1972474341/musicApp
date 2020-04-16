<template>
	<view>
		<view class="flex justify-between" hover-class="bg-dark">
			<view class="flex flex-row p-2 align-center flex-1" @tap="oauth">
				<image class="rounded-circle" :src="hasLogin?userInfo.avatarUrl:'../../static/demo/default.jpg'" style="width: 75rpx;height: 75rpx;"></image>
				<view class="flex flex-column px-2 justify-center">
					<template v-if="hasLogin">
						<text class="text-white font-sm">{{userInfo.nickName}}</text>
						<text class="text-white font-sm">{{userInfo.country}} {{userInfo.city}}</text>
					</template>
					<template v-else>
						<text class="text-white font-sm">尚未登录</text>
					</template>
				</view>
			</view>
			<view v-show="hasLogin" class="m-2 flex align-center">
				<text class="text-white font-sm">听歌点数：{{userInfo.playNum}}</text>
				<image class="ml-1 mt-1" src="/static/zuanshi.png" style="width: 30rpx;height: 30rpx;"></image>
			</view>
		</view>
		<view>
			<block v-for="(item,index) in list" :key="index">
				<view v-show="item.show" class="flex align-center" hover-class="bg-hover-secondary" @tap="open(item)">
					<text class="iconfont p-2 text-light-muted font-lg" :class="item.icon"></text>
					<text class="text-white font-sm">{{item.name}}</text>
				</view>
			</block>
			<view class="flex align-center justify-between" hover-class="bg-hover-secondary" @tap="clear">
				<view class="flex align-center">
					<text class="iconfont p-2 text-light-muted font-lg iconqingchu"></text>
					<text class="text-white font-sm">清除缓存</text>
				</view>
				<text class="text-white font-sm mr-1">{{cache|format}}</text>
			</view>
			<view v-show="this.hasLogin" class="flex align-center" hover-class="bg-hover-secondary" @tap="uploadMusic">
				<text class="iconfont p-2 text-light-muted font-lg iconshangchuan"></text>
				<text class="text-white font-sm">上传音乐</text>
			</view>
			<view v-show="this.hasLogin" class="flex align-center" hover-class="bg-hover-secondary" @tap="switchAccount">
				<text class="iconfont p-2 text-light-muted font-lg iconqiehuanzhanghao"></text>
				<text class="text-white font-sm">退出登录</text>
			</view>
		</view>
		<view class="flex justify-center fixed-bottom" style="height: 50rpx;margin-bottom: 150rpx;">
			<text class="text-white font text-underline" @tap="privacyPolicy"> 隐私政策</text> </view> </view> </template> <script>
				import {
				mapState,
				mapMutations
				} from 'vuex';
				import service from '@/service.js';
				export default {
				computed: {
				...mapState(['hasLogin', 'userInfo', 'Audio'])
				},
				data() {
				return {
				list: [{
				name: "播放列表",
				icon: "iconbofangliebiao2",
				url: "../play-list/play-list",
				show: true
				},
				{
				name: "设置",
				icon: "iconshezhi",
				url: "../set/set",
				show: true
				}
				],
				cache: 0
				}
				},
				filters: {
				format(value) {
				return value > 1024 ? (value / 1024).toFixed(2) + 'MB' : value.toFixed(2) + 'KB';
				}
				},
				created() {
				//this.getStorageInfo();

				},
				methods: {
				...mapMutations(['login', 'logout']),
				//隐私政策
				privacyPolicy(){

				},
				//上传音乐
				uploadMusic() {
				plus.nativeUI.toast('暂未开通');
				},
				//跳转页面
				open(e) {
				uni.navigateTo({
				url: e.url
				})
				},
				switchAccount() {
				uni.showModal({
				title: "提示",
				content: '\n 确定要退出账号吗?',
				success: (res) => {
				if (res.confirm) {
				//停止音乐服务
				this.Audio.stop();
				this.$store.commit("setPopState", false); //关闭音乐弹出层
				//登出账号
				this.logout();
				plus.nativeUI.toast('退出成功');
				}
				}
				})
				},
				//登录授权
				oauth() {
				if (!this.hasLogin) {
				uni.login({
				provider: 'weixin',
				success: (res) => {
				//console.log(res);
				uni.getUserInfo({
				provider: 'weixin',
				success: (infoRes) => {
				/**
				* 实际开发中，获取用户信息后，需要将信息上报至服务端。
				* 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
				*/
				console.log(service.DOMAIN + "api/v1/user/login");
				uni.request({
				url: service.DOMAIN + "api/v1/user/login",
				method: 'POST',
				data: {
				openid: infoRes.userInfo.openId,
				avatarUrl: infoRes.userInfo.avatarUrl,
				nickName: infoRes.userInfo.nickName
				},
				success: res => {
				console.log("登录成功");
				plus.nativeUI.toast('登陆成功');
				// console.log(res)
				if (res.statusCode === 200) {
				infoRes.userInfo.playNum = res.data.data.playNum;
				// console.log(infoRes.userInfo);
				this.login(infoRes.userInfo);
				}
				},
				fail: () => {
				uni.showToast({
				icon: 'none',
				title: '微信授权登陆失败'
				});
				},
				complete: () => {}
				});

				},
				fail() {
				uni.showToast({
				icon: 'none',
				title: '微信授权登陆失败'
				});
				}
				});
				},
				fail: (err) => {
				console.error('授权登录失败：' + JSON.stringify(err));
				}
				});
				}
				},
				//获取用户信息
				getUserInfo() {
				uni.getUserInfo({
				provider: 'weixin',
				success: (infoRes) => {
				/**
				* 实际开发中，获取用户信息后，需要将信息上报至服务端。
				* 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
				*/
				console.log(infoRes);
				this.toMain(infoRes.userInfo.nickName);
				},
				fail() {
				uni.showToast({
				icon: 'none',
				title: '登陆失败'
				});
				}
				});
				},
				//获取当前缓存
				getStorageInfo() {
				let res = uni.getStorageInfoSync();
				//console.log(res);
				this.cache = res.currentSize
				},
				// 清除缓存
				clear() {
				uni.showModal({
				title: '提示',
				content: '是否要清除所有缓存？\n注意登录信息也将被清除!',
				cancelText: '不清除',
				confirmText: '清除',
				success: res => {
				if (res.confirm) {
				uni.clearStorageSync()
				this.getStorageInfo()
				uni.showToast({
				title: '清除成功',
				icon: 'none'
				});
				}
				},
				});
				}

				},
				}
				</script>

				<style>
					page {
						background-color: #000000;
					}
				</style>
