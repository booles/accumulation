define(["jQuery","tools"], function($,tools) {

    var select_value = $("#select_value");

    select_value.on("click", function() {
        $(".select_list").show();
    });

    $(".select_list").on("click", function(ev) {
        var cheng = $(ev.target).text(),
            arr = cheng == "单程" ? "d" : "f";
        select_value.find("b").text(cheng).end().attr({
            arr:arr
        });
        $(this).hide();
    });

    //点击重新搜索

    $(".btn_search1").on("click", function() {
        //触发这个事件渲染列表模板 参数不一样
        tools.publish("search:list", {num:$("#leaveText").val()});

        tools.publish("search:changeAllAttr");

    });

    /*$(".btn_search2").on("click", function() {
        //触发这个事件渲染列表模板 参数不一样
        tools.publish("search:list", {num:$("#leaveText").val()});


    });*/

})
