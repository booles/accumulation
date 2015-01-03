define(["jQuery", "template", "text!../view/lists.html"], function($, template, listsHtml) {
    var listRender = template.compile(listsHtml);

    function renderList(data) {
        $("#lists").html(listRender({
            data: data
        }));
    };

    return {
        renderList: renderList
    }
});
