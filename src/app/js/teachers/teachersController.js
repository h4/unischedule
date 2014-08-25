var teachers = angular.module('teachersModule', []);

teachers.controller('teachersController', function($scope) {
    $scope.teachers = [];
    $scope.title = "Список преподавателей";
});

var injector = angular.injector(['ng', 'teachersModule']);
