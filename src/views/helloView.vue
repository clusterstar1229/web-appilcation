<template>
	<div class="common-layout" :style="{ 'min-width': minWidth }">
		<el-container>
			<el-header class="header" height="75px">
				<Header></Header>
			</el-header>

			<div class="mainimage">
				<!--首页图片展示-->
				<div class="block text-center" m="t-4">
					<el-carousel trigger="click" height="500px">
						<el-carousel-item v-for="(image, index) in mainImages" :key="index">
							<img :src="require(`/public/img/${image}`)" class="animated-image"
								style="height: 500px;width:100%;" />
						</el-carousel-item>
					</el-carousel>
				</div>

			</div>
			<el-container>
				<el-container>
					<el-main style="width: 100%;">
						<div style="text-align: center;">
							<ul class="selul">
								<li class="li1">
									<div><img src="../../public/limain.png" style="margin-right: 20px;"></div>
									<div>
										<p class="hello">当前日期：{{currentDate}}</p>
										<p class="hello">欢迎您乘坐本公司公交</p>
									</div>
								</li>
								<li class="li2"><a>服务指南
										<hr><img src="../../public/li1.png">
									</a></li>
								<li class="li2"><a>线路查询
										<hr><img src="../../public/li2.png">
									</a></li>
								<li class="li2"><a>关于我们
										<hr><img src="../../public/li3.png">
									</a></li>
							</ul>
						</div>
					</el-main>
					<el-footer>
						<Footermy></Footermy>
					</el-footer>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import moment from 'moment'
	import Header from '../components/HeadComponent.vue'
	import Footermy from '../components/footerComponent.vue'
	export default {
		data() {
			return {
				minWidth: '1000px',
				currentDate: '',
				//图片控制
				mainImages: ['image_bus_1.webp', 'image_bus_2.webp', 'image_bus_3.webp']
			}
		},
		components:{
			Header,
			Footermy
		},
		mounted() {
			this.currentDate = moment().format('YYYY-MM-DD')
		},
		methods: {

		}
	}
</script>

<style>

	.mainimage {
		width: 100%;
		height: auto;
	}

	.demonstration {
		color: var(--el-text-color-secondary);
	}

	.el-carousel__item h3 {
		color: #475669;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
		text-align: center;
	}

	.el-carousel {
		width: 100%;
	}

	.el-carousel__indicator--horizontal .el-carousel__button {
		/** 未激活状态的指示器样式**/
		width: 10px;
		height: 10px;
		background: transparent;
		border: 1px solid #ffffff;
		border-radius: 50%;
		opacity: 0.5;
	}

	.el-carousel__indicator--horizontal.is-active .el-carousel__button {
		/** 激活状态的指示器样式**/
		width: 10px;
		height: 10px;
		background: orange;
		border-radius: 50%;
		opacity: 1;
	}

	li {
		list-style: none;
	}

	.selul {
		display: flex;
		width: 80%;
		padding: 20px;
		margin: auto;
	}

	.li1 {
		width: 25%;
		height: 100px;
		background-color: aliceblue;
		margin-left: 20px;
		margin-right: 20px;
		padding: 20px;
		display: flex;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
		border: 1px solid;
		border-radius: 10px;
	}

	.li2 {
		width: 20%;
		height: 100px;
		background-color: aliceblue;
		text-align: center;
		border: 1px solid;
		border-radius: 10px;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
		padding: 20px;
		transition: background-color 0.8s ease;
		margin-left: 20px;
		margin-right: 20px;
	}

	.li2:hover {
		background-color: orange;
		color: white;
	}

	.hello {
		color: green;
		;
		margin: 0px;
	}
	.skip{
		text-decoration: none;
		color: black;
	}
</style>