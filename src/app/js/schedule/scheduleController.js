var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('ScheduleCtrl', function ($scope, $rootScope, $http, $routeParams) {
    $scope.schedule = [];
    $scope.title = "Расписание группы";
    $scope.days = [
        '', 'Понедельник', 'Вторник', 'Cреда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
    ];
    $scope.lessonTypes = [
        'Упражнения',
        'Лабораторная',
        'Лекция',
        'Семинар',
        'Консультация',
        'Внеучебное занятие',
        'Зачет',
        'Экзамен'
    ];

    $http
        .get('http://unishedule.h404.ru/api/get_schedule?group_id=' + $routeParams.id)
        .success(function (data) {
            $scope.schedule = data.days;
            $rootScope.subtitle = $scope.title + ' ' + data.group_name;
        });
});
