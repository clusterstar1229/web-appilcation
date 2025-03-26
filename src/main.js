import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import axios from 'axios'
import zhCn from 'element-plus/es/locale/lang/zh-cn'


const app = createApp(App)
app.config.globalProperties.$axios= axios
// 创建axios实例
const api = axios.create({
  baseURL: 'http://120.26.211.53:8088' // 设置URL前缀
})
app.config.globalProperties.$http = api

const api2 = axios.create({
  baseURL: 'http://120.26.211.53:8089' // 设置URL前缀
})
app.config.globalProperties.$http2 = api2

const api3 = axios.create({
  baseURL: 'http://120.26.211.53:8080' // 设置URL前缀
})
app.config.globalProperties.$http3 = api3
const api4 = axios.create({
  baseURL: 'http://120.26.211.53:8090' // 设置URL前缀
})
app.config.globalProperties.$http4 = api4

app.use(router)
zhCn.el.pagination.total = '共' + `{total}` + '条新闻'
zhCn.el.pagination.goto = '跳至'
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')