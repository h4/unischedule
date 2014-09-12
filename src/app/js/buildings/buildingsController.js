var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('buildingsController',
    ['$scope', '$rootScope', '$http', '$routeParams', '$location', 'APIUrls',
        function ($scope, $rootScope, $http, $routeParams, $location, APIUrls) {
            $rootScope.tabLocation = '/buildings';
            $scope.buildings = [];
            $scope.title = "Учебные корпуса СПбГПУ";

            $location.search('date', null);
            $location.search('q', null);
            $location.search('kind', null);
            $location.search('kiosk', null);

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
