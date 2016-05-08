'use strict';

angular.module('meChat')
    .directive('navChatDirective',['$timeout', function($timeout) {
        return {
            restrict: 'EA',
            scope: !0,
            templateUrl: '../../partials/navChat.html'
        }
    }]);