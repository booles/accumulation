define(['app'],function (app){
	app.
    controller('tabCtrl', ['$scope', function ($scope) {
        $scope.tabCtrl = "tabCtrl";
    }]).
    controller('todoLostCtrl', ['$scope', function ($scope) {

        $scope.todoList = "todoList";
        $scope.todosArray = [];         //保存项
        $scope.clearArray = [];         //要删除的项
        $scope.indexItem = [];

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
            if($scope.todosArray[index].selected){
                $scope.clearArray.push($scope.todosArray[index]);    
            };

            angular.forEach($scope.clearArray, function (item,i){
                if(!item.selected){
                    $scope.clearArray.splice(i,1);
                }    
            })

            //console.log($scope.clearArray);
            
        };

        $scope.clearAllFn = function (){
            $scope.clearArray = [];
        };
    }]);
});