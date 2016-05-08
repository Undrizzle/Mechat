"use strict";

angular.module('meChat')
    .factory('stateManageService', ['$http', '$q', function() {
        function e(e) {
            if ("object" == typeof e) {
                for (var n in e) {
                    if (o[n] !== e[n] && t(n, e[n])) {
                        o[n] = e[n];
                    }
                }
            }
        }
        function t(e,t) {
            var o = n[e];
            if (o) {
                for (var r = 0; r < o.length; r++) {
                    o[r](t)
                }
            }
        }
        var o = {
            "sender:hasText": !1,
            "sender:active": !1,
            "navChat:active": !1,
            "navContact:active": !1,
            "contactPicker:active": !1,
            "dialog:open": !1
        };
        var n = {};
        var r = {
            "navChat:active": {
                "navContact:active": !1,
                "navRead:active": !1
            },
            "navRead:active": {
                "navChat:active": !1,
                "navContact:active": !1
            },
            "navContact:active": {
                "navChat:active": !1,
                "navRead:active": !1
            }
        };
        var a = {
            navKeydown: function() {
                return !o["sender:hasText"] && !o["contactPicker:active"]
            },
            pasteFile: function() {
                return !o["dialog:open"]
            }
        };
        var i = {};
        var c = {
            change: function(n,a) {
                var i, c = r[n],
                    s = a.toString();
                if (c && (i = c['false'] || c['true'] ? c[s] : 'true' == s ? c : void 0)) {
                    if (o[n] !== a && t(n,a)) {
                        o[n] = a;
                        e(i);
                    }
                }
            },
            canDo: function(e) {
                return a[e]()
            },
            on: function(e, r) {
                n[e] || (n[e] = []);
                var a = o[e];

            },
            off: function(e, t) {
                var o, r = n[e];
                if (r) {
                    for (var a = 0; a < r.length; a++) {
                        if (o = r[a]) {

                        }
                    }
                }
            },
            data: function(e, t) {
                return 2 === arguments.length && (i[e] = t )
            }
        };
        return c
    }]);