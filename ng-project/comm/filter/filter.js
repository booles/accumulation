define(["app"], function(app) {

  app.
  filter("paddingSrc",function (){
     return function (paddingSrc){
          return paddingSrc ? paddingSrc : "http://app.gomein.net.cn/images/grey.gif";
     }     
  });
})
