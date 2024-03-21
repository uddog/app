module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{html,css,ttf,png,js,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};