module.exports = {
	devServer: {
		https: true,
		publicPath: '/',
		historyApiFallback: true,
		stats: 'errors-only',
		disableHostCheck: true,
		port: 9002,
		proxy: [{
			path: '/api',
			target: 'https//localhost:9001',
		}]
	}
}