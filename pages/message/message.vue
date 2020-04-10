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
				}]
			}
		},
		onLoad(e) {
			this.list=JSON.parse(decodeURIComponent(e.list));
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
