<template>
	<view>
		<uni-list>
			<block v-for="(item,index) in list" :key="index">
				<uni-list-item :showArrow="false" @click="tapList(item)">
					<view class="flex justify-between">
						<view class="flex align-center">
							<text class="iconfont iconlishi-copy mr-2" style="color: #ababab;"></text>
							<text style="color: #ababab;">{{item}}</text>
						</view>
						<view class="iconfont iconguanbi text-light-muted" @tap="deleteHistory(index)" hover-class="animated fadeInDown"></view>
					</view>
				</uni-list-item>
			</block>
		</uni-list>
		<view class="flex align-center justify-center" @tap="clearAllHistory">
			<text class="text-light-muted border-bottom font">清除全部历史</text>
		</view>
	</view>
</template>

<script>
	import service from "@/service.js";
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			//console.log(JSON.stringify(service.getSearchHistory()));
		},
		onShow() {
			this.list = service.getSearchHistory()
		},
		//点击键盘搜索按钮事件
		onNavigationBarSearchInputConfirmed(e) {
			service.addSearchHistory(e.text); //保存搜索历史
			this.list = service.getSearchHistory(); //刷新搜索历史列表
			uni.navigateTo({
				url: '../search-reasult/search-reasult?keyword=' + e.text
			})
		},
		methods: {
			//点击历史项事件
			tapList(item) {
				service.addSearchHistory(item); //保存搜索历史
				uni.navigateTo({
					url: '../search-reasult/search-reasult?keyword=' + item
				})
			},
			//清除全部历史记录
			clearAllHistory() {
				console.log("清除全部历史记录");
				service.clearSearchHistory();
				this.list = [];
			},
			//删除一条历史记录
			deleteHistory(index) {
				service.deleteHistoryItem(index);
				this.list = service.getSearchHistory();
			}
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}
</style>
