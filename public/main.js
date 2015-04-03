$(function() {
    var FADE_TIME = 150;
    var TYPING_TIMER_LENGTH = 400;
    var COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];
    //Initialize varibles
    var $window = $(window);
    var $usernameInput = $('.usernameInput');
    var $messages = $('.messages');
    var $inputMessage = $('.inputMessage');
    var $loginPage = $('.login.page');
    var $chatPage = $('.chat.page');
    //Prompt for setting a username
    var username;
    var connected = false;
    var typing = false;
    var lastTypingTime;
    var $currentInput = $usernameInput.focus();

    var socket = io();

    function addParticipantsMessage(data) {
        var message = '';
        if (data.numUsers === 1) {
            message += "there's 1 participant";
        }
        else {
            message += "there are " + data.numUsers + " participants";
        }
        log(message);
    }
    //Sets the client's username
    function setUsername() {
        username = cleanInput($usernameInput.val().trim());   //trim:去除字符串两侧空白字符或其他预定义字符
        //If the username is valid
        if (username) {
            $loginPage.fadeOut();
            $chatPage.show();
            $loginPage.off('click');
            $currentInput = $inputMessage.focus();
            //Tell the server your username
            socket.emit('add user', username);
        }
    }
    //Send a chat message
    function sendMessage() {
        var message = $inputMessage.val();
        //Prevent markup from being injected into the message
        message = cleanInput(message);
        //if there is a non-empty message and a socket connection
        if (message && connected) {
            $inputMessage.val('');
            addChatMessage({
                username: username,
                message: message
            });
            //tell server to execute 'new message' and send along one parameter
            socket.emit('new message', message);
        }
    }
    //Log a message
    function log(message, options) {
        var $el = $('<li>').addClass('log').text(message);
        addMessageElement($el, options);
    }
    //Adds the visual chat message to the message list
    function addChatMessage(data, options) {
        //Don't fade the message in if there is an 'X was typing'
        var $typingMessages = getTypingMessages(data);
        options = options || {};
        if ($typingMessages.length !== 0) {

        }
    }
})