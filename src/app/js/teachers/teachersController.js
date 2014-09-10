var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('teachersController', ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location) {
        $rootScope.subtitle = "";
        $rootScope.tabLocation = '/teachers';
        $scope.teachers = [];
        $scope.title = "Список преподавателей";
        $location.search({
            'date': null,
            'q': null,
            'kind': null
        });
    }]);
