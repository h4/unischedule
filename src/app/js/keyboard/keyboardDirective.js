var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .directive('keyboard', ['$cookies', function ($cookies) {
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
            controller: function ($rootScope, $element, $animate) {
                var that = this;

                $rootScope.fire = function (val) {
                    if (val != deleteSymbol) {
                        $rootScope.$emit('addSymbol', val);
                    } else {
                        $rootScope.$emit('removeSymbol');
                    }
                };

                $element.find('span').on('click', function () {
                    this.hide();
                }.bind(this));

                this.hide = function () {
                    $animate.addClass($element, 'keyboard_hidden');
                };

                this.show = function () {
                    $animate.removeClass($element, 'keyboard_hidden');
                    angular.element(document).one('click', function(e) {
                        console.log('hide');
                        this.hide();
                    }.bind(this));
                };

                $rootScope.rows = rows.map(function (row) {
                    var buttons = [];

                    while (row.length) {
                        buttons.push(row.slice(0, 1));
                        row = row.substr(1);
                    }

                    return buttons;
                });

                $rootScope.$on('searchFocus', function (e) {
                    if ($cookies.kiosk && $cookies.kiosk !== "0"){
                        that.show();
                    }
                });

                $element.on('click', function(e) {
                    e.stopPropagation();
                    return false
                });

                $rootScope.$on('hideKeyboard', function (e) {
                    that.hide();
                });
            },
            templateUrl: 'app/js/keyboard/keyboard.tpl.html'
        }
    }]);
