/*
		日历基本功能，能够前后切换月数

		比当前日期小，要做限制，并且不能切换到上个月
	*/

	/*
		options {}

			  id: String 		要放入的容器				必需的
		   limit: Boolean   	是否要做限制 默认false		不是必需的
		selected: Boolean   	是否选中初始结束区间 默认false	不是必需的
		initDate: String/Number 初始值 "Y-M-D" 默认当天		不是必需的
	  selectDate: String/Number 初始值 "Y-M-D" 选中的天 	不是必需的		存在时开始已initDate为开始
		 endDate: String/Number 结束时间 "Y-M-D" 默认当天   不必需的    	当为空时候，默认一年
		 dateNum: Number        生成列数  默认为2           不必需
		 delayed: Number        往后推的天数 默认0			不必要
	   clickDate: Function      点击某一项回调函数          不必要
	   direction: String        鼠标选中的方向   默认为positive（正） 不必要	negative（反）
	*/


	var tools = {
		getTotalDate:function (year,month){   //求得当月的天数
			return new Date(year,month,0).getDate();	
		},
		trans:function (timer){
			return timer.replace(/-+/g,"/");	
		},
		dateToNum:function (timer){
			return +(timer.replace(/[-/]+/g,""));	
		},
		addZore:function (time){
			return time<10 ? "0"+time : time;
		},
		addYMD:function (y,m,d){
			return y+"-"+tools.addZore(m)+"-"+tools.addZore(d);	
		}
	};

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


	var CustomData = function (){

		this.data = null,
		this.dateNum = 1;
		this.limit = true;
		this.initDate = "";
		this.endDate = "";
	};

	(function ($){

		$.fn.calendar = function (options){
			(new CustomData()).init(options);
		};	
			
	})(jQuery);

	CustomData.prototype = {
		init:function (options){
				var defaults = {
					id: "",
					limit: true,
					selected:false,
					initDate: "",
					selectDate:"",
					endDate: "",
					dateNum:2,
					delay:3,
					paddingEle: "",
					section:false,
					clickDate:function (){},
					direction:"positive"
				};
				//不改变定义的默认值
				this.defaults = $.extend({},defaults,options); 

				this.initDate = this.defaults.initDate || this.getToday().format;  //获取到初始月份
				this.selectDate = this.defaults.selectDate;
				this.endDate = this.defaults.endDate;
				this.limit = this.defaults.limit;
				this.selected = this.defaults.selected;
				this.paddingEle = this.defaults.paddingEle;

				this.clickDate = this.defaults.clickDate;

				this.section = this.defaults.section;

				this.delay = this.defaults.delay;	

				this.direction = this.defaults.direction;

				this.date = this.getCurrenTime(this.initDate);  //获取初始信息
				this.wholeHtml();  //生成一骨架
				this.createAppendHtml(this.date);   //生成日历列表
				this.events();	//添加事件	

		},
		getElement:function (){
			var parents = $("#"+this.defaults.id);
			return {
				parents:parents,
				calendar:parents.find(".calendar"),
				allOk:parents.find("td.ok")
			}	
		},
		events:function (){
			var that = this,
				getElement = that.getElement(),
				allOk = getElement.allOk;
			getElement.parents.find(".prevmonth").off("click").on("click",function (){
				that.prevmonth();	
			});
			getElement.parents.find(".nextmonth").off("click").on("click",function (ev){
				that.nextmonth();
			});

			function section(index,ble){  //ble为true时，为添加red
				if(ble){
					if(this.direction){
						if(that.direction == "positive") {
							console.log("123");
							allOk.slice(0,index).addClass("red");
						}else if(that.direction == "negative") {
							console.log("22222");
							allOk.slice(index,40).addClass("red");
						}
					}
				}else{
					allOk.slice(0,index).removeClass("red");
				}
			};

			getElement.parents.off("mouseover mouseout click").on({
				"mouseover":function (){
					$(this).addClass("select");
					if(that.section) section($(this).attr("data-num"),true);
				},
				"mouseout":function (){
					$(this).removeClass("select");
					if(that.section) section($(this).attr("data-num"));
				},
				"click":function (){
					var time = $(this).attr("time"),
						timer = that.delayDate(time,that.delay);
						that.paddingEle.val(time);
					
					if(that.clickDate) that.clickDate($(this),time,timer);
				}
			},"td.ok").off("mouseleave").on("mouseleave",function (){
				if(that.section){

				}
			});
		},
		wholeHtml:function (){
			var parents = this.getElement().parents,
				n = this.defaults.dateNum,
				html = '<div class="calendar">\
				        <div class="bigcalendar_title clearfix">\
				            <a class="prevmonth" style="display: none;">-</a>\
				            <span class="title"></span>\
				            <a class="nextmonth"> + </a>\
				        </div>\
				        	<table>\
					            <thead>\
					                <tr>\
					                    <th>日</th>\
					                    <th>一</th>\
					                    <th>二</th>\
					                    <th>三</th>\
					                    <th>四</th>\
					                    <th>五</th>\
					                    <th>六</th>\
					                </tr>\
					            </thead>\
					            <tbody></tbody>\
					        </table>\
			    	</div>';
			parents.html("");
			for(var i=0;i<n;i++) parents.append(html);
			var calendar = parents.find(".calendar");
			if(n>1) {
				calendar.last().find(".nextmonth").show();
			}else{
				calendar.find(".prevmonth,.nextmonth").show();
			}
		},
		createAppendHtml:function (date){
			var dateArr = [date],m,crossJson;
				for(var i=1;i<this.defaults.dateNum;i++){
					crossJson = this.cross(date.Y,date.Mo+i);
					m = crossJson.Y+"/"+ tools.addZore(crossJson.Mo)+"/"+(1),
					date2 = this.getCurrenTime(m);
					dateArr.push(date2);
				};
				//屏蔽向后的月份
				if(this.endDate) this.arrowHS(new Date(date2.Y,date2.Mo,0).getTime(),1);

				this.moreDateRender(dateArr);
				
		},
		moreDateRender:function (options){
			var that = this,parents,calendar = this.getElement().calendar;
			//负责生成tr
			for(var i=0;i<options.length;i++){
				this.paddingHtml({
					appendTo:calendar.eq(i),
					appendToEle:"tbody",
					parents:"tr",
					children:"td",
					chidrenNum:7,
					date:options[i]
				},function (children,parent,date){
					var currentDay = date.currentDay;
					parent.find(".title").text(date.Y+"年"+tools.addZore(date.Mo)+"月");
					for(var i=0;i<date.totalDate;i++){
						var n = i+1,
							arrtFormat = tools.addYMD(date.Y,date.Mo,n),
							currentDayAdd = currentDay++,
							format = date.current.format,
							currentEle = children.eq(currentDayAdd);
						currentEle.text(n).attr("time",arrtFormat);

						if(arrtFormat == that.initDate){
							currentEle.addClass("today");
							
						};
						if(arrtFormat == format){
							currentEle.text("今天");
							
						};
						if(that.selectDate && that.selectDate == arrtFormat){
							currentEle.addClass("today");
							
						};
						if(that.section && arrtFormat>that.initDate && arrtFormat<that.selectDate){
							currentEle.addClass("red");

						}
						if(that.limit && arrtFormat < that.initDate){
							currentEle.addClass("disable");
						}else if(that.limit && that.endDate && that.endDate < arrtFormat){
							currentEle.addClass("disable");
						}else{
							currentEle.addClass("ok");
						}
					};
				});
			};

			/*给可以点击的td打上编号*/
			this.getElement().allOk.each(function (i){
				$(this).attr("data-num",i);
			});
			this.events();
		},
		paddingHtml:function (options,callBack){
			var rows = Math.ceil((options.date.totalDate+options.date.Dy)/7), //行数
				appendTo = options.appendTo.find(options.appendToEle);
				appendTo.html("");
			for(var i=0;i<rows;i++){
				var createParent = $("<"+options.parents+"/>");
				for(var k=0;k<options.chidrenNum;k++){
					var createChild = $("<"+options.children+"/>");
					createChild.addClass("st");
					createParent.append(createChild);
				};
				appendTo.append(createParent);
			};

			if(callBack) callBack(options.appendTo.find(options.children),options.appendTo,options.date);

		},
		getToday:function (){
			var currentD = new Date(),
				currentY = currentD.getFullYear(),
				currentM = currentD.getMonth()+1,
				today = currentD.getDate();

			return {
					currentY : currentY,
					currentM : currentM,
					today : today,
					format : tools.addYMD(currentY,currentM,today)
				};
		},
		delayDate:function (date,delay){
			var dates = date.split("-"),
				d = new Date(dates[0],dates[1]-1,dates[2]);
				d.setDate(d.getDate() + (this.delay -1));
			var Y = d.getFullYear(),M = d.getMonth()+1,D = d.getDate();
			return Y + "-" + tools.addZore(M) + "-" + tools.addZore(D);
		},
		getCurrenTime:function (times){
			var d,currenTime,getFullYear,getMonth,
				that = this;

			if(times){
				d = new Date(tools.trans(times));
			}else{
				d = new Date();
			};
			currenTime = {
				Y : d.getFullYear(),
				Mo : d.getMonth()+1,
				Da : d.getDate(),
				H : d.getHours(),
				Mi : d.getMinutes(),
				S : d.getSeconds(),
				Dy:d.getDay(),
				current:that.getToday(),
				totalDate: tools.getTotalDate(d.getFullYear(),d.getMonth()+1),
				currentDay:(function (){
					d.setDate(1);
					return d.getDay();	
				})()
			};
			return currenTime;
		},
		prevmonth:function (){
			this.addReduction("-");
		},		
		nextmonth:function (){
			this.addReduction("+");
		},
		cross:function (y,m){
			var y = m<1 ? y-1 : m>12 ? y+1 : y,
				m = m<=0 ? 12 : m>12 ? 1 : m;
			return {Y: y,Mo: m}
		},
		arrowHS:function (prevTime,status){
			if(status == 0){
				var initDate = this.initDate.split("-"),
					initDateTime = new Date(initDate[0],initDate[1],0).getTime(),
					prevmonth = this.getElement().calendar.first().find(".prevmonth")
					//如果当年月小于前一个月 显示，否则隐藏
					if(initDateTime<prevTime){
						prevmonth.show();
					}else{
						prevmonth.hide();
					}	
			}else{
				var endDate = this.endDate.split("-"),
					initDateTime = new Date(endDate[0],endDate[1],0).getTime(),
					nextmonth = this.getElement().calendar.last().find(".nextmonth")
					//如果当年月小于前一个月 显示，否则隐藏
					if(initDateTime>prevTime){
						nextmonth.show();
					}else{
						nextmonth.hide();
					};
			}
		},
		addReduction:function (mark){
			var num = mark === "-" ? (--this.date.Mo) : (++this.date.Mo),
				crossJson = this.cross(this.date.Y,num),
				m = crossJson.Y+"/"+ tools.addZore(crossJson.Mo)+"/01",
				date = this.getCurrenTime(m);
				this.date = date;
				//得到前一个月的毫秒
				prevTime = new Date(crossJson.Y,tools.addZore(crossJson.Mo),0).getTime();
				//是否隐藏显示上一个月的按钮
				this.arrowHS(prevTime,0);	
				
				this.createAppendHtml(date);
		}
	};
	