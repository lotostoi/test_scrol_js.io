const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const rename = require ('gulp-rename');
const sass = require ('gulp-sass');

const cssFiles = ['./node_modules/normalize.css/normalize.css',
   // './src/css/header.css',
    './src/css/style.min.css'
  
];


function GitHtml () {
    return gulp.src('./*.html')
        .pipe(gulp.dest('./ForGithub'));   
}

function GitCSS() {
    return gulp.src('./build/css/**/*.css')
        .pipe(gulp.dest('./ForGithub/build/css'));  
}

function GitJS () {
    return gulp.src('./build/js/**/*.js')
        .pipe(gulp.dest('./ForGithub/build/js')); 
}

function GitSCSS () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(gulp.dest('./ForGithub/build/scss'));
}
function img () {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('./build/img/'));
}


function styles() {
    return gulp.src(cssFiles)
        .pipe(concat('all.css'))
        .pipe(autoprefixer({
            "overrideBrowserslist": ["> 0.1%"],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
        
}

function scss() {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass({
			errorLogToConsole: true,
			//outputStyle: 'compressed'
			outputStyle: 'expanded'
		}))
		.on('error', function(error) {
			// у нас ошибка
			done(error);})
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
}


function scripts() {
    return gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());   
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./src/scss/**/*.scss', scss);
    gulp.watch('./src/js/**/*.js', scripts);
}

function clean() {
    return del(['build/*']);
}

function cleanGit() {
    return del(['ForGithub/*']);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('scss', scss);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts, scss, img)));
gulp.task ('dev', gulp.series('build', 'watch'));   


gulp.task('GitHtml', GitHtml);
gulp.task('GitCSS', GitCSS);
gulp.task('GitJS', GitJS);
gulp.task('GitSCSS', GitSCSS);
gulp.task('img', img);

gulp.task('Git', gulp.series(cleanGit,GitHtml,GitCSS,GitJS,GitSCSS));