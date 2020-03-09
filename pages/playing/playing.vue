<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="mt-5">
			<image src="../../static/demo/demo2.jpg" style="width: 750rpx;height: 425rpx;">
		</view>
		<view class="fixed-bottom" style="background-color: #131313;height: 740rpx;width: 750rpx;">
			<view style="height: 200rpx;"></view> <!-- 占位符 -->
			<!-- 文字滚动 -->
			<view class="m-2 rounded">
				<uni-notice-bar style="margin-bottom: 100rpx;" size="50rpx" background-color="#131313" color="#FFFFFF" :scrollable="!pause"
				 :speed="100" single="true" text="我是快乐的滚动条!我是快乐的滚动条!我是快乐的滚动条!"></uni-notice-bar>
			</view>

			<view class="flex justify-center flex-column">
				<!-- 播放滑动条 -->
				<slider :max="music.max" :value="music.played" block-size="12" activeColor="#FFFFFF" style="width: 660rpx;"
				 @changing="sliderChanging"></slider>
				<view class="flex justify-between px-5" style="margin-top: -10px;">
					<text class="text-light-muted font-sm">{{formatTime1}}</text>
					<text class="text-light-muted font-sm">{{formatTime2}}</text>
				</view>
				<view style="height: 100rpx;"></view> <!-- 占位符 -->

				<!-- 播放按钮等 -->
				<view class="flex flex-row align-center justify-center">
					<!-- 下载-->
					<view class="text-white font-lger iconfont iconxiazai mx-4" hover-class="animated pulse" @tap="downMusic"></view>
					<!-- 上一首-->
					<view class="text-white font-lger iconfont iconziyuanldpi8 mx-4" hover-class="animated pulse"></view>
					<!-- 播放 -->
					<view @tap="changeState" class="text-white iconfont mx-4" style="font-size: 70rpx;" hover-class="animated pulse"
					 :class="getPlaying ? 'iconzantingtingzhi':'iconziyuanldpi11'"></view>
					<!-- 下一首 -->
					<view class="text-white font-lger iconfont iconziyuanldpi9  mx-4" hover-class="animated pulse"></view>
					<!-- 分享 -->
					<view class="text-white font-lger iconfont iconfenxiang mx-4" hover-class="animated pulse" @tap="share"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	import $T from '@/common/time.js';
	import {
		mapGetters,
		mapMutations
	} from "vuex";
	export default {
		components: {
			uniNoticeBar
		},
		data() {
			return {
				music: {
					max: 198, //播放总时长
					played: 20, //已播放时长
				}

			}
		},
		computed: {
			...mapGetters(['getPopState', 'getPlaying']),
			formatTime1() {
				return $T.formatSeconds(this.music.played);
			},
			formatTime2() {
				return $T.formatSeconds(this.music.max);
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: "当前播放音乐名称"
			})
		},
		methods: {
			...mapMutations(['setPopState', 'setPlaying']),
			//拖动播放进度
			sliderChanging(e) {
				this.music.played = e.detail.value;
			},
			//点击暂停播放
			changeState() {
				this.setPlaying(!this.getPlaying);
			},
			//下载歌曲
			downMusic() {
				console.log("下载歌曲");
			},
			//分享歌曲
			share() {
				console.log("分享歌曲")
			}
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}
</style>
