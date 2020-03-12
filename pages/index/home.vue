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
	import {
		mapMutations
	} from "vuex";
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
						src: "https://taofen-bucket.oss-cn-beijing.aliyuncs.com/test.mp3",
						name: "YHLQMD",
						author: 'Shart Foeir',
						desc: "描述"
					},
					{
						name: "你的微笑",
						author: 'Shart Foeir',
						desc: "描述",
						src: "http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/556/66405556.aac",
						img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547630730529&di=f37e409de12f9930e25507c3252a462c&imgtype=0&src=http%3A%2F%2Fmp2.iqiyipic.com%2Fimage%2F20180827%2F03%2F41%2Fh_1199242471_h_601_400_400.jpg"
					},
					{
						name: '英雄联盟群雄齐聚',
						author: '毛不易',
						desc: "描述",
						src: 'http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/414/66335414.aac',
						img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547630762297&di=2c3317bf38f107287414b1b0cd33f0e5&imgtype=0&src=http%3A%2F%2Fsingerimg.kugou.com%2Fuploadpic%2Fpass%2Fsofthead%2F400%2F20140829%2F20140829161553861786.jpg',
					},
					{
						name: 'TryEverything',
						author: 'Shakira',
						desc: "描述",

						src: 'http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/480/66379480.aac',
						img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547471202346&di=bd9b5e27beb9341b058d21e521e8d75e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F27%2F20170727210705_zcijE.jpeg',
					},
					{
						name: '我爱过几个人',
						author: '邓论',
						desc: "描述",

						src: 'http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/339/65390339.aac',
						img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547630610810&di=1a0c6d9557aa2bba822c54694a55429e&imgtype=0&src=http%3A%2F%2Fmp0.iqiyipic.com%2Fimage%2F20180827%2Fff%2F79%2Fh_1199249539_h_601_400_400.jpg',
					},
					{
						name: '浪子回头',
						author: '辉气*蛋',
						desc: "描述",
						src: 'http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/645/66725645.aac',
						img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547631130547&di=076c9275ce160baa2ff5cb66eed4ad53&imgtype=0&src=http%3A%2F%2Fwww.mixtapetorrent.com%2Fsystem%2Ffiles%2Ffollowmernb.jpg',
					},
					{
						name: '生僻字心动不已',
						author: '〃°ω°〃',
						desc: "描述",
						src: 'http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/359/64750359.aac',
						img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547631330468&di=517d6b42ed32567a5798fd9bbe13ff9c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170830%2F2dbe36dfa0a14c0c94b672f445c02a21.jpeg',
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
			...mapMutations(['setMusic']),
			//选择音乐
			selectMusic(index) {
				this.setMusic(this.list[index]);
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
