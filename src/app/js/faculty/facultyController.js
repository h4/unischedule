var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('FacultyCtrl', ['$scope', '$rootScope', '$http', 'APIUrls', function($scope, $rootScope, $http, APIUrls) {
    $scope.faculties = [];
    $rootScope.subtitle = "";
    $rootScope.tabLocation = '/';

    $http
        .get(APIUrls.getUrl('faculties'))
        .success(function(data) {
            $scope.faculties = data.faculties;
        });
}]);
