var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('SearchCtrl',
    ['$scope', '$rootScope', '$http', '$location', 'APIUrls',
        function ($scope, $rootScope, $http, $location, APIUrls) {
            $scope.results = [];
            $rootScope.kind = $location.search().kind;
            $rootScope.subtitle = "";
            $rootScope.tabLocation = '/';

            $http
                .get(APIUrls.getUrl('search', $rootScope.kind, $location.search().q))
                .success(function (data) {
                    $scope.results = data.groups.map(function (elem) {
                        switch ($rootScope.kind) {
                            case 'groups':
                                elem.title = 'Группа №' + elem.name;
                                elem.path = '/schedule/' + elem.id;
                                break;
                            case 'teachers':
                                elem.path = '/teachers/' + elem.id;
                                break;
                        }

                        return elem;
                    });
                })
                .error(function () {

                });
        }]);
