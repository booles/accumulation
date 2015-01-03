require.config({
    baseUrl: "./js/lib",
    paths: {
        "jQuery": "jquery-1.7.1",
        "jquery.cookie": "jquery.cookie",
        "domReady": "domReady",
        "text": "text",
        "template": "template",

        "getCookie": "../getCookie",
        "renderSearch": "../renderSearch",

        "lists": "../lists",
    },
    shim: {
        "jQuery": {
            "exports": "$"
        },
        "jquery.cookie": {
            "deps": ["jQuery"],
            "exports": "$.cookie"
        }

    }
});

require(["domReady!", "jQuery", "renderSearch", "lists"],
    function(dom, jQuery, renderSearch, lists) {
        //渲染列表
        lists.renderList([1, 2, 3, 4, 5]);
    });
