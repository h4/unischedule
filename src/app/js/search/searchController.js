var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('SearchCtrl',
    ['$scope', '$rootScope', '$http', '$location', 'APIUrls',
        function ($scope, $rootScope, $http, $location, APIUrls) {
            $scope.results = [];
            $rootScope.kind = $location.search().kind;
            $rootScope.subtitle = "";
            $rootScope.tabLocation = '/';

            function processGroups(data) {
                return data.groups.map(function (elem) {
                    elem.title = 'Группа №' + elem.name;
                    elem.path = '/schedule/' + elem.id;

                    return elem;
                })
            }

            function processTeachers(data) {
                return data.teachers.map(function (elem) {
                    elem.title = elem.full_name;
                    elem.path = '/teachers/' + elem.id;

                    return elem;
                })
            }

            $http
                .get(APIUrls.getUrl('search', $rootScope.kind, $location.search().q))
                .success(function (data) {
                    switch ($rootScope.kind) {
                        case 'teachers':
                            $scope.results = processTeachers(data);
                            break;
                        default :
                            $scope.results = processGroups(data);
                            break;
                    }
                })
                .error(function () {

                });
        }]);
