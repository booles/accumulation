define(['app'],function (app){
	app.
    controller('tabCtrl', ['$scope', function ($scope) {
        $scope.tabCtrl = "tabCtrl";
    }]).
    controller('todoLostCtrl', ['$scope', function ($scope) {
        $scope.todoList = "todoList";
        $scope.todosArray = [];
        $scope.clearArray = [];
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
            }else{
                console.log($scope.clearArray.splice(index,1));
            };

            //console.log($scope.clearArray);
            
        };
    }]);
});