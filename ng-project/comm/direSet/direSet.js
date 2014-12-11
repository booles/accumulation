define(["app"], function(app) {

  app.
  directive('customDirctive', [function () {
      return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs) {
          scope.textDire = "slider成功加载指令！";
        }
      };
  }]).   
  directive('contentDire', [function () {
      return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs) {
          scope.textContent = "textContent成功加载指令！";
        }
      };
  }]).
  directive('testDire', [function () {
    return {
      restrict: 'A',
      link: function (scope, iElement, iAttrs) {
          scope.test = "testDire";
      }
    };
  }]);
 
})
