<template>
	<div class="common-layout">
		<el-container>
			<el-header class="header" height="75px">
				<Headermy></Headermy>
			</el-header>
			<el-main>
				<div style="justify-content: center; display:flex">
					<h1 class="content">新闻中心</h1>
				</div>
				<div class="newsHead">
					<img src="../../public/news.webp" width="30%">
					<div style="text-align: center; padding: 25px; width: 100%; color: green;">
						欢迎来到新闻中心！我们致力于为您提供最新、最全面的公交行业资讯和公司动态。在这里，您可以了解到与公交相关的各种新闻、事件、政策，以及我们公司的最新动态和发展方向。
						作为公交公司，我们始终关注着城市交通的发展和改善，努力提供便捷、高效、环保的公共交通服务。通过新闻中心，我们与广大用户分享关于公交行业的重要新闻，包括行业趋势、技术创新、城市规划等方面的动态。我们还将发布公司内部的重要消息和公告，让用户了解我们的发展战略、业务拓展、服务升级等方面的信息。
					</div>
				</div>
				<div style="text-align: center;">新闻模糊查询： <el-input v-model="title" style="width: 240px" placeholder="输入后点击空白即可"  @change="titleChange()"/><el-button @click="title='';fetchData()">清空</el-button></div>
				<div>
					<div style="background-color:#cde6c7; margin-top: 25px;">
						<el-row style="display: flex;justify-content: center;">
							<el-col v-for="(item, index) in mymsg" :key="item.newId" :span="8"
								:offset="index > 0 ? 2 : 0" style="margin: 20px; width: 200px;">
								<el-card :body-style="{ padding: '0px'}">
									<img :src="'http://localhost:6060/static/'+image[index]" class="image" />
									<div style="padding: 14px;height: 200px;">
										<span>
											<h3>{{item.title}}</h3>
										</span>
										<div class="bottom">
											<time class="time">
												<h4>{{ item.date }}<br><br><br>关键词：{{item.intro}}</h4>
											</time>
											<el-button text class="button" @click="showDetail(item)">查看</el-button>
										</div>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</div>
					<div style=" display: flex;justify-content: center;background-color:#cde6c7;">
						<el-pagination :current-page="currentPage" :page-sizes="[2,4, 10]" :page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper" :total="total"
							@size-change="handleSizeChange" @current-change="handleCurrentPageChange"
							background="true"></el-pagination>
					</div>
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
	//import { da } from 'element-plus/es/locale';
	export default {
		data() {
			return {
				currentPage: 1,
				pageSize: 2,
				total: 0,
				id: "",
				mymsg: [], // 存放查询结果
				image: [],
				title: ''
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
			titleChange(){
				this.fetchData();
			},
			handleSizeChange(pageSize) {
				this.pageSize = pageSize;
				this.fetchData();
			},
			handleCurrentPageChange(currentPage) {
				this.currentPage = currentPage;
				this.fetchData();
			},
			fetchData() {
				if(this.title!=""){
					var pa = {};
					pa.pageNumber = this.currentPage;
					pa.pageSize = this.pageSize;
					pa.title = this.title;
					this.$http.get('/news/getDimPage', {
							params: pa
						})
						.then(response => {
							var data = response.data;
							this.total = data.total;
							this.mymsg = data.rows;
							this.image = data.imageid;
						})
						.catch(error => {
							console.log(error)
						})
				}else{
					var param = {};
					param.pageNumber = this.currentPage;
					param.pageSize = this.pageSize;
					if (this.id != '') {
						param.id = this.id;
					}
					this.$http.get('/news/getpage', {
							params: param
						})
						.then(response => {
							var data = response.data;
							this.total = data.total;
							this.mymsg = data.rows;
							this.image = data.imageid;
						})
						.catch(error => {
							console.log(error)
						})
				}
			},
			showDetail(details) {
				console.log(details.content);
				var a =details;
				var filename=a.content;
				var title=a.title;
				var date=a.date;
				this.$router.push({ path: '/detail', query: { filename ,title,date} });
			}
		}
	}
</script>
<style scoped>
	.newsHead {
		top: 40px;
		margin-left: 80px;
		margin-right: 80px;
		padding-left: 20px;
		padding-right: 20px;
		background-color: ghostwhite;
		border-radius: 20px;
		display: flex;
	}

	.time {
		font-size: 12px;
		color: #999;
	}

	.bottom {
		line-height: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.button {
		padding: 0;
		min-height: auto;
	}

	.image {
		width: 100%;
		display: block;
		height: 200px;
	}

	.el-card {
		width: 100%;
	}
</style>
<style scoped>
	:deep(.is-active) {
		background-color: aquamarine !important;
		color: black !important;
	}

	:deep(.btn-prev) {
		/*background-color:greenyellow !important;*/
		color: white;
	}


	:deep(.btn-next) {
		/* background-color: green !important; */
		color: white;
	}
</style>