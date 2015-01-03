define(["jQuery", "lists"], function($, lists) {

    var arr = [
        ["a", "b", "c"],
        [1, "a", "b"],
        ["wang", "haozi", "lala"],
        ["123", "4444444", "555555555"],
        ["6666", "888", "999"]
    ];

    function httpSearch(num) {
        setTimeout(function() {
            lists.renderList(arr[num]);
        }, 1000);

    }

    return {
        httpSearch: httpSearch
    }
});
