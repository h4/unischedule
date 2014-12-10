var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .directive('back', ['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
        return {
            restrict: 'E',
            controller: ['$scope', '$element', function ($scope, $element) {
                $rootScope.$on('$locationChangeSuccess', function() {
                    $element.toggleClass('back_visible', ($location.path() !== '/'));
                });

                $element.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    $window.history.back();
                });
            }]
        }
    }]);
