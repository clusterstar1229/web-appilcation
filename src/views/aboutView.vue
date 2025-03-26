<template>
	<div class="common-layout">
		<el-container>
			<el-header class="header" height="75px">
				<Headermy></Headermy>
			</el-header>
			<el-main>
				<Menumy ref="getb"></Menumy>
				<div style="justify-content: center; display:flex">
					<h1 class="content">公司介绍</h1>
				</div>
				<div style="display:flex;padding: 30px;margin-left: 40px;margin-right: 40px;">
					<div style="width: 60%;">{{fileContent}}</div>
					<div style="width: 40%;"><img src='../../public/about1.jpg'
							style="height: 400px ;margin-left: 60px;border-radius: 10px;"></div>
				</div>
			</el-main>
			<el-footer>
				<footermy></footermy>
			</el-footer>
		</el-container>
	</div>

</template>

<script>
	import Headermy from '../components/HeadComponent.vue'
	import Footermy from '../components/footerComponent.vue'
	import Menumy from '../components/aboutConents/AboutMenu.vue'
	export default {
		data() {
			return {
				fileContent: ''
			}
		},
		components: {
			Headermy,
			Footermy,
			Menumy
		},
		created() {
			this.$axios.get('/aboutgov.txt')
				.then(response => {
					this.fileContent = response.data;
				})
		},
		mounted() {
			const get = this.$refs.getb.$refs;
			const two = get.aboutmenu1;
			two.style.backgroundColor = 'orange';
			document.getElementById("about").style.color="orange";
		}
	}
</script>

<style scoped>
	#about {
		color: orange;
	}
</style>
<style scoped>
	.aboutmenu1 {
		background-color: orange;
	}
</style>