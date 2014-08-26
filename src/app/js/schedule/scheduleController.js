var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('ScheduleCtrl', function($scope, $http, $routeParams) {
    $scope.schedule = [];
    $scope.title = "Расписание группы";
    $scope.days = [
        '', 'Понедельник', 'Вторник', 'Cреда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
    ];

    $http
        .get('http://unishedule.h404.ru/api/get_schedule?group_id=' + $routeParams.id)
        .success(function(data) {
            $scope.schedule = data.days;
            $scope.title = $scope.title + ' ' + data.group_name;
        });
});
