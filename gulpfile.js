global.$ = {
	gulp: require('gulp'),
	gp: require('gulp-load-plugins')(),
	browserSync: require('browser-sync').create(),
	del: require('del'),
	path: {
		config: require('./gulp/config.js'),
		jquery: './js/jquery.js',
		js: './js/**/*.js',
	}
};

$.path.config.forEach(function (path) {
	require(path)();
});
