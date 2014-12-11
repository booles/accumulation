define(['app'],function (app){
	app.
    controller('tabCtrl', ['$scope',"$http","$parse", function ($scope,$http,$parse) {
        $scope.orderlist = "tab";
    }]).    
    controller('orderCtrl', ['$scope',"$http","$route", "$routeParams",function ($scope,$http,$route,$routeParams) {
        $scope.orderlist = [];
        $scope.orderCommTop = "./modules/routeTpl/order/orderTpl/orderCommTop.html";
        $scope.init = function (){             
             $http.get("./a.json").success(function (data){
                var json = angular.fromJson(data);
               $scope.result = json.result; 
               $scope.orderlist =  json.result.orderlistResult.orderlist;
             });
        };
    }]).
    controller('dralogCtrl', ['$scope', function ($scope) {

        $scope.dralog = "draglog";
         $scope.init = function (){
             
             $http.get("./a.json").success(function (data){
                var json = angular.fromJson(data);
               $scope.tabCtrlVal = json.a;  
             });
        };
    }]).
    controller('todoLostCtrl', ['$scope', function ($scope) {

        $scope.todoList = "todoList";
        $scope.todosArray = [];         //保存项
        $scope.clearArray = [];         //要删除的项
        $scope.indexItem = [];

        $scope.clearLen = 0;

        $scope.todoKeydown = function (event){
            if(event.keyCode == 13){
                if( $scope.todoList == "") return;
                $scope.todosArray.push({
                    todoList:$scope.todoList,
                    selected:false
                });
                $scope.todoList = "";
            }
        };
        $scope.delectItem = function (index){
           $scope.todosArray.splice(index,1);           
        };
        $scope.selectedFn = function (index){
            $scope.todosArray[index].selected = !$scope.todosArray[index].selected;
            /*if($scope.todosArray[index].selected){
                $scope.clearArray.push($scope.todosArray[index]);    
            };*/

            angular.forEach($scope.todosArray, function (item,i){
                console.log(item.selected);
                if(item.selected){
                    $scope.clearLen++;
                };
                console.log($scope.clearLen);
            });       

            /*angular.forEach($scope.clearArray, function (item,i){
                if(!item.selected){
                    $scope.clearArray.splice(i,1);
                }    
            });     */       
        };

        $scope.clearAllFn = function (){
            $scope.clearArray = [];
        };
    }]);
});