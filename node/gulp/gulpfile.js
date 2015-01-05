var gulp = require('gulp');


var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');   //集成了http-server

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

var watchMap = ["./src/a.js","./src/b.js"];


gulp.task("js",function (){
	gulp.src(watchMap).
	pipe(uglify()).
	pipe(concat("ab.min.js")).
	pipe(gulp.dest("build")).
	pipe(connect.reload());	
});

gulp.task('watch', function () {
   gulp.watch(watchMap, ['js']);
});

//监控html

gulp.task('watchHtml', function () {
   gulp.watch("./gulp.html",function (){
   		connect.reload();	
   });
});

gulp.task('default',function (){
		gulp.start(["js","connect","watch","watchHtml"]);
});
