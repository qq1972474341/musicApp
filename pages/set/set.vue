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
		</uni-list>
	</view>
</template>

<script>
	import evanSwitch from '@/components/evan-switch/evan-switch.vue'
	export default {
		components: {
			evanSwitch
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}
</style>
