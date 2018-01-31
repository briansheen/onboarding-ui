const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');

const htmlSources = ['src/html/*.html'];
const scssSources = ['src/scss/*.scss'];

gulp.task('hello', function(){
  console.log('Hello World!');
});

/*gulp.task('readHtml', function(){
  console.log("in readHtml");
  fs.readFile(path.resolve("./src/html/index.html"), function(err, data){
    if(err){
      throw err;
    }
    htmlFile = data;
  });
});

gulp.task('readCss', function(){
  console.log("in readCss");
  fs.readFile(path.resolve("./src/css/style.css"), function(err, data){
    if(err){
      throw err;
    }
    cssFile = data;
  });
});*/

gulp.task('server', function(){
  connect.server({
    port: 9000,
    livereload: true,
    root: ['./prod']
    /*middleware: function(connect, opt){
      return [function(req, res){
        switch(req.url){
          case "/style.css" :
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            res.write(cssFile);
            break;
          default :
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(htmlFile);
        }
        res.end();
      }]
    }*/
  });
});

gulp.task('html', function(){
  gulp.src('src/html/*.html')
    .pipe(gulp.dest('./prod'))
    .pipe(connect.reload());
});

gulp.task('sass', function(){
  gulp.src(scssSources)
    .pipe(sass())
    .pipe(gulp.dest('./prod/css'))
    .pipe(connect.reload());
});

gulp.task('watch',function(){
  gulp.watch(htmlSources,['html']);
  gulp.watch(scssSources,['sass']);
});

gulp.task('dev', ['html','sass','server','watch']);
