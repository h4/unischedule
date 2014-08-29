var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .directive('search', function() {
        return {
            restrict: 'E',
            controller: function($rootScope, $element, $attrs, $transclude, $location) {
                $rootScope.searchString = "";

                $rootScope.dispatchFocused = function() {
                    $rootScope.$broadcast('searchFocus');
                };

                $rootScope.submitSearch = function() {
                    if ($rootScope.searchString) {
                        $rootScope.$broadcast('hideKeyboard');
                        $location.path('/search').search({
                            kind: $element.attr('kind'),
                            q: $rootScope.searchString
                        });
                    }
                };

                $rootScope.$on('addSymbol', function (e, symbol) {
                    $rootScope.searchString += symbol;
                });

                $rootScope.$on('removeSymbol', function () {
                    $rootScope.searchString = $rootScope.searchString.slice(0, -1);
                });
            },
            templateUrl: 'app/js/search/search.tpl.html'
        }
    });
