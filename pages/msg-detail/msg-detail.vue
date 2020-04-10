<template>
	<view>
		<view class="flex align-center flex-column">
			<text class="text-white font-weight-bolder mt-2">{{item.title}}</text>
			<text class="font text-light-white p-4">
				{{item.content}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {}
			}
		},
		methods: {

		},
		onLoad(e) {
			this.item = JSON.parse(decodeURIComponent(e.item))
			console.log(this.item)
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}
</style>
