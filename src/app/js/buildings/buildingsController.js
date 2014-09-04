var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('buildingsController',
    ['$scope', '$rootScope', '$http', '$routeParams', 'APIUrls',
        function ($scope, $rootScope, $http, $routeParams, APIUrls) {
            $rootScope.tabLocation = '/buildings';
            $scope.buildings = [];
            $scope.title = "Учебные корпуса СПбГПУ";

            $http
                .get(APIUrls.getUrl("buildings"))
                .success(function (data) {
                    $rootScope.subtitle = $scope.title;
                    $scope.buildings = data.buildings;
                })
                .error(function () {

                });
        }]
);
