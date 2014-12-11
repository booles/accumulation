require.config({
    baseUrl: '',
    paths: {
        text: 'vendor/require/text',
        domReady: 'vendor/require/domReady',
        css: 'vendor/require/css.js',
        jquery: 'vendor/jquery/jquery-2.1.1',
        angular: "vendor/ng/angular",
        "angular-route": "vendor/ng/angular-route",
        exampleApp:"./exampleApp",
    },
    priority: ['text', 'css'],
    shim: {
        jquery: {
            exports: "jQuery"
        },
        angular: {
            exports: "angular"
        },
        "angular-route":{
            deps:['angular'],
            exports:"angular-route"
        }
    }
});

require(['angular',
        'exampleApp',
        'domReady'], function(angular,app,dom) {
            
            dom(function (){
              angular.bootstrap(document,["exampleApp"]);
            });
});