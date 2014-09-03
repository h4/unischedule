var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .provider("APIUrls", function () {
        var that = this;

        this.hostname = "";
        this.path = "";
        this.port = "";
        this.secure = false;
        this.urls = {};

        this.$get = function () {  // $get will return the singleton instance of the service
            return {
                hostname: that.hostname,
                path: that.path,
                port: that.port,
                secure: that.secure,
                urls: that.urls,
                getUrl: function (key) {
                    var url = this.urls[key],
                        argsArray;
                    // allow the user to use a function which generates the url depending on some params
                    if (angular.isFunction(url)) {
                        argsArray = Array.prototype.slice.call(arguments);
                        argsArray.splice(0, 1);
                        url = url.apply(null, argsArray);
                    }

                    return (this.secure ? "https://" : "http://") +
                        this.hostname +
                        ":" +
                        this.port +
                        this.path +
                        url;
                }
            }
        }
    });