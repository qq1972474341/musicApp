<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		#
		<!-- #ifdef APP-PLUS -->

		<!-- #endif -->
		<view class="ml-3 mt-2" hover-class="animated jello" @tap="back">
			<text class="text-white iconfont iconfanhui-copy-copy font-lg font-weight-bold"></text>
		</view>
		<view class="mt-5">
			<!-- 显示图片 -->
			<image :src="Music.img" style="width: 750rpx;height: 425rpx;" mode="aspectFill">
		</view>
		<view class="fixed-bottom" style="background-color: #131313;height: 740rpx;width: 750rpx;">
			<view style="height: 200rpx;"></view> <!-- 占位符 -->
			<!-- 文字滚动 -->
			<view class="m-2 rounded">
				<uni-notice-bar style="margin-bottom: 100rpx;" size="50rpx" background-color="#131313" color="#FFFFFF" :scrollable="!pause"
				 :speed="30" single="true" :text="Music.name+'        '+Music.author"></uni-notice-bar>
			</view>

			<view class="flex justify-center flex-column">
				<!-- 播放滑动条 -->
				<slider backgroundColor="#434343" :max="music.max" :value="music.played" block-size="12" activeColor="#FFFFFF"
				 style="width: 660rpx;" @changing="sliderChanging" @change="sliderChanged"></slider>
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
	//const Audio = uni.createInnerAudioContext(); //创建一个音频对象
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	import service from '@/service.js';
	import $T from '@/common/time.js';
	import {
		mapGetters,
		mapMutations,
		mapState
	} from "vuex";
	export default {
		components: {
			uniNoticeBar
		},
		data() {
			return {
				music: {
					max: 200, //播放总时长
					played: 0, //已播放时长
				}
			}
		},
		computed: {
			...mapGetters(['getPopState', 'getPlaying']),
			...mapState(['Audio', 'Music', 'hasLogin']),
			formatTime1() {
				return $T.formatSeconds(this.music.played);
			},
			formatTime2() {
				return $T.formatSeconds(this.music.max);
			}
		},
		onLoad(e) {
			console.log("登录状态：" + this.hasLogin);
			//播放音乐登录检查
			if (!this.hasLogin) {
				this.Audio.stop();
				this.$store.commit("setPopState", false); //关闭音乐弹出层
				//this.setMusic(undefined);
				plus.nativeUI.alert('请先登录后听音乐', () => {
					uni.navigateBack({
						delta: 1
					})
				});
				return;
			}
			let that = this; //传递自身this
			uni.getNetworkType({
				success: function(res) {
					//console.log(res.networkType);
					//console.log(service.getSetting().onlyUseWifi);
					if (res.networkType !== "wifi" && service.getSetting().onlyUseWifi || res.networkType !== "wifi" && service.getSetting()
						.onlyUseWifi ===
						undefined) {
						console.log("当前非wifi状态 使用流量播放");
						uni.showModal({
							title: '提示',
							content: '继续将使用流量播放',
							confirmText: '继续',
							success: (res) => {
								//取消返回上一个页面
								if (res.cancel) {
									that.$store.commit("setPopState", false); //关闭音乐弹出层
									this.setMusic(undefined); //音乐数据置空
									uni.navigateBack({
										delta: 1
									})
								} else {
									//使用流量播放
									service.setSetting('onlyUseWifi', false);
								}
							}
						})
					}
				},
			});
			this.$store.commit("setPopState", true); //可用mutations方法代替  显示音乐弹层
			if (JSON.stringify(this.Music) !== '{}' && this.Music != undefined) {
				console.log("音乐页面");
				//添加到播放列表
				service.addPlayList(this.Music);
				//初始化音频对象数据
				// if (this.Audio.src !== this.Music.src) {
				// 	this.Audio.destroy();
				// }
				this.Audio.src = this.Music.src;
				console.log('开始播放');
				this.setPlaying(true); //置播放状态 为 true
				// this.Audio.onPlay(() => {
				// 	console.log('开始播放');
				// 	this.setPlaying(true); //置播放状态 为 true
				// });
			}
			//暂停状态下置
			this.music.max = this.Audio.duration; //音乐总时长
			this.music.played = this.Audio.currentTime;
			//监听音乐播放进度变化
			this.Audio.onTimeUpdate(this.onTimeUpdate);
		},
		onUnload() {
			console.log("播放页面卸载");
			this.Audio.offTimeUpdate(this.onTimeUpdate); //卸载监听事件
		},
		methods: {
			...mapMutations(['setPopState', 'setPlaying', 'setMusic']),
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			//音乐方波进度变化事件
			onTimeUpdate() {
				//this.$mp.page.$getAppWebview().id 
				//console.log("音乐播放页:" + this.Audio.currentTime);
				this.music.max = this.Audio.duration; //音乐总时长
				this.music.played = this.Audio.currentTime;
			},
			//拖动中播放进度条变化
			sliderChanging(e) {
				this.music.played = e.detail.value;
			},
			//拖动进度条完成后事件
			sliderChanged(e) {
				this.Audio.seek(e.detail.value);
			},
			//点击暂停播放
			changeState() {
				if (this.getPlaying) {
					//暂停播放
					this.Audio.pause();
					this.setPlaying(false);
				} else {
					//继续播放
					this.Audio.play();
					this.setPlaying(true);
				}

			},
			//下载歌曲
			downMusic() {
				console.log("下载歌曲");
			},
			//分享歌曲
			share() {
				console.log("分享歌曲");
				uni.share({
					provider: 'weixin',
					scene: "WXSenceTimeline",
					type: 3,
					imageUrl: this.Music.img,
					title: this.Music.name,
					mediaUrl: this.Music.src,
					success: ret => {
						//点击分享回调
						console.log("分享点击回调")
						console.log(JSON.stringify(ret));
					}
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
