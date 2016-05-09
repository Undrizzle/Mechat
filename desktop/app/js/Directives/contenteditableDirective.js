'use strict';

angular.module("meChat").directive("contenteditableDirective", ["$timeout", function($timeout) {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, element, attrs, ctrl) {
            if (ctrl) {
                var s;
                element.bind("paste", function() {
                    var e = this,
                        r = e.innerHTML;

                });

                ctrl.$render = function() {
                    element.html(ctrl.$viewValue);
                };

                ctrl.$render();
            }
        }
    }
}]);