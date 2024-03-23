module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{html,css,ttf,png,svg,js,json,md}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};