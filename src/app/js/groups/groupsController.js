var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('GroupsCtrl',
    ['$scope', '$rootScope', '$http', '$routeParams', 'APIUrls',
        function ($scope, $rootScope, $http, $routeParams, APIUrls) {
            var GROUP_TYPES = {
                "common": "common",
                "evening": "evening",
                "distance": "distance"
            };

            $rootScope.tabLocation = '/';
            $scope.groups = [];
            $scope.faculty = {};
            $scope.levels = [
                {
                    title: "1-й курс",
                    groups: []
                },
                {
                    title: "2-й курс",
                    groups: []
                },
                {
                    title: "3-й курс",
                    groups: []
                },
                {
                    title: "4-й курс",
                    groups: []
                },
                {
                    title: "5-й курс",
                    groups: []
                },
                {
                    title: "6-й курс",
                    groups: []
                }
            ];
            $scope.title = "Список групп";

            $http
                .get(APIUrls.getUrl('groups', $routeParams.id))
                .success(function (data) {
                    $rootScope.subtitle = data.faculty.name + " – " + "Список групп";
                    data.groups
                        .sort(function (prev, curr) {
                            if (prev.name > curr.name) {
                                return 1;
                            } else if (prev.name < curr.name) {
                                return -1;
                            } else {
                                return 0;
                            }
                        })
                        .forEach(function (group) {
                            if (group.type === GROUP_TYPES.common) {
                                $scope.levels[group.level - 1].groups.push(group);
                            }
                        });
                });
        }]);
