<template>
	<view class="tabbar" :style="{backgroundColor: backgroundColor,'padding-top':'10rpx'}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'adTabbar',
		components: {},
		props: {
			// 背景色
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			}
		},
		data() {
			return {

			}
		},
		methods: {}
	}
</script>

<style>
	.tabbar {
		/*foot*/
		position: fixed;
		width: 100%;
		height: 95rpx;
		bottom: 0;
		z-index: 1024;
		display: flex;

		/*cu-bar*/
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		/*tabbar*/
		padding: 0;
		/* height: calc(130rpx + env(safe-area-inset-bottom) / 2); */
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);

		/*shadow*/
		box-shadow: 0 -1rpx 6rpx rgba(0, 0, 0, 0.1);

		color: #666666;

		/*other*/
	}
</style>
