var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('GroupsCtrl', function($scope, $http, $routeParams) {
    $scope.groups = [];
    $scope.title = "Список групп";

    $http
        .get('http://unishedule.h404.ru/api/get_chairs_group?chair_id=' + $routeParams.id)
        .success(function(data) {
            $scope.groups = data.groups;
        });
});
