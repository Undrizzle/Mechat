'use strict';

angular.module('meChat', [
    'ui.router',
    'meChat',
    'ngNiceBar'
])
    .run(["$rootScope", "$state", "$stateParams", function(e, t, o) {
        e.$state = t;
        e.$stateParams = o;
    }])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('chat', {
                url: '',
                params: {
                    userName: ''
                },
                views: {
                    navView: {
                        controller: function($scope, $state) {

                        }
                    },
                    contentView: {
                        templateUrl: '../partials/contentChat.html',
                        controller: ''
                    }
                }
            });
    }]);