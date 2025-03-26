<template>
	<div class="common-layout">
		<el-container>
			<el-header class="header" height="75px">
				<Headermy></Headermy>
			</el-header>
			<el-main class="full-height">
				<div style="justify-content: center; display:flex">
					<h1 class="content">互动交流中心</h1>
				</div>
				<div style="width: 100%; height: 20px;background-color: aquamarine;text-align: center;">
					<span id="mymsg"></span><button text class="button" @click="loginOrlogout"
						id="loginOrlogout"></button>
				</div>
				<transition name="fade">
					<div class="popup" v-if="showPopup">
						<el-button @click="close"
							style="padding: 0px;background-color: white;border: none;float: right;">
							<img src="../../public/close.webp" height="20px">
						</el-button>
						<h3>登录</h3>
						电话号码：<el-input v-model="phoneNumber" placeholder="请输入电话号码" :clearable="true"
							:on-icon-click="handlePhoneClear" :maxlength="11" :show-word-limit="true"
							:rules="phoneRules" type="number"></el-input>
						密码：<el-input v-model="password" placeholder="请输入密码" :type="showPassword ? 'text' : 'password'"
							:clearable="true" :show-password="true"></el-input>
						<el-button @click="login()">登录</el-button><br><br>
						<el-button @click="togglePasswordVisibility">没有账户？注册</el-button>
					</div>
				</transition>
				<el-row style="height: 600px;">
					<!-- 左边一半 -->
					<el-col :span="12" class="main" style="height: 100%; ">
						<!-- 第一部分内容 -->
						<div class="one">
							<div class="show">
								<p>问</p>
								<p>答</p>
								<p>精</p>
								<p>选</p>
							</div>
							<el-scrollbar height="98%" style="margin: 10px;">
								<div v-for="item in good" :key="item" class="scrollbar-demo-item"
									style="height: 200px;display:block; color: orange; background-color: aquamarine;border-radius: 10px; font-family: '幼圆', YouYuan, STYuanti-SC-Regular, ', Arial, sans-serif;">
									<el-row>
										<el-col :span="12" style="height: 100%;">
											<div style="height: 100px;width: 100%; border-bottom: 1px solid seagreen;">
												标题：<br />{{item.topicType}}
											</div>
											<div style="height: 100px;width: 100%;display:inline-block;">
												<el-scrollbar style="height: 100%; width: 100%;">
													<div style="height: 100%; word-wrap: break-word;">
														正文：<br />
														{{item.content}}
													</div>
												</el-scrollbar>
											</div>
										</el-col>
										<el-col :span="12" style="height: 100%; border-left: 1px solid seagreen;">

											<div style="height: 100px;width: 100%; border-bottom: 1px solid seagreen;">
												问答信息：<br />
												id：<br />
												{{item.id}}<br />
												发布时间：<br />
												{{item.createTime}}
											</div>
											<div style="height: 100px;width: 100%;">
												<el-scrollbar style="height: 100%; width: 100%;">
													<div style="height: 100%; word-wrap: break-word;">
														回复：<br />
														{{item.repContent}}
													</div>
												</el-scrollbar>
											</div>
										</el-col>
									</el-row>
								</div>
							</el-scrollbar>
						</div>
					</el-col>
					<!-- 右边一半 -->
					<el-col :span="12" style="height: 100%;">
						<el-row style="height: 100%;width: 100%;">
							<!-- 上半部分 -->
							<el-col :span="24" class="main" style="height: 50%;">
								<!-- 第二部分内容 -->
								<div class="one">
									<div class="show">
										<p>我</p>
										<p>的</p>
										<p>问</p>
										<p>答</p>
									</div>
									<el-scrollbar height="95%" style="margin: 10px;">
										{{msg}}
										<div v-for="item in myQuestion" :key="item" class="scrollbar-demo-item"
											id="myque"
											style="height: 200px;display:block; color: orange; background-color: aquamarine;border-radius: 10px; font-family: '幼圆', YouYuan, STYuanti-SC-Regular, ', Arial, sans-serif;">
											<el-row>
												<el-col :span="12" style="height: 100%;">
													<div
														style="height: 100px;width: 100%; border-bottom: 1px solid seagreen;">
														标题：<br />{{item.topicType}}
													</div>
													<div style="height: 100px;width: 100%;display:inline-block;">
														<el-scrollbar style="height: 100%; width: 100%;">
															<div style="height: 100%; word-wrap: break-word;">
																正文：<br />
																{{item.content}}
															</div>
														</el-scrollbar>
													</div>
												</el-col>
												<el-col :span="12"
													style="height: 100%; border-left: 1px solid seagreen;">
													<div
														style="height: 100px;width: 100%; border-bottom: 1px solid seagreen;">
														问答信息：<br />
														id：<br />
														{{item.id}}<br />
														发布时间：<br />
														{{item.createTime}}
													</div>
													<div style="height: 100px;width: 100%;">
														<el-scrollbar style="height: 100%; width: 100%;">
															<div style="height: 100%; word-wrap: break-word;">
																回复：<br />
																{{item.repContent}}
															</div>
														</el-scrollbar>
													</div>
												</el-col>
											</el-row>
										</div>
									</el-scrollbar>
								</div>
							</el-col>
							<!-- 下半部分 -->
							<el-col :span="24" class="main" style="height: 50%;">
								<!-- 第三部分内容 -->
								<div class="one">
									<div class="show">
										<p>我</p>
										<p>要</p>
										<p>写</p>
										<p>信</p>
									</div>
									<div style="display:inline-flexbox; width: 100%;">
										<el-row>
											标题：
											<el-input v-model="input" style="width: 100%;" placeholder="请输入标题"
												show-word-limit maxlength="30" />
										</el-row>
										<el-row>
											<div>内容：</div>
											<el-input v-model="textarea" maxlength="200"
												style="width: 90%;margin-right: 5%;margin-left: 5%;" placeholder="请输入正文"
												show-word-limit type="textarea"
												:autosize="{ minRows: 3, maxRows: 5 }" />
										</el-row>
										<el-row>
											<el-button @click="submit()">提交</el-button>
										</el-row>
									</div>
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
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
				values: null,
				showPopup: false,
				phoneNumber: null,
				password: null,
				userid: null,
				good: "",
				myQuestion: "",
				msg: "",
				input: "",
				textarea: "",
				interval: 30000, // 定时器间隔，单位为毫秒
				timer: null // 定时器对象
			}
		},
		components: {
			Headermy,
			Footermy
		},
		mounted() {
			this.values = sessionStorage.getItem('name');
			this.userid = sessionStorage.getItem('id');
			var elementLogin = document.getElementById("mymsg");
			var elementbutton = document.getElementById("loginOrlogout");
			if (this.values == null) {
				elementLogin.innerHTML = "未登录,请登录:";
				elementbutton.innerText = "登录";
				this.msg = "没有登录,请登录后使用该功能!";
			} else {
				elementLogin.innerHTML = "欢迎您：" + this.values + "!";
				this.showmy();
				elementbutton.innerText = "注销";
				this.msg = "";
			}
			this.showgood();
			this.timer = setInterval(() => {
				// 执行你的函数
				this.updata();
			}, this.interval);
		},
		methods: {
			loginOrlogout(event) {
				let text = event.target.innerText
				if (text == "登录") {
					this.showPopup = true;

				} else {
					sessionStorage.removeItem('id');
					sessionStorage.removeItem('name');
					window.location.reload();
				}
			},
			close() {
				this.showPopup = false;
			},
			login() {
				if (this.phoneNumber != "" && this.password != "") {
					var param = {};
					param.phone = this.phoneNumber;
					param.password = this.password;

					this.$http3.post('/user/login', param)
						.then(response => {
							if (response.data.code == 0) {
								alert("用户名或密码错误");
							} else {
								sessionStorage.setItem('id', response.data.data.id);
								sessionStorage.setItem('name', response.data.data.name);
							}
							window.location.reload();
						})
						.catch(error => {
							console.log(error)
						})
				} else {
					alert("不能为空");
				}
			},
			showgood() {
				this.$http3.get('/comment/showgood', {})
					.then(response => {
						var data = response.data.data;
						this.good = data;
					})
					.catch(error => {
						console.log(error)
					})
			},
			showmy() {
				var url = '/comment/showself/' + this.userid;
				this.$http3.get(url, {})
					.then(response => {
						var data = response.data.data;
						this.myQuestion = data;
					})
					.catch(error => {
						console.log(error)
					})
			},
			submit() {
				if (this.values == null) {
					alert("没有登录，请完成登陆。")
				} else {
					var param = {};
					param.topicType = this.input;
					param.content = this.textarea;
					param.fromUid = this.userid;
					this.$http3.post('comment/userreply', param)
						.then(response => {
							var data = response.data.data;
							if (data == "发布评论成功") {
								alert("发布成功！请到我的问答查看");
								this.updata();
							} else {
								alert("发布失败！服务器错误")
							}
						})
						.catch(error => {
							console.log(error)
						})
				}

			},
			updata(){
				this.showgood();
				if(this.values != null)
				{
					this.showmy();
				}
			}
		},
		unmounted() {
			clearTimeout(this.timer); 
		}
	}
</script>

<style scoped>
	.full-height {

		display: flex;
		flex-direction: column;
	}

	.main {
		padding: 20px;
	}

	.one {
		border: 2px solid seagreen;
		height: 100%;
		width: 100%;
		border-radius: 20px;
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
		text-align: center;
		/* 确保弹出层在最上层 */
		/* 初始状态隐藏 */
	}

	.el-input {
		margin: 20px;
	}

	.show {
		float: left;
		background-color: orange;
		height: 100%;
		width: 60px;
		border-top-left-radius: 18px;
		border-bottom-left-radius: 18px;
		position: relative;
	}

	p {
		font-family: "幼圆", YouYuan, STYuanti-SC-Regular, "Microsoft YaHei", Arial, sans-serif;
		color: #fff;
		font-size: 20px;
	}

	.scrollbar-demo-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80px;
		margin: 10px;
		text-align: center;
		border-radius: 4px;
		background: var(--el-color-primary-light-9);
		color: var(--el-color-primary);
	}
</style>
<style>
	.button1 {
		border: none;
		margin: 0px;
		padding: 0px;
	}
</style>