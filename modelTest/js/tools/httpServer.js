define(["jQuery","data"],function ($,data){

	var datas = data.data;

	//模拟的数据
	var arr = [
        ["a", "b", "c"],
        [1, "a", "b"],
        ["wang", "haozi", "lala"],
        ["123", "4444444", "555555555"],
        ["6666", "888", "999"]
    ];

	var httpServer = function (){
			
	};

	httpServer.prototype.listServer = function (data,callBack){
		 setTimeout(function() {
            if(callBack) callBack(datas);
        }, 1000);
	};


	return {
		httpServer: new httpServer()
	}


});