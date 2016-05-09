"use strict";

angular.module('meChat')
    .controller("chatSenderController", ["$rootScope", "$scope", "mmpop", function($rootScope, $scope, mmpop) {
        $scope.showEmojiPanel = function(e) {
            mmpop.toggleOpen({
                top: -272,
                left: 15,
                templateUrl: "expression.html",
                className: "slide-top",
                controller: "emojiController",
                signletonId: "mmpop_emoji_panel",
                scope: $scope,
                autoFoucs: !1,
                container: angular.element(document.getElementById("tool_bar"))
            });
            e.preventDefault();
        }
    }]);