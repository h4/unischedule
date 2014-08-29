var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('roomsController', function($scope, $rootScope) {
    $rootScope.tabLocation = '/rooms';
    $scope.rooms = [];
    $scope.title = "Список аудиторий";
});
