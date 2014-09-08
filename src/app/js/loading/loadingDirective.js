var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .directive('loading', function () {

        return {
            restrict: 'E',
            link : function(scope, element, attrs) {
                    scope.$on("loading-started", function(e) {
                        element.addClass('loading_process');
                    });

                    scope.$on("loading-complete", function(e) {
                        element.removeClass('loading_process');
                    });

                }
        };
    });

