<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<view class="flex m-2" @tap="selectMusic(index)">
				<image :src="item.img" mode="aspectFill" style="width: 100rpx;height: 100rpx;"></image>
				<view class="flex flex-column justify-center ml-2">
					<text class="text-white">{{item.name}}</text>
					<text class="text-light-muted font">{{item.author}}</text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import service from '@/service.js';
	import {
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			//console.log(JSON.stringify(service.getPlayList()));
			this.list = service.getPlayList();
		},
		methods: {
			...mapMutations(['setMusic']),
			selectMusic(index) {
				this.$store.commit("setPopState", true);
				this.setMusic(this.list[index]);
				uni.navigateBack({
					delta: 1
				});
				uni.navigateTo({
					url: "../playing/playing"
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}
</style>
