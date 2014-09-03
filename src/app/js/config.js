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
            "faculty": function(id) {
                return "/faculties/" + id;
            },
            "groups": function(id) {
                return "/faculties/" + id + "/groups";
            },
            "schedule": function(id, date) {
                var querystring = date ? "?date=" + date : "";
                return "/scheduler/" + id + querystring;
            },
            "teachers": "/teachers",
            "teacher": function(id) {
                return "/teachers/" + id;
            },
            "teacherSchedule": function(id, date) {
                var querystring = date ? "?date=" + date : "";
                return "/teachers/" + id + "/scheduler" + querystring;
            },
            "buildings": "/buildings",
            "rooms": function(id) {
                return "/buildings/" + id;
            },
            "roomSchedule": function(id, roomId, date) {
                var querystring = date ? "?date=" + date : "";
                return "/buildings/" + id + '/' + roomId + "/scheduler" + querystring;
            },
            "searchGroup": function(q) {
                return "/search/groups?q=" + q;
            },
            "searchTeacher": function(q) {
                return "/search/groups?q=" + q;
            }
        };
    }]);
