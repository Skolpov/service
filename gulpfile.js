let project__folder = require('path').basename(__dirname);
let source__folder = '#src';

let fs = require('fs');

let path = {
	build: {
		html: project__folder + '/',
		css: project__folder + '/css/',
		js: project__folder + '/js/',
		img: project__folder + '/img/',
		fonts: project__folder + '/fonts/'
	},
	src: {
		html: [source__folder + '/*.html', '!' + source__folder + '/_*.html'],
		css: source__folder + '/scss/style.scss',
		js: source__folder + '/js/script.js',
		img: source__folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		fonts: source__folder + '/fonts/*.ttf'
	},
	watch: {
		html: source__folder + '/**/*.html',
		css: source__folder + '/scss/**/*.scss',
		js: source__folder + '/js/**/*.js',
		img: source__folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		fonts: source__folder + '/fonts/*.ttf'
	},
	clean: './' + project__folder + '/'
}

const fileinclude = require('gulp-file-include');
const { src, dest } = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const group_media = require('gulp-group-css-media-queries');
const clean_css = require('gulp-clean-css');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const webphtml = require('gulp-webp-html');
const svgSprite = require('gulp-svg-sprite');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');




function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: './' + project__folder + '/'
		},
		port: 3000,
		notify: false
	})
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(scss({ outputStyle: 'expanded' }))
		.pipe(group_media())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 versions'],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 70, progressive: true }),
				imagemin.optipng({ optimizationLevel: 3 }),
				imagemin.svgo({
					plugins: [
						{ removeViewBox: true },
						{ cleanupIDs: false }
					]
				})
			]))
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts))
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));

}

function fontsStyle(params) {
	let file_content = fs.readFileSync(source__folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source__folder + '/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source__folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}

function cb() { }


function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
}

function clean(params) {
	return del(path.clean);
}


// НЕЗАВИСИМЫЕ ЗАДАЧИ

gulp.task('otf2ttf', function () {
	return gulp.src([source__folder + '/fonts/*.otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest([source__folder + '/fonts/']));
});

gulp.task('svgSprite', function () {
	return gulp.src([source__folder + '/iconsprite/*.svg'])
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../icons/icons.svg',
					example: true
				}
			},
		})
		)
		.pipe(dest(path.build.img))
});




let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

