var unisheduleApp = angular.module('unisheduleApp', []);

unisheduleApp.controller('TabsCtrl', function($scope, $http) {
    $scope.tabs = [ {
        name: 'Группы',
        url: '',
        isActive: true
    }, {
        name: 'Преподаватели',
        url: '',
        isActive: false
    }, {
        name: 'Аудитори',
        url: '',
        isActive: false
    } ];

    $scope.tab = '';
});
