<template>
	<el-affix :offset="0" style="position:absolute;width: 20px; z-index: 3;">
		<el-button type="primary" style="width: 20px; background-color: white;border: orange 1px solid;margin: 0px;"
			@click="this.$router.push('/')">
			<img src="../../public/home.jpg" width="20px"></el-button>
		<el-button type="primary" style="width: 20px; background-color: white;border: orange 1px solid;margin: 0px;"
			@click="back()"><img src="../../public/back.webp" width="20px"></el-button>
	</el-affix>
	<el-row>
		<el-col :span="8">
			<h1>城市公共交通有限公司</h1>
		</el-col>
		<el-col :span="4">
			<a class="menu_1" id="about">关于公司
				<div class="menu_more">
					<div><a href="/about" class="skip">公司简介</a></div>
					<div><a href="/corporation" class="skip">公司理念</a></div>
				</div>
			</a>
		</el-col>
		<el-col :span="4">
			<a class="menu_1">服务中心
				<div class="menu_more">
					<div><a href="/appload" class="skip">客户端下载</a></div>
					<div><a href="/contact" class="skip">互动交流</a></div>
					<div>服务指南</div>
				</div>
			</a>
		</el-col>
		<el-col :span="4">
			<a class="menu_1" id="new">新闻公告
				<div class="menu_more">
					<div><a href="/news" class="skip">新闻</a></div>
					<div><a class="skip" href="/bulletin">公告</a></div>
				</div>
			</a>
		</el-col>
		<el-col :span="4"><a class="menu_1" href="/line" style="text-decoration: none;color: black;">线路查询</a></el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				minWidth: '1000px',
			}
		},
		methods: {
			back() {
				const currentPath = this.$route.path;
				if (currentPath === '/') {
					alert('已经是主页面了，无法返回！');
				} else {
					this.$router.go(-1);
				}
			}
		}
	}
</script>

<style>
	.el-row {
		margin-bottom: 20px;
	}

	.el-row:last-child {
		margin-bottom: 0;
	}

	.el-col {
		border-radius: 4px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
		height: auto;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.menu_1 {
		display: inline-block;
		width: 120px;
		height: 70px;
		line-height: 70px;
		font-size: 18px;
		position: relative;
		cursor: pointer;
	}

	.menu_1:hover .menu_more {
		display: block
	}

	.header {
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}

	.menu_more {
		position: absolute;
		top: 100%;
		width: 100%;
		height: auto;
		line-height: 40px;
		left: 0;
		display: none;
		z-index: 3;
		background-color: white;
	}

	.menu_more>div:hover {
		background-color: orange;
	}
</style>