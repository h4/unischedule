var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('FacultyCtrl',
    ['$scope', '$rootScope', '$http', '$location', 'APIUrls',
        function ($scope, $rootScope, $http, $location, APIUrls) {
            var kiosk = $location.search().kiosk;
            $scope.faculties = [];
            $rootScope.subtitle = "";
            $rootScope.tabLocation = '/';

            $location.search({
                'date': null,
                'q': null,
                'kind': null,
                'kiosk': kiosk
            });

            $http
                .get(APIUrls.getUrl('faculties'))
                .success(function (data) {
                    $scope.faculties = data.faculties;
                });
        }]);
