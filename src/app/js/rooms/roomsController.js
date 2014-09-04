var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('roomsController',
    ['$scope', '$rootScope', '$http', '$routeParams', 'APIUrls',
        function ($scope, $rootScope, $http, $routeParams, APIUrls) {
            $rootScope.tabLocation = '/buildings';
            $scope.rooms = [];
            $scope.building = {};
            $scope.title = "учебные аудитории";

            $http
                .get(APIUrls.getUrl("rooms", $routeParams.id))
                .success(function (data) {
                    $rootScope.subtitle = data.name + ', ' + $scope.title;
                    $scope.rooms = data.rooms;
                    $scope.building.id = data.id;
                    $scope.building.name = data.name;
                })
                .error(function () {

                });
        }]
);
