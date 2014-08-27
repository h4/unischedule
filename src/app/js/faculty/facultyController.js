var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('FacultyCtrl', function($scope, $rootScope, $http) {
    $scope.faculties = [];
    $rootScope.subtitle = "";

    $http
        .get('http://unishedule.h404.ru/api/get_faculties')
        .success(function(data) {
            $scope.faculties = data.faculties;
        });
});
