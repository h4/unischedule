var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('ChairsCtrl', function($scope, $http, $routeParams) {
    $scope.chairs = [];
    $scope.title = "Список кафедр";

    $http
        .get('http://unishedule.h404.ru/api/get_chairs?faculty_id=' + $routeParams.id)
        .success(function(data) {
            $scope.chairs = data.chairs;
        });
});
