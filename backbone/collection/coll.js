
var User = Backbone.Model.extend({
	initialize:function (option){
		console.log(option);
	}
});

/*Backbone.sync = function(method, model,options) {
	//console.log("123");
 	console.log(method,options);
 	console.log(model);
};*/

/*var user = new User();*/

var Coll = Backbone.Collection.extend({
	model:User,
	url:"/travel_api/comm/aviationcities"
});

var coll = new Coll();
//Backbone.emulateHTTP = true;
//Backbone.emulateJSON = true;

coll.create({data:{"airportsversions":""}},{"success":function (model,respones){
	console.log(respones);	
	coll.model.fist.set(respones);
}});