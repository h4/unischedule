var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'pages/faculties.html'
            })
            .when('/faculty/:id/groups', {
                templateUrl: 'pages/groups.html'
            })
            .when('/schedule/:id', {
                templateUrl: 'pages/schedule.html'
            })
            .when('/teachers', {
                templateUrl: 'pages/teachers.html'
            })
            .when('/rooms', {
                templateUrl: 'pages/rooms.html'
            })
            .when('/search', {
                templateUrl: 'pages/search.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(['APIUrlsProvider', function(APIUrlsProvider) {
        APIUrlsProvider.hostname = "ruz.spbstu.ru";
        APIUrlsProvider.path = '/node/api_uni';
        APIUrlsProvider.port = 80;
        APIUrlsProvider.urls = {
            "faculties": "/faculties",
            "userAuthentication": function (username) {
                return "/users/" + username + "/authentication";
            },
            "employees": "/employees"
        };
    }]);
