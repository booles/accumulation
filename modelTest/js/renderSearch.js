define(["jQuery", "template", "getCookie", "text!../view/search.html"],
    function($, template, getCookie, searchHtml) {
        var render = template.compile(searchHtml);
        $("#search_box").html(render({
            data: getCookie
        }));

        require(["../controller/searchCtrl"]);
    })
