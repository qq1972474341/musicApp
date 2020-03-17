<template>
	<view>
		<!-- 串烧音乐 -->
		<scroll-view scroll-y="true" @scrolltolower="LoadMore" :style="{'height':scrollH+'px'}">
			<view class="py-3 px-2 flex flex-column">
				<text class="text-white font-lger font-weight-bolder">串烧音乐</text>
				<text class="text-white font-sm text-light-muted">最新发布的流行音乐</text>
			</view>
			<block v-for="(item,index) in list" :key="index">
				<view class="flex-column" style="position:relative" @tap="selectMusic(index)">
					<image src="/static/demo/demo2.jpg" class="w-100" style="height: 420rpx;" mode="aspectFill"></image>
					<view class="flex flex-column text-white m-3" style="position: absolute;left: 0;bottom: 0;">
						<text class="font-lg">添加文字</text>
						<text class="font">介绍</text>
					</view>
				</view>
			</block>
			<view class="mb-2">
				<uni-load-more :status="loadState" :contentText="loadText"></uni-load-more>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				scrollH: 200,
				loadState: "more",
				loadText: {
					contentdown: "下拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [{
						img: "/static/demo/demo2.jpg",
						url: "https://taofen-bucket.oss-cn-beijing.aliyuncs.com/test.mp3"
					},
					{
						img: "/static/demo/demo2.jpg",
						url: "https://taofen-bucket.oss-cn-beijing.aliyuncs.com/test.mp3"
					},
					{
						img: "/static/demo/demo2.jpg",
						url: "https://taofen-bucket.oss-cn-beijing.aliyuncs.com/test.mp3"
					},
					{
						img: "/static/demo/demo2.jpg",
						url: "https://taofen-bucket.oss-cn-beijing.aliyuncs.com/test.mp3"
					},
					{
						img: "/static/demo/demo2.jpg",
						url: "https://taofen-bucket.oss-cn-beijing.aliyuncs.com/test.mp3"
					},
					{
						img: "/static/demo/demo2.jpg",
						url: "https://taofen-bucket.oss-cn-beijing.aliyuncs.com/test.mp3"
					}
				]
			}
		},
		created() {
			//初始化页面大小 185rpx
			uni.getSystemInfo({
				success: (res) => {
					//console.log(res);
					this.scrollH = res.windowHeight - uni.upx2px(185);
					//console.log(this.scrollH);
				}
			})
		},
		methods: {
			//选择音乐
			selectMusic(index) {
				uni.navigateTo({
					url: "../playing/playing?item=" + JSON.stringify(this.list[index])
				})
			},
			//加载更多
			LoadMore() {
				console.log("加载更多")
				this.loadState = "loading";
				setTimeout(() => {
					this.list = [...this.list, ...this.list];
					this.loadState = "more";
				}, 3000)
			}
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}

	image {
		/* 去除image上下间隙 */
		margin: 0;
		padding: 0;
		border-bottom: 1px solid black;
		display: block;
	}
</style>
