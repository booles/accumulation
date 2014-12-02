var cartUnit_Url = "http://www.gome.com.cn/ec/homeus/browse/provinceDroplet.jsp";

angular.module("getDataModule",[]).
	service("getData",["$http",function ($http){
		var dataFactory;
			dataFactory =  {
				getDataFn:function (optionsConfig){

					var defaultCongfig = {
						method:"get",
						params:{},
					};
					angular.extend(defaultCongfig,optionsConfig);

					if(!defaultCongfig.params["params"]) {
						defaultCongfig.params.params = {};
						defaultCongfig.params.params.time = new Date().getTime();
					};

					 params = {json:JSON.stringify(defaultCongfig.params)};

					var config = {
							method:defaultCongfig.method,
							url:defaultCongfig.url || cartUnit_Url,
							params:params
						};
					return $http({config});
				}
			};
		return dataFactory;
	}]).
	service('getInitData', ["getData",function (getData) {
		return {
			getInitDataFn:function (options){
					return getData.getDataFn({
							params:{

							}
					});
			}
		}
	}]).
	service('getCityHttp', ["getData",function (getData) {
		return {
			getCityFn:function (options){
				return 	getData.getDataFn(options);
			}
		}
	}]);



