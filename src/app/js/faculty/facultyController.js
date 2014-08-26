var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('FacultyCtrl', function($scope, $http) {
    $scope.faculties = [];
    $scope.title = "Список институтов";

    $http
        .get('http://unishedule.h404.ru/api/get_faculties')
        .success(function(data) {
            $scope.faculties = data.faculties;
        });
});
