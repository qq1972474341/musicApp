<template>
	<view>
		<template v-if="list.length>0">
			<block v-for="(item,index) in list" :key="index">
				<view class="flex m-2 flex-1" @tap="selectMusic(index)">
					<image :src="item.img" mode="aspectFill" style="width: 100rpx;height: 100rpx;"></image>
					<view class="flex flex-column justify-center ml-2">
						<text class="text-white">{{item.title}}</text>
						<text class="text-light-muted font">{{item.author}}</text>
					</view>
				</view>
			</block>
		</template>
		<template v-else>
			<view class="flex justify-center align-center">
				<text class="font-lg text-light-muted">没有搜索到相关音乐</text>
			</view>
		</template>

	</view>
</template>

<script>
	import service from '@/service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad(e) {
			console.log("搜索内容:" + e.keyword)
			this.searchMusic(e.keyword)
		},
		computed: {},
		methods: {
			...mapMutations(['setMusic']),
			//搜索音乐
			searchMusic(keyword) {
				uni.request({
					url: service.DOMAIN + 'api/v1.Music/searchMusic',
					method: 'POST',
					data: {
						page: 1,
						limit: 15,
						keyword: keyword
					},
					success: res => {
						if (res.data.data.length > 0) {
							this.list = res.data.data;
						} else {
							this.list = [];
						}


					},
					fail: () => {},
					complete: () => {}
				});
			},
			//选择音乐
			selectMusic(index) {
				uni.navigateBack({
					delta:2
				})
				this.setMusic(this.list[index]);
				uni.navigateTo({
					url: "../playing/playing"
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
