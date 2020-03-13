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
			<view v-show="hasLogin" class="m-2">
				<text class="text-white font-sm">听歌点数：15</text>
			</view>
		</view>
		<view>
			<block v-for="(item,index) in list" :key="index">
				<view v-show="item.show" class="flex align-center" hover-class="bg-hover-secondary" @tap="open(item)">
					<text class="iconfont p-2 text-light-muted font-lg" :class="item.icon"></text>
					<text class="text-white font-sm">{{item.name}}</text>
				</view>
			</block>
			<view v-show="this.hasLogin" class="flex align-center" hover-class="bg-hover-secondary" @tap="switchAccount">
				<text class="iconfont p-2 text-light-muted font-lg iconqiehuanzhanghao"></text>
				<text class="text-white font-sm">切换账号</text>
			</view>
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
			...mapState(['hasLogin', 'userInfo','Audio'])
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
						icon: "iconsetting",
						url: "../set/set",
						show: true
					}
				]
			}
		},
		methods: {
			...mapMutations(['login', 'logout']),
			//跳转页面
			open(e) {
				uni.navigateTo({
					url: e.url
				})
			},
			switchAccount() {
				uni.showModal({
					title: "提示",
					content: '\n 确定要切换账号吗?',
					success: (res) => {
						if (res.confirm) {
							//停止音乐服务
							this.Audio.stop();
							this.$store.commit("setPopState", false); //关闭音乐弹出层
							//登出账号
							this.logout();
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
									//console.log(infoRes);
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
			}

		},
	}
</script>

<style>
	page {
		background-color: #000000;
	}
</style>
