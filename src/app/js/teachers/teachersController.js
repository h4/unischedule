var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('teachersController', function($scope, $rootScope) {
    $rootScope.subtitle = "";
    $rootScope.tabLocation = '/teachers';
    $scope.teachers = [];
    $scope.title = "Список преподавателей";
});
