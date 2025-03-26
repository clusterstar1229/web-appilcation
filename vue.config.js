const {
	defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true
})
module.exports = {
	configureWebpack: {
		resolve: {
			fallback: {
				util: require.resolve('util/'),
				path: require.resolve('path-browserify')
			}
		}
	},
	devServer: {
		port: 3030, // 启动端口号
		open: true, // 启动后是否自动打开网页
		proxy: {
			"/static": {
				target: "http://120.26.211.53:6060",
				changeOrigin: true,
			}
		},
	}
}