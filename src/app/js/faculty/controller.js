var unisheduleApp = angular.module('unisheduleApp', []);

unisheduleApp.controller('FacultyListCtrl', function($scope, $http) {
    $scope.faculties = [];
    $scope.title = "Список институтов";

    $http
        .get('http://ruz.spbstu.ru/node/api/get_faculties')
        .success(function(data) {
            $scope.faculties = data;
        });
});
