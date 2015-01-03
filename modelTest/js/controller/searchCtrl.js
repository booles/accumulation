define(["jQuery"], function($) {

    $("#select_value").on("click", function() {
        $(".select_list").show();
    });

    $(".select_list").on("click", function(ev) {
        $("#select_value b").text($(ev.target).text());
        $(this).hide();
    });

    //点击重新搜索

    $(".btn_search").on("click", function() {
        require(["../controller/searchData"], function(httpSearch) {
            var data = Math.floor(Math.random() * (5));
            httpSearch.httpSearch(data);
        });
    });

})
