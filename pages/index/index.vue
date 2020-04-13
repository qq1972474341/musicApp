<template>
	<view>
		<!-- 顶部导航栏 -->
		<uni-nav-bar backgroundColor="#282828" color="#ffffff" fixed statusBar>
			<view class="flex align-center" slot="left">
				<!-- <text class="iconfont iconMusic font-lg"></text> -->
				<image class="position-fixed" src="/static/icon.png" style="width: 60rpx;height: 60rpx;"></image>
				<text class="font font-weight-bolder" style="font-family: '宋体';margin-left: 90rpx;">{{pageName}}</text>
			</view>
			<!-- 搜索框 -->
			<view class="input-view" style="margin-left: 50rpx;" @tap="openSearch">
				<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
				<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词" disabled>
			</view>
			<!-- 消息 -->
			<view slot="right" @tap="openMessage" class="position-absolute ml-2">
				<uni-icons type="chat" color="#fff" size="24"></uni-icons>
				<view class="position-relative" style="z-index: 99999;display: inline;top: -30rpx;left: -20rpx;">
					<uni-badge :text="msg_list.length" type="error"></uni-badge>
				</view>
			</view>
		</uni-nav-bar>
		<!-- 播放弹出层 -->
		<view v-show="getPopState" class="flex flex-column position-fixed w-100" style="bottom: 95rpx;z-index: 9999;">
			<view class="flex flex-row">
				<image :src="Music.img" style="width: 190rpx;height: 110rpx;" @tap="openPlaying" mode="aspectFill"></image>
				<view class="flex-1 flex align-center" style="background-color: #1d1d1d;" @tap="openPlaying">
					<view class="flex flex-column ml-3" style="width: 360rpx;">
						<text class="text-white font font-weight-bold text-ellipsis">{{Music.title}}</text>
						<text class="text-light-muted font font-weight-bold text-ellipsis">{{Music.author}}</text>
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
		<home v-show="curPage=='home'"></home>
		<music v-show="curPage=='music'"></music>
		<mypage v-show="curPage=='mypage'"></mypage>
		<!-- 占位符 -->
		<view style="height: 95rpx;"></view>
		<!-- 底部导航栏95rpx -->
		<adTabbar backgroundColor="#1d1d1d">
			<adTabbarItem text="首页" :textColor="curPage=='home'?'#e4e4e4':'#5d5d5d'" dataCur="home" class="maxWidth" @click="navClick"
			 :icon="curPage=='home'?'/static/tabbar/indexed.png':'/static/tabbar/index.png'"></adTabbarItem>
			<adTabbarItem text="串烧音乐" :textColor="curPage=='music'?'#e4e4e4':'#5d5d5d'" dataCur="music" class="maxWidth" @click="navClick"
			 :icon="curPage=='music'?'/static/tabbar/musiced.png':'/static/tabbar/music.png'"></adTabbarItem>
			<adTabbarItem text="我的" :textColor="curPage=='mypage'?'#e4e4e4':'#5d5d5d'" dataCur="mypage" class="maxWidth" @click="navClick"
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
	let timer;
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
				pageName: '首页',
				progressNum: 0,
				msg_list: []
			}
		},
		computed: {
			...mapGetters(['getPopState', 'getPlaying', 'getPlayMode']),
			...mapState(['userInfo', 'hasLogin', 'Audio', 'Music']),
		},
		onShow() {
			timer = setInterval(() => {
				//console.log("首页进度监听")
				this.progressNum = (this.Audio.currentTime / this.Audio.duration) * 100;
			}, 500)
		},
		onHide() {
			clearInterval(timer); //清除定时器
		},
		onLoad() {
			//获取消息列表
			this.getMessageList();
			//获取手机平台
			try {
				const res = uni.getSystemInfoSync();
				console.log(res.platform); //获取平台 IOS/Android
				this.setPlatform(res.platform);
			} catch (e) {
				// error
			}
			//未登陆试听检查事件
			uni.$on('playCheck', () => {
				//用户未登陆
				if (!this.hasLogin) {
					//试听检测
					if (service.checkNoneLoginPlay()) return;
					setTimeout(() => {
						this.Audio.stop();
					}, 500) //留部分延迟才能停止
					this.$store.commit("setPopState", false); //关闭音乐弹出层
					//this.setMusic(undefined);
					plus.nativeUI.alert('已试听10次,请先登录后听音乐', () => {
						uni.navigateBack({
							delta: 1
						})
					});
					return;
				}
			});
			//监听网络
			this.$U.onNetWork();
			//首先检查登录状态
			this.checkLogin();
			//音乐被其他应用暂停
			this.Audio.onPause(() => {
				//设置播放状态为暂停
				this.setPlaying(false);
			})
			//播放开始事件
			this.setPlayStartEvent()
			//播放结束事件
			this.setPlayEndEvent()
		},
		methods: {
			...mapMutations(['setPopState', 'setPlaying', 'login', 'logout', 'setMusicLocalIndex', 'setMusic', 'setPlatform']),
			//打开消息页面
			openMessage() {
				//console.log(this.msg_list);
				uni.navigateTo({
					url: "../message/message?list=" + encodeURIComponent(JSON.stringify(this.msg_list))
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
				switch (this.curPage) {
					case 'home':
						this.pageName = '首页';
						break;
					case 'music':
						this.pageName = '串烧';
						break;
					case 'mypage':
						this.pageName = '我的';
						break;
				}
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
				// console.log((this.Audio.currentTime / this.Audio.duration) * 100);
				console.log('改变播放状态')
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
			//获取消息列表
			getMessageList() {
				uni.request({
					url: service.DOMAIN + 'api/v1.Message/getMessage',
					method: 'POST',
					data: {
						page: 1,
						limit: 15,
						APP: true
					},
					success: res => {
						if (res.data.data.length > 0) {
							this.msg_list = res.data.data;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//设置播放开始事件
			setPlayStartEvent() {
				this.Audio.onPlay(() => {
					this.setPlaying(true); //置播放状态 为 true
				})
			},
			//设置播放结束事件
			setPlayEndEvent() {
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
					if (this.getPlayMode === 1) {
						console.log("列表播放模式");
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
						console.log("下一首索引：" + musicIndex);
						this.setMusic(service.getPlayListMusic(musicIndex));

					} else if (this.getPlayMode == 2) {
						console.log("单曲循环模式");
						this.Audio.play();
					} else if (this.getPlayMode == 3) {
						console.log("随机播放模式");
						uni.request({
							url: service.DOMAIN + 'api/v1.Music/getRandomMusic',
							method: 'POST',
							data: {
								id: this.Music.id
							},
							success: (res) => {
								this.setMusic(res.data.data)
							}
						});
					}
				})
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
