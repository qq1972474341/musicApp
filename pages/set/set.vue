<template>
	<view>
		<uni-list>
			<uni-list-item :showArrow="false">
				<view class="flex justify-between align-center">
					<view class="flex flex-column">
						<text class="font text-white">限制移动流量消耗</text>
						<text class="font-sm text-light-muted">仅通过 Wi-Fi 观看高清视频</text>
					</view>
					<evan-switch size="20"></evan-switch>
				</view>
			</uni-list-item>
			<uni-list-item :showArrow="false">
				<view class="flex justify-between align-center">
					<view class="flex flex-column">
						<text class="font text-white">通知</text>
						<text class="font-sm text-light-muted">在此设备显示通知</text>
					</view>
					<evan-switch size="20"></evan-switch>

				</view>
			</uni-list-item>
			<uni-list-item :showArrow="false">
				<view class="flex justify-between align-center">
					<view class="flex flex-column">
						<text class="font text-white">隐私与位置信息</text>
						<text class="font-sm text-light-muted">在此设备记录用户喜好和获取位置信息</text>
					</view>
					<evan-switch size="20"></evan-switch>
				</view>
			</uni-list-item>
			<view v-if="hasLogin" class="w-100 justify-center align-center fixed-bottom mb-5">
				<button type="primary" style="width: 240rpx;" @tap="logOut">退出登录</button>
			</view>
		</uni-list>
	</view>
</template>

<script>
	import evanSwitch from '@/components/evan-switch/evan-switch.vue'
	//mapMutations
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			evanSwitch
		},
		data() {
			return {

			}
		},
		computed: {
			...mapState(['userInfo', 'hasLogin'])
		},
		methods: {
			...mapMutations(['logout']),
			logOut() {
				this.logout();
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad() {
			console.log("登录状态:" + this.hasLogin);
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}
</style>
