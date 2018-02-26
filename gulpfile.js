const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

const htmlSources = ['src/html/*.html'];
const scssSources = ['src/scss/*.scss'];
const jsSources = ['src/js/*.js'];

gulp.task('hello', function(){
  console.log('Hello World!');
});

gulp.task('server', function(){
  connect.server({
    port: 9000,
    livereload: true,
    root: ['./prod']
  });
});

gulp.task('html', function(){
  gulp.src(htmlSources)
    .pipe(gulp.dest('./prod'))
    .pipe(connect.reload());
});

gulp.task('sass', function(){
  gulp.src(scssSources)
    .pipe(sass())
    .pipe(gulp.dest('./prod/css'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
    return browserify({
        debug: true,
        entries: ['./src/js/homepage.js'],
        paths: ['./src/js', './node_modules'],
        cache: {},
        packageCache: {}
    }).transform(babelify)
        .bundle()
        .on('error', function (err) {
            gutil.log(err.toString());
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./prod/js'))
        .pipe(connect.reload());
});


gulp.task('watch',function(){
  gulp.watch(jsSources,['js']);
  gulp.watch(htmlSources,['html']);
  gulp.watch(scssSources,['sass']);
});

gulp.task('dev', ['js','html','sass','server','watch']);
