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
            $scope.schedule = data.days
                .map(function(day) {
                    day.lessons.forEach(function(lesson) {
                        lesson.startPosition = (lesson.time_start.split(":")[0] - 8) / 2 + 1;
                        lesson.className = 'lesson_start_' + lesson.startPosition;
                    });

                    return day;
                });
            $rootScope.subtitle = $scope.title + ' ' + data.group_name;
            $scope.colWidth = Math.ceil((1 / data.days.length) * 100);
        });
});
