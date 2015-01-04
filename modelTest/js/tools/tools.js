define(["jQuery","httpServer","test","lists"],function ($,httpServer,test,lists){

	(function($) {

	  var o = $({});

	  $.subscribe = function() {
	    o.on.apply(o, arguments);
	  };

	  $.unsubscribe = function() {
	    o.off.apply(o, arguments);
	  };

	  $.publish = function() {
	    o.trigger.apply(o, arguments);
	  };

	}($));


	$.subscribe("search:getData",function (){
		$("#select_value").attr("isarr");		
	});
	$.subscribe("search:changeAttr",function (event,data){
		$.each(data.data,function (index,item){
			item.element.attr(item.newAttr,item.element.attr(item.oldAttr));	
		})	
	});

	//改变元素真实的attr
	$.subscribe("search:changeAllAttr",function (){

		var arr = [
			{
				element:$("#select_value"),
				oldAttr:"arr",
				newAttr:"isarr"
			},
			{
				element:$("#leaveText"),
				oldAttr:"value",
				newAttr:"values"
			},
			{
				element:$("#leaveText"),
				oldAttr:"citycode",
				newAttr:"citycodes"
			}
		];

		$.publish("search:changeAttr",{data:arr});

		//data.element.attr(data.changeAttr,data.element.attr(data.oldAttr));
	});

	//点击搜索时重新渲染列表
	$.subscribe("search:list",function (event,data){
		$.publish("loading","show");
		httpServer.httpServer.listServer(data.num,function (respones){
			lists.renderList(respones.data);
			$.publish("loading");
		});
	});

	//显示隐藏loading
	$.subscribe("loading",function (event,data){
		if(data == "show"){
			$("#loading").show();
			$("#lists").hide();
		}else{
			$("#loading").hide();
			$("#lists").show();
		}
	});

	return {
		publish:$.publish
	}

})