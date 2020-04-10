<template>
	<view class="flex align-center p-2 border-bottom border-dark" hover-class="bg-hover-secondary" @click="open">
		<image src="https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/userpic/2.jpg" style="height: 80rpx;width: 80rpx;"
		 class="rounded-circle mr-2"></image>

		<view class="flex flex-column flex-1">
			<view class="flex align-center justify-between">
				<text class="text-white font-md">{{item.title}}</text>
				<text class="font-sm text-secondary">
					{{item.create_time | formatTime}}</text>
			</view>
			<view class="flex align-center justify-between">
				<text class="font text-secondary text-ellipsis" style="max-width: 500rpx;">{{item.content}}</text>
		<!-- 		<uni-badge text="未读" type="error"></uni-badge> -->
			</view>
		</view>

	</view>
</template>

<script>
	import $T from '@/common/time.js';
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	export default {
		components: {
			uniBadge
		},
		props: {
			item: Object,
			index: Number
		},
		// 过滤器
		filters: {
			formatTime(value) {
				return $T.gettime(value);
			}
		},
		methods: {
			// 打开聊天页
			open() {
				
				uni.navigateTo({
					url: '../../pages/msg-detail/msg-detail?item=' + encodeURIComponent(JSON.stringify(this.item))
					
				});
			}
		},
	}
</script>

<style>
</style>
