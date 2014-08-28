var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .directive('keyboard', function () {
        var deleteSymbol = "←",
            rows = [
            'ё1234567890-' + deleteSymbol,
            'йцукенгшщзхъ',
            'фывапролджэ/',
            'ячсмитьбю',
            ' '
        ];

        return {
            restrict: 'E',
            controller: function ($scope, $element, $animate) {
                var that = this;

                $scope.fire = function(val) {
                    if (val != deleteSymbol) {
                        $scope.$emit('addSymbol', val);
                    } else {
                        $scope.$emit('removeSymbol');
                    }
                };

                this.hide = function() {
                    $animate.addClass($element, 'ng-hide');
                };

                this.show = function() {
                    $animate.removeClass($element, 'ng-hide');
                };

                $scope.rows = rows.map(function (row) {
                    var buttons = [];

                    while (row.length) {
                        buttons.push(row.slice(0, 1));
                        row = row.substr(1);
                    }

                    return buttons;
                });

                $scope.$on('searchFocus', function(e) {
                    that.show();
                });
            },
            scope: {},
            templateUrl: 'app/js/keyboard/keyboard.tpl.html'
        }
    })
;
