var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.factory('Schedule', function($resource) {
    return $resource('http://ruz2.spbstu.ru/api/v1/ruz/scheduler/:id');
});
