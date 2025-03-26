<template>
	<div class="common-layout">
		<el-container>
			<el-header class="header" height="75px">
				<Headermy></Headermy>
			</el-header>
			<el-main>
				<div style="justify-content: center; display:flex">
					<h1 class="content">公告中心</h1>
				</div>
				<div class="bulletinHead">
					<img src="../../public/bulletin.gif" width="50%">
					<div style="text-align: center; padding: 25px; width: 50%; color: green;margin: auto;">
						城市公共交通官网的公告中心是为了向市民和游客提供关于公共交通系统最新动态、服务变化和重要通知的平台。在这个公告中心，您可以及时了解到公交线路的调整、票价变化、节假日运营安排等信息。我们致力于为大家提供便捷、舒适的出行体验，通过公告中心，您可以随时掌握到与城市公共交通相关的重要信息，让您的出行更加便利和顺畅。欢迎关注我们的公告中心，获取最新的公共交通资讯，谢谢！
					</div>
				</div>
				<div>
					<div style="background-color:#cde6c7; margin-top: 25px;">
						<el-row style="display: flex;justify-content: center;">
							<el-col v-for="(item, index) in mymsg" :key="item.newId" :span="8"
								:offset="index > 0 ? 2 : 0" style="margin: 20px; width: 200px;">
								<el-card :body-style="{ padding: '0px'}">
									<div style="padding: 14px;height: 200px;width: 200px;">
										<span>
											<h3>{{item.topic}}</h3>
										</span>
										<div class="bottom">
											<time class="time">
												<h4>发布时间：{{ item.createTime }}<br><br>发布人：{{item.createUser}}</h4>
											</time>
											<el-button text class="button" @click="showDetail(item.id)">查看</el-button>
										</div>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</div>
					<div class="demo-pagination-block">
						<div style=" display: flex;justify-content: center;background-color:#cde6c7;">
							<el-pagination :current-page="currentPage" :page-sizes="[2,4, 10]" :page-size="pageSize"
								layout="total, sizes, prev, pager, next, jumper" :total="total"
								@size-change="handleSizeChange" @current-change="handleCurrentPageChange"
								background="true"></el-pagination>
						</div>
					</div>
					<transition name="fade">
						<div class="popup" v-if="showPopup">
							<el-button @click="close"
								style="padding: 0px;background-color: white;border: none;float: right;">
								<img src="../../public/close.webp" height="20px">
							</el-button>
							<div>
								{{ bulletinDetail }}
							</div>
						</div>
					</transition>
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
	export default {
		data() {
			return {
				currentPage: 1,
				pageSize: 2,
				total: 0,
				mymsg: [],
				showPopup: false,
				text: "",
				bulletinDetail: ""
			}
		},
		components: {
			Headermy,
			Footermy
		},
		mounted() {
			document.getElementById("new").style.color = "orange";
			this.fetchData();
		},
		methods: {
			handleSizeChange(pageSize) {
				this.pageSize = pageSize;
				this.fetchData();
			},
			handleCurrentPageChange(currentPage) {
				this.currentPage = currentPage;
				this.fetchData();
			},
			fetchData() {
				var param = {};
				param.page = this.currentPage;
				param.pageSize = this.pageSize;
				if (this.id != '') {
					param.id = this.id;
				}
				this.$http3.get('bulletin/page', {
						params: param
					})
					.then(response => {
						var data = response.data.data;
						this.total = data.total;
						this.mymsg = data.records;
					})
					.catch(error => {
						console.log(error)
					})
			},
			showDetail(details) {
				var a = "/bulletin/" + details;
				this.$http3.get(a, {})
					.then(response => {
						var data = response.data.data;
						this.bulletinDetail = data.content;
					})
					.catch(error => {
						console.log(error)
					})
				this.showPopup = true;
			},
			close() {
				this.showPopup = false;
			}
		}
	}
</script>

<style scoped>
	.bulletinHead {
		text-align: center;
	}

	.demo-pagination-block+.demo-pagination-block {
		margin-top: 10px;
	}

	.demo-pagination-block .demonstration {
		margin-bottom: 16px;
	}

	.time {
		font-size: 12px;
		color: #999;
	}

	.popup {
		position: fixed;
		top: 50px;
		/* 自定义距离顶部的位置 */
		left: 50%;
		/* 让弹出层居中 */
		transform: translateX(-50%);
		background-color: #fff;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		padding: 20px;
		z-index: 999;
		width: 50%;
		/* 确保弹出层在最上层 */
		/* 初始状态隐藏 */
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>