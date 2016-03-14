angular.module('mechat', ['ui.router']).
    config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("../../main");
        $stateProvider
            .state('', {
                url: "",
                templateUrl: ""
            });
    });