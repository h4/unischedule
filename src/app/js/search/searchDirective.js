var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .directive('search', ['$rootScope', function($rootScope) {
        return {
            restrict: 'E',
            controller: function($scope, $element, $attrs, $transclude, $location) {
                switch ($attrs.kind) {
                    case 'teachers':
                        $scope.placeholder = 'Поиск по фамилии преподавателя';
                        break;
                    default :
                        $scope.placeholder = 'Поиск по номеру группы';
                        break;
                }

                if ('restore' in $attrs) {
                    $scope.searchString = $location.search().q || "";
                } else {
                    $scope.searchString = "";
                }

                $scope.dispatchFocused = function() {
                    $rootScope.$broadcast('searchFocus');
                };

                $scope.submitSearch = function() {
                    if ($scope.searchString) {
                        $rootScope.$broadcast('hideKeyboard');
                        $location.path('/search').search({
                            kind: $element.attr('kind'),
                            q: $scope.searchString
                        });
                    }
                };

                $scope.keyupHandler = function(e) {
                    if (e.keyCode === 13) {
                        $scope.submitSearch();
                    }
                };

                $scope.listeners = [];

                $scope.listeners.push($rootScope.$on('addSymbol', function (e, symbol) {
                    $scope.searchString += symbol;
                }));

                $scope.listeners.push($rootScope.$on('removeSymbol', function () {
                    $scope.searchString = $scope.searchString.slice(0, -1);
                }));
            },
            link: function(scope, element, attrs) {
                scope.$on('$destroy', function() {
                    scope.listeners.forEach(function(fn) {
                        fn();
                    });

                    scope.listeners = [];
                });
            },
            templateUrl: 'app/js/search/search.tpl.html'
        }
    }]);
