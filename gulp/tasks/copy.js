
module.exports = function () {

	$.gulp.task('copy', function() {
		return $.gulp.src([
			'fonts/**/*.woff',
			'fonts/**/*.woff2',
			'fonts/**/*.ttf',
			'fonts/**/*.eot',
			'img/**',
			'*.html'
		], {
			base: '.'
		})
			.pipe($.gulp.dest('build'));
		});

};

