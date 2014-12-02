var createDateRili = function (){
		


		var dataTime  = new Date();	
		//获取每月的总天数
		function monthData(_year){
				return  [31,runNian(_year)?29:28,31,30,31,30,31,31,30,31,30,31];
		}
		
		//判断某年某月的1号是星期几
		function getFirstDay(_year,_month) {
		    dataTime.setFullYear(_year);
		    dataTime.setMonth(_month-1);
		    dataTime.setDate(1);
		    return dataTime.getDay();

		};

		//判断是否是闰年
		function runNian(year) {
		    if(year%400 === 0 || (year%4 === 0 && year%100 !== 0) ) {
		        return true;
		    }
		    else { return false; }
		};

		//返回日期，格式2014-04-04
		function yymmdd(y,m,d){
			return 	(y ? zero(y) : "")+(m ? "-"+zero(m) : "")+(d ? "-"+ zero(d) : "");
		}
		//补零
		function zero(n){
				return n<10 ? "0"+n : n;
		};

		//存储日期
		var scope = {};
			scope.Y = dataTime.getFullYear();
			scope.M = dataTime.getMonth()+1;
			scope.Da = dataTime.getDate();
			scope.H = dataTime.getHours();
			scope.Mi = dataTime.getMinutes();
			scope.S= dataTime.getSeconds();
			scope.D = dataTime.getDay();

		
		//得到星期
		var day = ["日","一","二","三","四","五","六"];

		//外层box
		renderDate(scope.Y,scope.M);



		function renderDate(y,m){

			var dataBox = $("<div id='dataBox'></div>"),
				creatDiv = $("<div id='button'><span id='shang'>上一月</span><span id='preYear'>上一年</span><span id='spanYear' style='padding-left: 10px;'>"+yymmdd(scope.Y)+"</span>"+'-'+"<span id='spanMoth' style='margin-right: 10px;'>"+yymmdd(scope.M)+"</span><span id='nextYear'>下一年</span><span id='xia'>下一月</span></div>");
				createTable = $("<table/>"),

				createThead = $("<thead/>"),
				createTbody = $("<tbody/>"), 
				createTr = $("<tr/>");	
			var putText = $("#putText");   //input输入框 

			//创造一个下拉
			var box = $("<div id='box'></div>");



		
				createTbody.attr("id","Tbody");
				$.each(day,function (i,m){
					var createTd = $("<td/>");
					createTd.html(m);
					createTd.appendTo(createTr)
				});
				createThead.addClass("createThead");
				createTbody.addClass("createTbody");

				for(var z=0;z<6;z++){
					var createDateTr = $("<tr/>");
					for(var k=0;k<7;k++){
						var createDateTd = $("<td/>");
						createDateTd.appendTo(createDateTr);
					};
					createDateTr.appendTo(createTbody);			
				};

				dataBox.appendTo($("body"));
				var dataBox2 = $("#dataBox");

				creatDiv.appendTo(dataBox);
				createTr.appendTo(createThead);
				createThead.appendTo(createTable);
				createTbody.appendTo(createTable);
				createTable.appendTo(dataBox2);

				box.appendTo(dataBox2);

				dataBox2.css({
					"position":"absolute",
					"left":"200px",
					"top":"300px"
				});

				var shang = $("#shang"),
					xia = $("#xia"),
					preYear = $("#preYear"),
					nextYear = $("#nextYear"),
					spanYear = $("#spanYear"),  //填写日期的span
					spanMoth = $("#spanMoth");


				//上个月
				shang.click(function (){
					m--;
					if(m<1) m=12;
					spanMoth.html(yymmdd(m));
					blockDate(y,m);
				});	
				//下个月
				xia.click(function (){
					m++;
					if(m>12) m=1;
					spanMoth.html(yymmdd(m));
					blockDate(y,m);
				});	
				//上一年
				preYear.click(function (){
					y--
					spanYear.html(yymmdd(y));
					blockDate(y,m);
				});
				//下一年
				nextYear.click(function (){
					y++
					spanYear.html(yymmdd(y));
					blockDate(y,m);
				});
				
				//点击月份下拉选择

				var box2 = $("#box");
					
					for(var i=0;i<12;i++){
						console.log(i+1);
						creatSpan = $("<span><span>");
						creatSpan.html((i+1) +"月");
						creatSpan.appendTo(box2);
					}

				spanMoth.toggle(function (){
					
					box2.animate({"top":'20px'});

				},function (){
					box2.animate({"top":'-500px'});	
				});

				box2.on("click",function (event){
					var evTargetSpan = $(event.target);

						m = evTargetSpanHtml = parseInt(evTargetSpan.text());
						 blockDate(y,evTargetSpanHtml);
						 spanMoth.html(yymmdd(evTargetSpanHtml));
						 box2.animate({"top":'-500px'});
				});

				//刚刷新渲染
			   blockDate(y,m);
			   //给tbody添加事件
			   addEvent(createTbody);
			function blockDate(y,m){
					//当月的总天数
					var monthDataArr = monthData(y)[m-1],shangMonthDataArr,shangMonthDataArr
					//上月的总天数
					if(m == 1){
						shangMonthDataArr = monthData(y-1)[11];
					}else {
						shangMonthDataArr = monthData(y)[m-2];
					}
					
					//下月的总天数
					if(m == 12){
						xiaMonthDataArr = monthData(y+1)[0];

					}else {
						xiaMonthDataArr = monthData(y)[m];
					}
					
					//获取每月一号是周几
					var first = parseInt(getFirstDay(y,m)),
						allTd = $("#Tbody td"),
						allTd_len = allTd.length,
						lengs = 1,getDateTd;

						allTd.html("");
						allTd.attr("class","");
						allTd.eq(first).addClass("red");
						//从一号的星期开始循环
						for(var i=first;i<monthDataArr+first;i++){		
							allTd.eq(i).html(i-first+1);
							allTd.eq(i).attr("able","able");
						};
						for(var i=0;i<first;i++){
							allTd.eq(first-i-1).html(shangMonthDataArr-i);
							allTd.eq(i).addClass("gay");
						}

						for(var i=monthDataArr+first;i<allTd_len;i++){
							allTd.eq(i).html(lengs++);
							allTd.eq(i).addClass("gay");
						};
			};

			//tbody添加事件控制input
			function addEvent(ele){
				ele.on("mouseover mouseout click",function (event){
						var  evTarget = $(event.target);
						if(!evTarget.attr("able")) return;
						if(event.type == "mouseover"){
							evTarget.addClass("tdHoverColor");
						}else if(event.type == "mouseout"){
							evTarget.removeClass("tdHoverColor");
						}else {
							createTbodyClick($(this),evTarget);
						}
				});
					
			};

			function createTbodyClick(tbody,evTarget){
					var targetHtml = evTarget.text(),
						tds = tbody.find("td[able]");
					putText.val(yymmdd(y,m,targetHtml));
						tds.removeClass("tdHoverColor2");
						evTarget.addClass("tdHoverColor2");
			}

				
		}

};		