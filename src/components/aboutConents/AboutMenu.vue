<template>
	<el-row :gutter="20">
		<el-col :span="6" class="aboutmenu1">
			<div ref="aboutmenu1" class="menudiv"><a class="go"><a href="/about" class="skip">公司简介</a></a></div>
		</el-col>
		<el-col :span="6" class="aboutmenu2">
			<div ref="aboutmenu2" class="menudiv"><a class="go"><a href="/corporation" class="skip">公司理念</a></a></div>
		</el-col>
	</el-row>
	<hr>
</template>

<script>
	export default {
		data() {
			return {
				fileContent: ''
			}
		},
		methods: {},
		created() {
			this.$axios.get('/aboutgov.txt')
				.then(response => {
					this.fileContent = response.data;
				})
		}
	}
</script>

<style>
	.el-row {
		margin-bottom: 20px;
		z-index: 0;
		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
	}

	.el-row:last-child {
		margin-bottom: 0;
	}

	.el-col {
		border-radius: 4px;
	}

	.aboutmenu1,
	.aboutmenu2 {
		margin: 10px;
	}

	.go {
		display: block;
		width: 100%;
		flex: 1;
	}

	.content {
		text-align: center;
		position: relative;
		width: 50%;
	}
	
	.menudiv{
		border-radius: 5px;
	}
	.menudiv:hover{
		background-color: orange;
	}

	.content::after {
		content: "";
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(to right, orange, green);
	}
</style>