"use strict";

angular.module("Services").factory("chatFactory", ["$rootScope", "$timeout", "$http", "$q", "contactFactory", "accountFactory", "emojiFactory", "confFactory", "notificationFactory", "utilFactory", "reportService", "mmHttp", "titleRemind",
    function($rootScope, $timeout, $http, $q, contactFactory, accountFactory, emojiFactory, confFactory, notificationFactory, utilFactory, reportService, mmHttp, titleRemind) {
        function handleChatList(e) {
            for (var t, o = [], n = [], r = 0; r < e.length; r++) {
                t = e[r];
                t.isTop() ? o.push(t) : n.push(t);
            }
            return [].unshift.apply(n, o), n;
        }
        var _chatList = [],
            _chatListInfos = [],
            _chatMessages = window._chatContent = {},
            _currentUserName = "",
            _addedMsgIdsMap = {},
            _msfMap = {},
            service = {
                setCurrentUserName: function(e) {
                    _currentUserName = e
                },
                getCurrentUserName: function() {
                    return _currentUserName
                },

            }


    }]);