export default {
	onNetWork() {
		console.log("监听网络")
		let func = (res) => {
			if (res.networkType === 'none') {
				uni.showToast({
					title: '当前处于断网状态,请先连接',
					icon: 'none'
				});
			}
		}
		uni.getNetworkType({
			success: func
		});
		uni.onNetworkStatusChange(func);
	},
	
}
