
myApp.controller("todoMVC",["$scope","$location","$routeParams","$filter","todoStorage",function (scope,location,routeParams,filterFilter,todoStorage){
	
	//获取本地存储
	var todos = scope.todos = todoStorage.get();
		//刚加载讲newTodo清空
		scope.newTodo = '';

		scope.editedTodo = null;

		scope.$watch("todos",function(newVal,oldVal){

				 // 获取未完成的todos的数目,参考：http://docs.angularjs.org/api/ng/filter/filter
		        scope.remainingCount = filterFilter('filter')(todos, { completed: false }).length;
		        // 获取已完成的todos的数目
		        scope.completedCount = todos.length - scope.remainingCount;
		        // 当且仅当$scope.remainingCount为0时，$scope.allChecked为true
		        scope.allChecked = !scope.remainingCount;

				//当输入的值与之前的不相等时，存入
				if(newVal !== oldVal ){
					todoStorage.put(todos);
				}
		},true); //$watch 的第三个参数是干啥用的？？

		//添加项目
		scope.add = function (){
			var newTodo = scope.newTodo.trim();

			if(!newTodo.length) return;

			todos.push({
				title:newTodo,
				complate:false
			});

			scope.newTodo = "";
		};


		if(location.path() === "/"){
			 location.path('/');
		};

		scope.location = location;

		// 当location.path()的值改变时执行其中的方法
    scope.$watch('location.path()', function (path) {
        // 获取状态的过滤器
        // 如果path为'/active'，过滤器为{ completed: false }
        // 如果path为'/completed'，过滤器为{ completed: true }
        // 否则，过滤器为null
        scope.statusFilter = (path === '/active') ?
            { completed: false } : (path === '/completed') ?
            { completed: true } : null;
    });

   	

		

		//删除项目

		scope.removeTodo = function (todo){
			todos.splice(todos.indexOf(todo),1);	
		};

		//编辑项目
		scope.editTodo = function (todo){
			scope.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        // 保存编辑前的todo，为恢复编辑前做准备
        	scope.originalTodo = angular.extend({}, todo);
		};
		//编辑失去焦点
		scope.doneEditing = function (todo){
			scope.editedTodo = null;
			todo.title = todo.title.trim();
			if(!todo.title){
				scope.removeTodo(todo);
			}	
		};

		//

		scope.revertEditing = function (todo){
			scope.todos[scope.todos.indexOf(todo)] = scope.originalTodo;
			scope.doneEditing(scope.originalTodo);	
		};


}]);