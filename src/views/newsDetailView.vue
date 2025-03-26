<template>
	<div class="common-layout">
		<el-container>
			<el-header class="header" height="75px">
				<Headermy></Headermy>
			</el-header>
			<el-main>
				<div class="newsTitle">
					<h3>{{this.$route.query.title}}</h3>
					<h5>{{this.$route.query.date}}</h5>
					<hr style="height: 2px;color: orange;background-color: orange;">
				</div>
				<div id="contentMN"></div>
			</el-main>
			<el-footer>
				<Footermy></Footermy>
			</el-footer>
		</el-container>
	</div>
</template>
<style>
	#contentMN img{
		margin: auto;
		max-height: 400px;
		width: auto;
	}
	#contentMN p{
		display: flex;
		justify-content: center;
		text-indent: 2em;
	}
</style>
<script>
	import Headermy from '../components/HeadComponent.vue'
	import Footermy from '../components/footerComponent.vue'
	import mammoth from "mammoth";
	
	export default {
		data() {
			return {
				filename: ''
			}
		},
		mounted() {
			document.getElementById("new").style.color = "orange";
			this.filename = "/static/"+this.$route.query.filename;
			this.loadNews();
		},
		methods: {
			async loadNews() {
				const response = await fetch(this.filename);
				const blob = await response.blob();
				const file = new File([blob], "filename.txt", {
					type: blob.type
				});
				this.onFile(file);
			},
			onFile(file) {
				if (file) {
					const reader = new FileReader();
					reader.onload = (e) => {
						try {
							const arrayBuffer = e.target.result;
							mammoth.convertToHtml({
								arrayBuffer: arrayBuffer
							}).then((result) => {
								this.htmlContent = result.value; // The generated HTML
								console.log(this.htmlContent);
								this.$nextTick(() => {
									const contentMN = document.getElementById("contentMN");
									console.log(contentMN);
									// 创建一个li元素
									var DIV = document.createElement("div");
									DIV.innerHTML = this.htmlContent;
									contentMN.appendChild(DIV);
								});
							});
						} catch (error) {
							console.error("Error converting document", error);
						}
					};
					reader.readAsArrayBuffer(file);
				}
			},
		},
		components: {
			Headermy,
			Footermy
		}
	}
</script>

<style scoped>
	.newsTitle{
		text-align: center;
	}
</style>