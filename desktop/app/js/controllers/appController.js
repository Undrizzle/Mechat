"use strict";

angular.module("meChat").controller("appController", ["$scope", "mmpop", function($scope,mmpop) {
    $scope.toggleSystemMenu = function() {
        mmpop.toggleOpen({
            templateUrl: "systemMenu.html",
            top: 60,
            left: 85,
            container: angular.element(document.querySelector(".panel")),
            controller: "",
            singletonId: "mmpop_system_menu",
            className: "system_menu"
        })
    }
}]);