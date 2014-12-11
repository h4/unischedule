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
                templateUrl: 'pages/schedule.html',
                controller: 'ScheduleCtrl',
                resolve: {
                    scheduleType: function() {return 'group'}
                }
            })
            .when('/teachers', {
                templateUrl: 'pages/teachers.html',
                controller: 'teachersController'
            })
            .when('/teachers/:id', {
                templateUrl: 'pages/schedule.html',
                controller: 'ScheduleCtrl',
                resolve: {
                    scheduleType: function() {return 'teacher'}
                }
            })
            .when('/buildings', {
                templateUrl: 'pages/buildings.html'
            })
            .when('/buildings/:id/rooms', {
                templateUrl: 'pages/rooms.html'
            })
            .when('/buildings/:id/rooms/:room_id/schedule', {
                templateUrl: 'pages/schedule.html',
                controller: 'ScheduleCtrl',
                resolve: {
                    scheduleType: function() {return 'room'}
                }
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
        APIUrlsProvider.path = '/api/v1/ruz';
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
                return "/buildings/" + id + '/rooms/' + roomId + "/scheduler" + querystring;
            },
            "search": function(kind, q) {
                return "/search/" + kind + "?q=" + encodeURIComponent(q);
            }
        };
    }]);
