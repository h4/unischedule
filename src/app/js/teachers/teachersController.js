var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('teachersController', function($scope) {
    $scope.teachers = [];
    $scope.title = "Список преподавателей";
});
