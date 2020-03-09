<template>
	<view>
		<!-- 首页显示内容 -->
		<scroll-view scroll-y="true" @scrolltolower="LoadMore" :style="{'height': scrollH+'px'}">
			<view class="flex flex-wrap py-2 justify-between">
				<view class="flex flex-column mb-4" v-for="(item,index) in list" :key="index" @tap="selectMusic(index)">
					<image :src="item.img" style="width: 330rpx;height: 330rpx;"></image>
					<text class="text-white">{{item.name}}</text>
					<text class="font-sm text-light-muted">{{item.desc}}</text>
				</view>
			</view>
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
				scrollH: 800,
				loadText: {
					contentdown: "下拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadState: "more",
				tabIndex: 0,
				items: ["首页", "首页", "首页", "首页"],
				tabBar: [{
						name: "首页",
						icon: "iconshouye"
					},
					{
						name: "串烧音乐",
						icon: "iconMusic"
					},
					{
						name: "我的",
						icon: "iconwode1"
					}
				],
				list: [{
						img: "/static/demo/demo1.jpg",
						name: "YHLQMD",
						desc: "描述"
					},
					{
						img: "/static/demo/demo1.jpg",
						name: "YHLQMD",
						desc: "描述"
					},
					{
						img: "/static/demo/demo1.jpg",
						name: "YHLQMD",
						desc: "描述"
					},
					{
						img: "/static/demo/demo1.jpg",
						name: "YHLQMD",
						desc: "描述"
					},
					{
						img: "/static/demo/demo1.jpg",
						name: "YHLQMD",
						desc: "描述"
					},
					{
						img: "/static/demo/demo1.jpg",
						name: "YHLQMD",
						desc: "描述"
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
				this.$store.commit("setPopState", true);
				uni.navigateTo({
					url: "../playing/playing"
				})
			},
			//底部导航栏监听点击事件
			clickIteam(index) {
				console.log(index);
				console.log(this.tabIndex);
				// this.tabIndex = index;
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
