<template>
	<div class="common-layout">
		<el-container>
			<el-header class="header" height="75px">
				<Headermy></Headermy>
			</el-header>
			<el-main>
				<div style="justify-content: center; display:flex">
					<h1 class="content">线路中心</h1>
				</div>
				<div id="selectnumber">
				</div>
				<div id="maps" style="width: 100%; height: 500px;"></div>
				<div style="height: 100px;">
					<span>线路编号：{{linemsg.lineNumber}}路</span><br />
					<div style="float: left;">
						<span>发车间隔：{{linemsg.interval}}分钟</span><br /><span>票价：{{linemsg.price}}元（RMB/￥）</span>
					</div>
					<div style="float:right;">
						<span>首班车时间：{{linemsg.startTime}}</span><br /><span>末班车时间：{{linemsg.endTime}}</span>
					</div>
				</div>
				<div style="border: orange 1px solid;text-align: center;">
					<h3 style="color: green;">站点与实时公交查询</h3>
					<table style="margin: auto; width: 100%;">
						<tr>
							<th><h4 style="color: green;">线路</h4></th>
							<th><h4 style="color: green;">站点</h4></th>
						</tr>
						<tr>
							<td>
								<select v-model="selectedOption" style="padding: 10px; margin: auto;border-radius: 5px"
									@change="changeLine()">
									<option :value="0">请选择线路</option>
									<option v-for="option in options" :key="option.value" :value="option.value">
										{{ option.label }}
									</option>
								</select>
							</td>
							<td>
								<select v-model="selectedOption2" style="padding: 10px; margin: auto;border-radius: 5px"
									@change="changeStation()">
									<option :value="0">请选择站点</option>
									<option v-for="option in options2" :key="option.value" :value="option.value">
										{{ option.label }}
									</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>
								<el-row>
									<el-col :span="16" style="border: orange 1px solid;">
										<p id="show0tatol"></p>
										<div id="lineshow0"></div>
									</el-col>
									<el-col :span="16" style="border: orange 1px solid;">
										<p id="show1tatol"></p>
										<div id="lineshow1"></div>
									</el-col>
								</el-row>
							</td>
							<td>
								<h5 style="color: green;">可换乘线路</h5>
								<div id="showStation" style="display: flex; text-align: center;"></div>
							</td>
						</tr>
						<tr>
							<h5 style="color: green;">实时公交站点信息</h5><div id="time" style="text-align: center;margin: auto;"></div>
						</tr>
					</table>
				</div>
			</el-main>
			<el-footer>
				<Footermy></Footermy>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	/* eslint-disable */
	import Headermy from '../components/HeadComponent.vue'
	import Footermy from '../components/footerComponent.vue'
	export default {
		data() {
			return {
				map: null, // 地图实例
				points: [],
				totalDistance: 0, // 总路程
				totalDuration: 0, // 总时间
				convertedTime: 0,
				convertedSeconds: 0,
				linemsg: "",
				selectedOption: 0,
				options: [],
				selectedOption2: 0,
				options2: [],
				timer: "",
				run0: [],
				run1: []
			}
		},
		components: {
			Headermy,
			Footermy,
		},
		mounted() {
			this.initMap(103.948373, 30.808308);
			this.showline();
			this.init();
			this.timer = setInterval(() => {
				this.check();
			}, 5000);
		},
		beforeDestroy() {
			 clearInterval(this.timer);
		},
		watch: {
			selectedOption2(newValue, oldValue) {
				if (this.selectedOption2 == 0) {
					return;
				}
				var param = {};
				param.StationId = this.selectedOption2;
				this.$http2.get('/line1/getNumberBystation', {
						params: param
					}).then(response => {
						var data = response.data;
						let div = document.getElementById('showStation');
						for (var i = 0; i < data.length; i++) {
							let newdiv = document.createElement("div");
							newdiv.className = "stationdiv";
							newdiv.innerHTML = "<p>" + data[i] + "</p>";
							div.appendChild(newdiv);
						}
					})
					.catch(error => {
						console.log(error);
					});
			}
		},
		methods: {
			macth(){
				var a=1;
				for(a;a<=this.options2.length;a++){
					if(this.options2[a-1].value==this.selectedOption2){
						break;
					}
				}
				return a;
			},
			check() {
				if (this.selectedOption != 0) {
					var param = {};
					param.line = this.selectedOption;
					this.$http4.get('/linebusdriver/getAllByLine', {
							params: param
						}).then(response => {
							var data = response.data;
							let show0 = document.getElementById('lineshow0');
							while (show0.firstChild) {
								show0.removeChild(show0.firstChild);
							}
							let show1 = document.getElementById('lineshow1');
							while (show1.firstChild) {
								show1.removeChild(show1.firstChild);
							}
							this.run0 = [];
							this.run1 = [];
							for (var num = 0; num < data.length; num++) {
								if (data[num].status != 0 && data[num].standbystate != 0) {
									if (data[num].direction == 0) {

										let a = data[num];
										let newtable = document.createElement('table');
										newtable.innerHTML = "<tr><th>车牌号</th><th>当前位置</th><th>司机</th></tr>" +
											"<tr><td>" + a.busNumber + "</td>" + "<td>" + this.options2[data[num]
												.localStation - 1].label + "</td>" + "<td>" + a.driverName +
											"</td></tr>";
										show0.appendChild(newtable);
										this.run0.push(data[num].localStation);
									} else {
										let newtable = document.createElement('table');
										let a = data[num];
										newtable.innerHTML = "<tr><th>车牌号</th><th>当前位置</th><th>司机</th></tr>" +
											"<tr><td>" + a.busNumber + "</td>" + "<td>" + this.options2[data[num]
												.localStation - 1].label + "</td>" + "<td>" + a.driverName +
											"</td></tr>";
										show1.appendChild(newtable);
										this.run1.push(data[num].localStation);
									}
								}
							}
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					let show0 = document.getElementById('lineshow0');
					while (show0.firstChild) {
						show0.removeChild(show0.firstChild);
					}
					let show1 = document.getElementById('lineshow1');
					while (show1.firstChild) {
						show1.removeChild(show1.firstChild);
					}
				}
				if (this.selectedOption != 0 && this.selectedOption2 != 0) {
					let time = document.getElementById('time');
					while (time.firstChild) {
						time.removeChild(time.firstChild);
					}
					var x=-1;
					var key0=0;
					for(var i=0;i<this.run0.length;i++){
						x=this.macth()-this.run0[i];
						if(x>=0){
							key0=1;
							break;
						}
					}
					console.log(x);
					if(key0==1){
						let newshow = document.createElement('div');
						newshow.innerText="该线路正向到达该站点还有"+x+"站";
						time.appendChild(newshow);
					}else{
						let newshow = document.createElement('div');
						newshow.innerText="正方向等待首发站发车";
						time.appendChild(newshow);
					}
					var y=-1;
					var key1=0;
					for(var i=0;i<this.run1.length;i++){
						y=this.run1[i]-this.macth();
						if(y>=0){
							key1=1;
							break;
						}
					}
					if(key1==1){
						let newshow = document.createElement('div');
						newshow.innerText="该线路反向到达该站点还有"+y+"站";
						time.appendChild(newshow);
					}else{
						let newshow = document.createElement('div');
						newshow.innerText="反方向等待首发站发车";
						time.appendChild(newshow);
					}
				}
			},
			changeLine() {
				if (this.selectedOption != 0) {
					setTimeout(() => {
						document.getElementById("show0tatol").innerText = this.options2[0].label + "——>" + this
							.options2[this.options2.length - 1].label;
						document.getElementById("show1tatol").innerText = this.options2[this.options2.length - 1]
							.label + "——>" + this.options2[0].label;
						this.check();
					}, 1000);
					var param = {};
					param.number = this.selectedOption;
					this.$http2.get('/line1/getSationByNumber', {
							params: param
						}).then(response => {
							var data = response.data;
							this.options2 = [];
							for (var num = 0; num < data.length; num++) {
								var a = {};
								a.value = data[num].id;
								a.label = data[num].name;
								this.options2.push(a);
							}
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					document.getElementById("show0tatol").innerText = "";
					document.getElementById("show1tatol").innerText = "";
					this.check();
					this.$http2.get('/station/getStationAll', {
							params: param
						}).then(response => {
							var data = response.data;
							this.options2 = [];
							for (var num = 0; num < data.length; num++) {
								var a = {};
								a.value = data[num].id;
								a.label = data[num].name;
								this.options2.push(a);
							}
						})
						.catch(error => {
							console.log(error);
						});
				}
			},
			changeStation() {
				if (this.selectedOption2 != 0) {
					var param = {};
					param.StationId = this.selectedOption2;
					this.$http2.get('/line1/getNumberBystation', {
							params: param
						}).then(response => {
							var data = response.data;
							this.options = [];
							for (var num = 0; num < data.length; num++) {
								var a = {};
								a.value = data[num];
								a.label = "线路" + data[num];
								this.options.push(a);
							}
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					var param = {};
					this.$http2.get('/line1/total', {
							params: param
						}).then(response => {
							var data = response.data;
							this.options = [];
							for (var num = 0; num < data.length; num++) {
								var a = {};
								a.value = data[num];
								a.label = "线路" + data[num];
								this.options.push(a);
							}
						})
						.catch(error => {
							console.log(error);
						});
				}
			},
			init() {
				var param = {};
				this.$http2.get('/line1/total', {
						params: param
					}).then(response => {
						var data = response.data;
						this.options = [];
						for (var num = 0; num < data.length; num++) {
							var a = {};
							a.value = data[num];
							a.label = "线路" + data[num];
							this.options.push(a);
						}
					})
					.catch(error => {
						console.log(error);
					});
				this.$http2.get('/station/getStationAll', {
						params: param
					}).then(response => {
						var data = response.data;
						this.options2 = [];
						for (var num = 0; num < data.length; num++) {
							var a = {};
							a.value = data[num].id;
							a.label = data[num].name;
							this.options2.push(a);
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			initMap(a, b) {
				this.map = new BMap.Map("maps"); // 创建地图实例
				this.map.centerAndZoom(new BMap.Point(a, b), 14); // 设置地图的中心点和缩放级别
				const zoomControl = new BMap.NavigationControl();
				this.map.addControl(zoomControl);
				// 标记所有地点
				this.points.forEach(point => {
					const marker = new BMap.Marker(point.point); // 创建标记点
					this.map.addOverlay(marker); // 将标记点添加到地图上
					const label = new BMap.Label(point.name, {
						offset: new BMap.Size(20, -10)
					}); // 创建标记点的标签
					marker.setLabel(label); // 设置标记点的标签
				});
			},
			searchRoute() {
				const driving = new BMap.DrivingRoute(this.map, {
					onSearchComplete: this.onRouteSearchComplete
				}); // 创建驾车路线规划实例
				for (let i = 0; i < this.points.length - 1; i++) {

					driving.search(this.points[i].point, this.points[i + 1].point); // 调用驾车路线规划的search方法查询每段路线
				}
			},
			onRouteSearchComplete(result) {
				if (result.getNumPlans() > 0) { // 判断是否有规划方案
					const plan = result.getPlan(0); // 获取第一个规划方案
					const route = plan.getRoute(0); // 获取规划方案中的第一条路线
					const path = route.getPath(); // 获取路线的路径点数组
					const polyline = new BMap.Polyline(path, {
						strokeColor: "blue",
						strokeWeight: 6,
						strokeOpacity: 0.5
					}); // 创建折线，并设置样式
					this.map.addOverlay(polyline); // 将折线添加到地图上显示

					this.totalDistance += route.getDistance(false); // 获取路线的总路程，单位为米
					this.totalDuration += plan.getDuration(false);
				}
			},
			showline() {
				this.$http2.get('/line1/total')
					.then(response => {
						// 在这里处理后端返回的数据
						const buttonContainer = document.getElementById('selectnumber');
						let buttonCount = 0;
						response.data.forEach(number => {
							const button = document.createElement('button');
							button.textContent = number;
							button.className = 'linebutton';
							button.addEventListener('click', () => {
								// 点击按钮后的操作
								this.selectline(number);
								this.getlinemsg(number);
							});
							buttonCount++;
							buttonContainer.appendChild(button);
							if (buttonCount % 3 === 0) {
								const lineBreak = document.createElement('br');
								buttonContainer.appendChild(lineBreak);
							}
						});
					})
					.catch(error => {
						console.error('Error fetching data: ', error);
					});
			},
			getlinemsg(num) {
				var param = {};
				param.id = num
				this.$http4.get('/linemsg/getMsgByLine', {
					params: param
				}).then(res => {
					this.linemsg = res.data;
				})
			},
			selectline(num) {
				var param = {};
				param.number = num;
				this.initMap();
				this.$http2.get('/line1/getSationByNumber', {
						params: param
					})
					.then(response => {
						let data = response.data
						this.points = data.map(item => {
							let a = {}; // 初始化对象
							a.name = item.name;
							a.point = new BMap.Point(item.longitude, item.latitude);
							return a;
						});
						//this.initMap(103.948373,30.808308);
						console.log(data);
						this.initMap(this.points[1].point.lng, this.points[1].point.lat); // 初始化地图
						this.searchRoute();
					})
					.catch(error => {
						console.log(error)
					})
			}
		}
	}
</script>

<style scoped>
	#selectnumber {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	td {
		width: 150px;
	}
</style>
<style>
	.linebutton {
		width: 100px;
		background-color: aquamarine;
		border: 1px #056900 solid;
		margin-left: 50px;
		margin-right: 50px;
	}

	td {
		width: 150px;
	}

	.stationdiv {
		width: 50px;
		height: 50px;
		margin: auto;
		background-color: orange;
		border-radius: 10px;
	}
</style>