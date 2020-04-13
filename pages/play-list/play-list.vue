<template>
	<view>
		<uni-swipe-action>
			<block v-for="(item,index) in list" :key="index">
				<uni-swipe-action-item :options="option_list" @click="selectOption(index,$event)">
					<view class="flex m-2 flex-1" @tap="selectMusic(index)">
						<image :src="item.img" mode="aspectFill" style="width: 100rpx;height: 100rpx;"></image>
						<view class="flex flex-column justify-center ml-2">
							<text class="text-white">{{item.title}}</text>
							<text class="text-light-muted font">{{item.author}}</text>
						</view>
					</view>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
	</view>
</template>

<script>
	import service from '@/service.js';
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {
		mapMutations
	} from "vuex";
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				list: [],
				option_list: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		onLoad() {
			this.list = service.getPlayList();
			console.log(this.list);
		},
		methods: {
			...mapMutations(['setPopState', 'setMusic', 'setPlayMode', 'setMusicLocalIndex']),
			//左滑菜单选项
			selectOption(index, e) {
				if (e.index === 0) {
					service.deletePlayListItem(index);
					this.list = service.getPlayList();
				}
			},
			//选择音乐
			selectMusic(index) {
				//this.setPopState(true); //设置音乐弹层显示
				this.setMusic(this.list[index]); //设置当前音乐资源
				this.setPlayMode('listPlay'); //设置播放列表播放模式
				this.setMusicLocalIndex(index); //设置当前播放列表音乐索引  不同的播放模式 不同的列表
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
