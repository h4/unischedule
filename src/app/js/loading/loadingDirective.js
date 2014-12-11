var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .directive('loading', function () {
        var that = this;
        that.processCount = 0;

        return {
            restrict: 'E',
            link: function ($rootScope, $element, $attrs) {

                $rootScope.$on("loading-started", function (e) {
                    that.processCount++;
                    $element.addClass('loading_process');
                });

                $rootScope.$on("loading-complete", function (e) {
                    that.processCount--;
                    if (that.processCount === 0) {
                        $element.removeClass('loading_process');
                    }
                });

                $rootScope.$on("loading-error", function (e) {
                    that.processCount--;
                    if (that.processCount === 0) {
                        $element.removeClass('loading_process');
                    }
                });
            }
        };
    });

