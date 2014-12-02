var gulp = require("gulp"),
    concat = require('gulp-concat'),
    glify = require('gulp-uglify'),
    glifyCss = require("gulp-minify-css"),
    changed = require('gulp-changed'), //只为当前有改变的压缩
    walk = require("walk");

var pathJs =  pathCss = "./lib/";

var num = 0;

walker = walk.walk(pathCss, {
    followLinks: false
  });

var fileNameCss,fileNameJs,jsonCss=[],jsonJs = [];

gulp.task("watch",function (){
      var fileTypeCss = ".css";
      if(jsonCss.length != 0){
        for(var i=0,jsonCss1 = jsonCss;i<jsonCss1.length;i++){
           dress(pathCss,pathCss+jsonCss1[i]+fileTypeCss,jsonCss1[i],fileTypeCss);
        };
      };
      var fileTypeJs = ".js";
      if(jsonJs.length != 0){
        for(var i=0,jsonJs1 = jsonJs;i<jsonJs1.length;i++){
          dress(pathJs,pathJs+jsonJs1[i]+fileTypeJs,jsonJs1[i],fileTypeJs);
        };
      };
});
function dress(path,dresstask,file,fileType){
     gulp.watch(dresstask,[file]);
      gulp.task(file,function (){
        if(fileType === ".css"){
          return  gulp.src(path+file+fileType).
                  pipe(glifyCss()).
                  pipe(concat(file+".min"+fileType)).
                  pipe(gulp.dest(path));
            }else{
              return  gulp.src(path+file+fileType).
                      pipe(glify()).
                      pipe(concat(file+".min"+fileType)).
                      pipe(gulp.dest(path));
            };
      });
};
gulp.task("default",function (){

  walker.on("file",function (root,fileStats,next){    //扫描整个文件

    fileName = fileStats.name;

    var resJsCss = /(.js|.css)$/g;
    var minJsCss = /(.min.js|.min.css)$/g;

    var indexJs = fileName.indexOf(".js");
    var indexCss = fileName.indexOf(".css");

    if(resJsCss.test(fileName) && !minJsCss.test(fileName)){   //排除包含.min.js 和.min.css的文件
       if(indexCss != -1){    //针对css文件
          fileNameCss = fileName.slice(0,indexCss);  //获取不包含后缀名
         jsonCss.push(fileNameCss);                  //放在数组中以便监控
         uglifyAll(fileNameCss,".css");              //首先要压缩文件1，文件名 2，类型
       }else if(indexJs != -1){ //针对js文件
          fileNameJs = fileName.slice(0,indexJs);
          jsonJs.push(fileNameJs);
          uglifyAll(fileNameJs,".js");
       }
    };
    next();
  });    
});

var jsons;

function uglifyAll(jsonJs1Item,stypes){
     //创建压缩js，css任务 
    gulp.task(jsonJs1Item,function (){

        if(stypes == ".js"){
          return  gulp.src(pathJs+jsonJs1Item+".js").
                  pipe(glify()).
                  pipe(concat(jsonJs1Item+".min.js")).
                  pipe(gulp.dest(pathJs));  
        }else {
          return  gulp.src(pathCss+jsonJs1Item+".css").
                  pipe(glifyCss()).
                  pipe(concat(jsonJs1Item+".min.css")).
                  pipe(gulp.dest(pathCss));  
        };
    });
    
    gulp.start(jsonJs1Item);   //触发每个任务
    gulp.start("watch");       //压缩完成开始watch每个文件
}