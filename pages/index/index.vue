<template>
	<view>
		<!-- 顶部导航栏 -->
		<uni-nav-bar backgroundColor="#282828" color="#ffffff" fixed statusBar>
			<view class="flex align-center" slot="left">
				<text class="iconfont iconMusic font-lg"></text>
				<text class="ml-1 font-lger font-weight-bolder" style="font-family: '宋体';">Music</text>
			</view>
			<!-- 搜索框 -->
			<view class="input-view" style="margin-left: 50rpx;" @tap="openSearch">
				<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
				<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词" disabled>
			</view>
			<view slot="right" @tap="openMessage">
				<uni-icons type="chat" color="#fff" size="24"></uni-icons>
				<view class="position-absolute" style="top: 30rpx;right:30rpx;z-index: 99999;">
					<uni-badge text="2" type="error"></uni-badge>
				</view>
			</view>
		</uni-nav-bar>
		<!-- 播放弹出层 -->
		<view v-show="getPopState" class="flex flex-column position-fixed w-100" style="bottom: 95rpx;z-index: 9999;">
			<view class="flex flex-row">
				<image :src="Music.img" style="width: 190rpx;height: 110rpx;" @tap="openPlaying" mode="aspectFill"></image>
				<view class="flex-1 flex align-center" style="background-color: #1d1d1d;" @tap="openPlaying">
					<view class="flex flex-column ml-3" style="width: 360rpx;">
						<text class="text-white font font-weight-bold">{{Music.name}}</text>
						<text class="text-light-muted font font-weight-bold">{{Music.author}}</text>
					</view>
					<view class="flex flex-1 ml-1">
						<view class="iconfont text-white" :class="getPlaying?'iconzanting-':'iconbofang'" @tap.stop="changeState"></view>
						<view class="iconfont iconguanbi text-white mr-4" style="margin-left: auto;" @tap.stop="closePop" hover-class="animated pulse"></view>
					</view>
				</view>
			</view>
			<view>
				<progress :percent="progressNum" stroke-width="1" backgroundColor="#999" />
			</view>
		</view>
		<!-- 页面 -->
		<home v-if="curPage=='home'"></home>
		<music v-if="curPage=='music'"></music>
		<mypage v-if="curPage=='mypage'"></mypage>
		<!-- 占位符 -->
		<view style="height: 95rpx;"></view>
		<!-- 底部导航栏95rpx -->
		<adTabbar backgroundColor="#1d1d1d">
			<adTabbarItem text="首页" :textColor="curPage=='home'?'#e4e4e4':'#5d5d5d'" dataCur="home" class="maxWidth" @tap="navClick"
			 :icon="curPage=='home'?'/static/tabbar/indexed.png':'/static/tabbar/index.png'"></adTabbarItem>
			<adTabbarItem text="串烧音乐" :textColor="curPage=='music'?'#e4e4e4':'#5d5d5d'" dataCur="music" class="maxWidth" @tap="navClick"
			 :icon="curPage=='music'?'/static/tabbar/musiced.png':'/static/tabbar/music.png'"></adTabbarItem>
			<adTabbarItem text="我的" :textColor="curPage=='mypage'?'#e4e4e4':'#5d5d5d'" dataCur="mypage" class="maxWidth" @tap="navClick"
			 :icon="curPage=='mypage'?'/static/tabbar/myed.png':'/static/tabbar/my.png'"></adTabbarItem>
		</adTabbar>
	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniBadge from '@/components/uni-badge/uni-badge.vue';
	import adTabbar from '@/components/andy-ADTabbar/andy-ADTabbar.vue';
	import adTabbarItem from '@/components/andy-ADTabbar/andy-ADTabbarItem.vue';
	import home from '@/pages/index/home.vue';
	import mypage from '@/pages/my/my.vue';
	import music from '@/pages/music/music.vue';
	import service from '@/service.js';
	import {
		mapGetters,
		mapMutations,
		mapState
	} from "vuex";
	export default {
		components: {
			uniIcons,
			uniBadge,
			uniNavBar,
			adTabbar,
			adTabbarItem,
			home,
			music,
			mypage
		},
		data() {
			return {
				curPage: 'home',
				progressNum: 0
			}
		},
		computed: {
			...mapGetters(['getPopState', 'getPlaying', 'getPlayMode']),
			...mapState(['userInfo', 'hasLogin', 'Audio', 'Music']),
		},
		onLoad() {
			//首先检查登录状态
			this.checkLogin();
			//音乐资源加载后自动播放
			this.Audio.autoplay = true;
			//监听音乐播放进度变化  不需要卸载 主页面
			this.Audio.onTimeUpdate(() => {
				//console.log("音乐弹出层监听:" + this.Audio.currentTime);
				this.progressNum = (this.Audio.currentTime / this.Audio.duration) * 100;
			})
			this.Audio.onEnded(() => {
				//登录状态检查
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
				console.log("音乐自然播放结束切歌");
				let musicIndex = 0;
				if (this.getPlayMode === 'playList') {
					console.log("播放列表历史播放模式");
					//console.log(this.$store.state.MusicLocalIndex);
					let max = service.getPlayList().length - 1; //获取播放列表最大索引
					//顺序循环播放模式
					if (this.$store.state.MusicLocalIndex === max) {
						//播放到最后一首从头开始
						musicIndex = 0;
						this.setMusicLocalIndex(musicIndex);
					} else {
						musicIndex = this.$store.state.MusicLocalIndex + 1
						this.setMusicLocalIndex(musicIndex);
					}
					console.log(musicIndex);
					this.setMusic(service.getPlayListMusic(musicIndex))
					console.log(this.Music);
					this.Audio.src = this.Music.src;
				} else {
					console.log("自由播放模式");
				}
			})
		},
		methods: {
			...mapMutations(['setPopState', 'setPlaying', 'login', 'logout', 'setMusicLocalIndex', 'setMusic']),
			openMessage() {
				uni.navigateTo({
					url: "../message/message"
				})
			},
			//检查登录状态
			checkLogin() {
				//console.log("检查登录状态");
				if (!(service.getUser() === '')) {
					//已经登陆
					this.login(service.getUser());
					//console.log("用户信息：" + JSON.stringify(this.userInfo));
				}
			},
			// 底部导航栏切换
			navClick: function(e) {
				//console.log(e);
				this.curPage = e.currentTarget.dataset.cur
			},
			//关闭播放弹出层
			closePop() {
				//隐藏弹出层
				this.setPopState(false);
				//停止播放状态
				this.setPlaying(false);
				this.Audio.stop(); //停止播放
				this.Audio.src = ""; //音频资源置空
			},
			//打开播放页面
			openPlaying() {
				uni.navigateTo({
					url: '../playing/playing'
				})
			},
			//打开搜索页面
			openSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			//播放和暂停
			changeState() {
				console.log((this.Audio.currentTime / this.Audio.duration) * 100);
				if (this.getPlaying) {
					//暂停播放
					this.Audio.pause();
					this.setPlaying(false);
				} else {
					//继续播放
					this.Audio.play();
					this.setPlaying(true);
				}
			}


		}
	}
</script>

<style>
	.input-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		/* width: 500rpx;
	*/
		flex: 1;
		background-color: #f8f8f8;
		height: 30px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.nav-bar-input {
		height: 30px;
		line-height: 30px;
		/* #ifdef APP-PLUS-NVUE */
		width: 370rpx;
		/* #endif */
		padding: 0 10px;
		font-size: 28rpx;
		color: #000000;
		background-color: #f8f8f8;
	}
</style>
