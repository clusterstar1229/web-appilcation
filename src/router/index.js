import {
	createRouter,
	createWebHistory
} from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import HelloView from '../views/helloView.vue'
import AboutView from '../views/aboutView.vue'
import About2View from '../views/about2View.vue'
import NewsView from '../views/newsView.vue'
import NewsDetailView from '../views/newsDetailView'
import LineView from '../views/lineView.vue'
import BulletinView from '../views/bulletinView.vue'
import APPloadView from '../views/apploadView.vue'
import ContactView from '../views/contactView'

const routes = [{
		path: '/',
		name: 'home',
		component: HelloView
		// children:[
		// 	{
		// 		path: '/about',
		// 		name:'about',
		// 		component:AboutView
		// 	}
		// ]
	},
	{
		path: '/about',
		name: 'about',
		component: AboutView,
	},
	{
		path: '/corporation',
		name: 'About2View',
		component: About2View
	},
	{
		path: '/news',
		name: 'news',
		component: NewsView,
	},
	{
		path: '/detail',
		name: 'detail',
		component: NewsDetailView,
	},
	{
		path: '/line',
		name: 'line',
		component: LineView,
	},
	{
		path: '/bulletin',
		name: 'bulletin',
		component: BulletinView,
	},
	{
		path: '/appload',
		name: 'appload',
		component: APPloadView,
	},
	{
		path: '/contact',
		name: 'contact',
		component: ContactView,
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router