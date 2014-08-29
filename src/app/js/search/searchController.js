var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('SearchCtrl', function($scope, $rootScope, $http, $location) {
    $scope.results = [];
    $rootScope.kind = $location.search().kind;
    $rootScope.subtitle = "";

    $http
        .get('http://unishedule.h404.ru/api/search?q=' + $location.search.q)
        .success(function(data) {
            $scope.results = data.result.map(function(elem) {
                switch($rootScope.kind) {
                    case 'groups':
                        elem.title = 'Группа №' + elem.group_name;
                        elem.path = '/schedule/' + elem.group_id;
                        break;
                    case 'rooms':
                        elem.path = '/rooms/' + elem.room_id;
                        break;
                    case 'teachers':
                        elem.path = '/teachers/' + elem.teacher_id;
                        break;
                }

                return elem;
            });
        })
        .error(function() {

        });
});

