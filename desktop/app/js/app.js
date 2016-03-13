angular.module('mechat', ['ngRoute']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../../main.html',
                controller: 'MainController'
            })
            .otherwise({
                redirectTo: '/'
            })
}]);