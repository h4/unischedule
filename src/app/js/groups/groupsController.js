var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('GroupsCtrl', function($scope, $rootScope, $http, $routeParams) {
    $rootScope.tabLocation = '/';
    $scope.groups = [];
    $scope.faculty = {};
    $scope.levels = [{
        title: "1-й курс",
        groups: []
    }, {
        title: "2-й курс",
        groups: []
    }, {
        title: "3-й курс",
        groups: []
    }, {
        title: "4-й курс",
        groups: []
    }, {
        title: "5-й курс",
        groups: []
    }, {
        title: "6-й курс",
        groups: []
    }];
    $scope.title = "Список групп";

    $http
        .get('http://unishedule.h404.ru/api/get_groups?chair_id=' + $routeParams.id)
        .success(function(data) {
            $rootScope.subtitle = data.faculty.faculty_name + " – " + "Список групп";
            data.groups
                .sort(function(prev, curr) {
                    if (prev.group_name > curr.group_name) {
                        return 1;
                    } else if (prev.group_name < curr.group_name) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
                .forEach(function(group) {
                    $scope.levels[group.group_level - 1].groups.push(group);
                });
        });
});
