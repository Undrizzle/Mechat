'use strict';

angular.module('meChat').directive("mmpopDirective", ["$timeout", "$document", "mmpop", "$animate", function() {
    return {
        restrict: "EA",
        scope: {},
        link: function() {}
    }
}]).provider("mmpop", function() {
    var M = {
        open: function(l) {

        },
        toggleOpen: function(e) {
            if (!e.signletonId)
                return void console.error("toggleOpen function require singletonId.");
            var t = document.getElementById(e.singletonId);
            this.open(e);
        }
    }
})