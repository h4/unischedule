var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .directive('notification', function () {
        var that = this;
        that.visible = false;

        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope.$on("loading-error", function (e) {
                    if (that.visible) {
                        return;
                    }
                    that.visible = true;
                    element.addClass('notification_visible');
                    setTimeout(function() {
                        element.removeClass('notification_visible');
                        that.visible = false;
                    }, 5000);
                });
            }
        };
    });
