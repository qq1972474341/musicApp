<template>
	<view>
		<view class="flex flex-row p-2 align-center">
			<image class="rounded-circle" src="../../static/demo/default.jpg" style="width: 75rpx;height: 75rpx;"></image>
			<view class="flex flex-column px-2">
				<text class="text-white font-sm">用户名</text>
				<text class="text-white font-sm">邮箱</text>
			</view>
		</view>
		<view>
			<block v-for="(item,index) in list" :key="index">
				<view class="flex align-center" hover-class="bg-hover-secondary" @tap="open(item.url)">
					<text class="iconfont p-2 text-light-muted font-lg" :class="item.icon"></text>
					<text class="text-white">{{item.name}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: "最近播放",
						icon: "iconzuijinchangyong"
					},
					{
						name: "下载内容",
						icon: "icondownload"
					},
					{
						name: "切换账号",
						icon: "iconqiehuanzhanghao"
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
			//跳转页面
			open(e) {
				uni.navigateTo({
					url: e
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}
</style>
