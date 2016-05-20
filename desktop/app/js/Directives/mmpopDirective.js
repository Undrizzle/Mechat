'use strict';

angular.module('meChat').directive("mmpopDirective", ["$timeout", "$document", "mmpop", "$animate", function() {
    return {
        restrict: "EA",
        scope: {},
        link: function() {}
    }
}]).provider("mmpop", function() {
    var e = angular.element,
        t =
    this.$get = ["$document", "$templateCache", "$compile", "$q", "$http", "$rootScope", "$timeout", "$window", "$controller", "$animate", function($document, $templateCache, $compile, $q, $http, $rootScope, $timeout, $window, $controller, $animate) {
        var M = {
            open: function(l) {
                var d = this,
                    y = angular.copy(t);
                var popId = y.singletonId
            },
            toggleOpen: function(e) {
                if (!e.signletonId)
                    return void console.error("toggleOpen function require singletonId.");
                var t = document.getElementById(e.singletonId);
                this.open(e);
            }
        };
        return M;
    }]
});