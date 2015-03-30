define(["avalon","text!./allCheck.html"], function(avalon, allCheck) {
   avalon.templateCache.vvv = allCheck;
		 var model = avalon.define({
			        $id: "allCheck",
			        username: "司徒正美",
			        arr:["aaa","bbb","ccc"],
			        selected:["aaa"],
			        checkAllBool:true,
			        checkClick:function(){
			        	if(this.checked){
			        		model.selected = model.arr;
			        	}else{
			        		model.selected.clear();
			        	}
			        },
			        send:function (){
			        	console.log(model.selected);	
			        }
			});

		 model.checkAllBool = model.arr.length ===  model.selected.length;

		 model.selected.$watch("length",function (n){
		 	model.checkAllBool = n === model.arr.size();
		 });

  avalon.vmodels.root.allChecks = "vvv";

      
})
