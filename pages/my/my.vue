<template>
	<view>
		<view class="flex flex-row p-2 align-center" hover-class="bg-dark">
			<image class="rounded-circle" :src="userInfo.avatarUrl?userInfo.avatarUrl:'../../static/demo/default.jpg'" style="width: 75rpx;height: 75rpx;"></image>
			<view class="flex flex-column px-2 justify-center">
				<template v-if="hasLogin">
					<text class="text-white font-sm">{{userInfo.nickName}}</text>
					<text class="text-white font-sm">{{userInfo.country}} {{userInfo.city}}</text>
				</template>
				<template v-else>
					<text class="text-white font-sm" @tap="oauth">尚未登录</text>
				</template>

			</view>
		</view>
		<view>
			<block v-for="(item,index) in list" :key="index">
				<view class="flex align-center" hover-class="bg-hover-secondary" @tap="open(item.url)">
					<text class="iconfont p-2 text-light-muted font-lg" :class="item.icon"></text>
					<text class="text-white font-sm">{{item.name}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		data() {
			return {
				list: [{
						name: "最近播放",
						icon: "iconzuijinchangyong",
						url: "../set/set"
					},
					{
						name: "下载内容",
						icon: "icondownload",
						url: "../set/set"
					},
					{
						name: "切换账号",
						icon: "iconqiehuanzhanghao",
						url: "../set/set"
					},
					{
						name: "设置",
						icon: "iconsetting",
						url: "../set/set"
					}
				]
			}
		},
		methods: {
			...mapMutations(['login']),
			//跳转页面
			open(e) {
				uni.navigateTo({
					url: e
				})
			},
			//登录授权
			oauth() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log(res);
						uni.getUserInfo({
							provider: 'weixin',
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								console.log(infoRes);
								this.login(infoRes.userInfo);
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '登陆失败'
								});
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});

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
			}

		},
	}
</script>

<style>
	page {
		background-color: #000000;
	}
</style>
