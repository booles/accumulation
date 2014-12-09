require.config({
    baseUrl: '',
    paths: {
        text: 'vendor/require/text',
        domReady: 'vendor/require/domReady',
        css: 'vendor/require/css.js',
        jquery: 'vendor/jquery/jquery-2.1.1',
        angular: "vendor/ng/angular",
        "angular-route": "vendor/ng/angular-route",
        app:"./app",
        direSet:'comm/direSet/direSet',
        controller:'comm/controller/controller',
        routeController:'comm/controller/routeController',
        route:'comm/routes/route'
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
        'app',
        'domReady',
        'controller',
        'routeController',
        'direSet',
        "route"], function(angular,app,dom) {
            
            dom(function (){
              angular.bootstrap(document,["firstApp"]);
            });
});