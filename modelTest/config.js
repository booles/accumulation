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
        "test":"../test",


        "tools":"../tools/tools",

        "httpServer":"../tools/httpServer",

        "data":"../data"
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

require(["domReady!", "jQuery", "renderSearch", "lists","httpServer"],
    function(dom, jQuery, renderSearch, lists,httpServer) {
        
       httpServer.httpServer.listServer([],function (respones){
            lists.renderList(respones.data);
            $("#loading").hide();
       });


    });