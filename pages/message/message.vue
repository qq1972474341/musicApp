<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<msg-list :item="item" :index="index"></msg-list>
		</block>
	</view>
</template>

<script>
	import msgList from '@/components/msg/msg-list.vue';
	export default {
		components: {
			msgList
		},
		data() {
			return {
				list: [{
					avatar: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/userpic/2.jpg",
					name: "传奇霸业",
					update_time: 1570718427,
					data: "最新消息1",
					readed:false
				}, {
					avatar: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/userpic/3.jpg",
					name: "传奇霸业",
					update_time: 1570718427,
					data: "最新消息2",
					readed:false
				}, {
					avatar: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/userpic/4.jpg",
					name: "传奇霸业",
					update_time: 1570718427,
					data: "最新消息3",
					readed:false
				}]
			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}
</style>
