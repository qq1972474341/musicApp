<script>
	import service from "@/service.js";
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef APP-PLUS
			//检查更新 热更新、整包更新
			const VERSION = 1;
			plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
				//console.log(service.DOMAIN + 'checkUpdate');
				uni.request({
					url: service.DOMAIN + 'checkUpdate',
					method: 'POST',
					data: {
						hot_version: wgtinfo.versionCode,
						app_version: VERSION,
						name: wgtinfo.name
					},
					success: (result) => {
						var data = result.data;
						// console.log("检查更新:" + JSON.stringify(result.data));
						//APK更新检查
						if (data.app_update && data.pkgUrl) {
							console.log("本地版本:" + VERSION);
							console.log('需要整包更新');
							uni.showModal({ //提醒用户更新  
								title: "更新提示",
								content: "发现新版本需要更新",
								success: (res) => {
									if (res.confirm) {
										plus.runtime.openURL(data.pkgUrl);
									}
								}
							})
							return;
						}
						//热更新检查
						if (data.hot_update && data.wgtUrl) {
							console.log('需要热更新');
							uni.downloadFile({
								url: data.wgtUrl,
								success: (downloadResult) => {
									if (downloadResult.statusCode === 200) {
										plus.runtime.install(downloadResult.tempFilePath, {
											force: false
										}, function() {
											console.log('install success...');
											plus.runtime.restart();
										}, function(e) {
											console.error('install fail...');
										});
									}
								},
								fail: () => {
									console.log('下载热更新失败');
								}
							});
						}

					},
					fail: () => {},
					complete: () => {}
				});

			});
			// #endif
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	/* 自定义图标库 */
	@import "./common/iconfont";
	/* 自定义样式库 */
	@import "./common/free.css";
	/* 动画库 */
	@import url("common/animate.css");
</style>
