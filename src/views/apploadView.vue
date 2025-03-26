<template>
	<div class="common-layout">
		<el-container>
			<el-header class="header" height="75px">
				<Headermy></Headermy>
			</el-header>
			<el-main>
				<div style="justify-content: center; display:flex">
					<h1 class="content">欢迎下载APP用户端</h1>
				</div>
				<div class="container">
					<canvas ref="qrcodeCanvas"></canvas>
				</div>
				<div class="com">
					打开手机浏览器扫描即可下载（当前仅支持Android5.0以上设备）
				</div>
			</el-main>
			<el-footer>
				<Footermy></Footermy>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	import Headermy from '../components/HeadComponent.vue'
	import Footermy from '../components/footerComponent.vue'
	import QRCode from 'qrcode';
	export default {
		components: {
			Headermy,
			Footermy
		},
		methods: {
			async generateQRCode(url) {
				try {
					const canvas = this.$refs.qrcodeCanvas;
					await QRCode.toCanvas(canvas, url, {
						width: 200
					});
				} catch (e) {
					console.error(e);
				}
			}
		},
		mounted() {
			this.generateQRCode('http://120.26.211.53:6060/app-debug.apk');
		}
	}
</script>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		/* 设置容器高度 */
	}
	.com{
		text-align: center;
	}
</style>