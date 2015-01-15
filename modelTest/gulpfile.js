var gulp = require("gulp"),
	r = require("gulp-requirejs");

gulp.task("r",function (){
	r({
    baseUrl: "./js/",
    paths: {
        "jQuery": "./lib/jquery-1.7.1",
        "jquery.cookie": "./lib/jquery.cookie",
        "domReady": "./lib/domReady",
        "text": "./lib/text",
        "template": "./lib/template",

        "getCookie": "getCookie",
        "renderSearch": "renderSearch",

        "lists": "lists",
        "test":"test",


        "tools":"./tools/tools",

        "httpServer":"./tools/httpServer",

        "data":"data"
    },
    shim: {
        "jQuery": {
            "exports": "$"
        },
        "jquery.cookie": {
            "deps": ["jQuery"],
            "exports": "$.cookie"
        }

    },
    name: "./config",
    out: "main-built.js"
}).
	pipe(gulp.dest('./js-build/'));	
});

gulp.task("watch",function (){
    gulp.watch("./js/*.js",["r"]);
})


gulp.task("default",function (){
		gulp.start(["r","watch"]);	
});