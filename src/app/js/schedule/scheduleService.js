var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.service('ScheduleService', function(data) {
    this.items = data.days;
});
