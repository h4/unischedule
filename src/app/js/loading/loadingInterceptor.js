var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(['$q', '$rootScope', function ($q, $rootScope) {
        return {
            'request': function (config) {
                $rootScope.$broadcast('loading-started');
                return config || $q.when(config);
            },
            'response': function (response) {
                if (response.data.error) {
                    $rootScope.$broadcast('loading-error');

                    return $q.reject(response);
                }
                $rootScope.$broadcast('loading-complete');
                return response || $q.when(response);
            },
            'requestError': function (rejection) {
                $rootScope.$broadcast('loading-error');
                return rejection || $q.reject(rejection);
            },
            'responseError': function (rejection) {
                $rootScope.$broadcast('loading-error');
                return rejection || $q.reject(rejection);
            }
        };
    }]);
}]);
