
module.exports = function () {
	$.gulp.task('serve', function() {
		$.browserSync.init({
			server: 'build/',
			port: 5500,
			open :'fe80::a19f:2896:da95:a185%13'
		});

		$.gulp.watch('sass/**/*.scss', $.gulp.series('sass'));
		$.gulp.watch('*.html', $.gulp.series('html'));
		$.gulp.watch('js/**/*.js', $.gulp.series('scripts'));
		$.gulp.watch('img/**/*.{png, jpg, svg}', $.gulp.series('allimg'));
	});
};

