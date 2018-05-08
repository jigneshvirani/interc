/*
 Author  : Jignesh  Virani(jignesh@cizotech.com)
 Date    : 10th August 2017
 Name    : Customangular 
 Purpose : Contains Routes, directive and basic methods like checklogin,run etc..
 */
// JavaScript Document
app = angular.module('StreetTunesApp', ['ngRoute', 'ui.bootstrap', 'oc.lazyLoad']);
/*Check if user logout it redirect the login page.*/
function checklogin(param) {
    if (param.hasOwnProperty('logout')) {
        window.location = 'manage/login';
    } else {
        return true;
    }
}
// To change the interolate provider need to change it's originonal brackets.
app.config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);
//for changing title
app.run(['$location', '$rootScope', '$http', '$timeout', function ($location, $rootScope, $http, $timeout) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.$$route != undefined)
            $rootScope.title = current.$$route.title;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
}]);
//end
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/manage/dashboard', {
        templateUrl: BASEURL + '/resources/views/angular/dashboard.html',
        controller: 'DashboardController',
        title: 'TradeTalk :: Dashboard'
    })
    .when('/manage/items', {
        templateUrl: BASEURL + '/resources/views/angular/items.html',
        controller: 'ItemsController',
        title: 'TradeTalk :: Crypto Currency'
    })
    //advertise
    .when('/manage/category', {
        templateUrl: BASEURL + '/resources/views/angular/advertise.html',
        controller: 'CategoryController',
        title: 'TradeTalk :: Advertise'
    })
    .when('/manage/my-profile', {
        templateUrl: BASEURL + '/resources/views/angular/my-profile.html',
        controller: 'MyprofileController',
        title: 'TradeTalk :: My Profile'
    })
    .when('/manage/logout', {
        controller: 'LogoutController',
        title: 'TradeTalk:: Logout'
    }).otherwise({
        redirectTo: '/manage/dashboard'
    });
    $locationProvider.html5Mode(true);
}]);

console.log('asdsadas');
// Dashboard controller
app.controller('DashboardController', ['$http', '$scope', '$timeout', '$rootScope', '$filter', function ($http, $scope, $timeout, $rootScope, $filter, snapfactory) {
        console.log('dashboard controller loaded');
        // To Order details.
        $http.get('getdashboard', {cache: false}).
        success(function (data, status, headers, config) {
            $timeout(function() {
                console.log(data);
                $scope.dashboard= data;    
            }, 500);
        }).
        error(function (data, status, headers, config) {
        });
}]);


// For job detailed section.
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode == 13) {
        evt.preventDefault();
        $('#sendmessageid').click();
    }
}

function SetScrollForDashboard() {
    function setHeight() {
        windowHeight = $(window).innerHeight();
        sidbarheight = $(window).innerHeight() - 150;
        $('.assigned-pickup-delivery, .assigned-driver-delivery').css('height', windowHeight);
        $('.sidebar-overflow').css('height', sidbarheight);
    }
    setHeight();
    $(window).resize(function () {
        setHeight();
    });
}

function getTimerDateTime() {
    // Set the date we're counting down to
    var countDownDate = new Date("Jan 5, 2018 15:37:25").getTime();
    // Update the count down every 1 second
    var x = setInterval(function () {
        // Get todays date and time
        var now = new Date().getTime();
        // Find the distance between now an the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
        // If the count down is over, write some text 
    }, 1000);
}
//for loader
/*CONFIG*/
app.run(function ($rootScope, $location, $route, $timeout) {
    $rootScope.layout = {};
    $rootScope.layout.loading = false;
    $rootScope.$on('$routeChangeStart', function () {
        $timeout(function () {
            $rootScope.layout.loading = true;
        });
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $rootScope.layout.loading = false;
        }, 200);
    });
    $rootScope.$on('$routeChangeError', function () {
        $rootScope.layout.loading = false;
    });
});
app.config(function ($httpProvider) {
    $httpProvider.responseInterceptors.push('myHttpInterceptor');
    var spinnerFunction = function spinnerFunction(data, headersGetter) {
        $(".spinner-loader").show();
        return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);
});
app.factory('myHttpInterceptor', function ($q, $window) {
    return function (promise) {
        return promise.then(function (response) {
            checklogin(response.data);
            $(".spinner-loader").hide();
            return response;
        }, function (response) {
            $(".spinner-loader").hide();
            return $q.reject(response);
        });
    };
});
app.directive('scrollTrigger', function ($window) {
    return {
        link: function (scope, element, attrs) {
            var offset = parseInt(attrs.threshold) || 0;
            var e = jQuery(element[0]);
            var doc = jQuery(document);
            angular.element(document).bind('scroll', function () {
                if (doc.scrollTop() + $window.innerHeight + offset > e.offset().top) {
                    scope.$apply(attrs.scrollTrigger);
                }
            });
        }
    };
});
// Disable console.log if mode is production.
if (project_mode == 'production')
    console.log = function () {
    }
// new directive to activate Ckeditor
app.directive('ckeditor', function () {
    return {
        require: '?ngModel',
        link: function (scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0], {
                toolbar: [{
                    name: 'document',
                    items: ['Print']
                }, {
                    name: 'styles',
                    items: ['Format', 'Font', 'FontSize']
                }, {
                    name: 'basicstyles',
                    items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting']
                }, {
                    name: 'colors',
                    items: ['TextColor', 'BGColor']
                }, {
                    name: 'align',
                    items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                }, {
                    name: 'paragraph',
                    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
                }, ]
            });
            if (!ngModel)
                return;
            ck.on('instanceReady', function () {
                ck.setData(ngModel.$viewValue);
            });

            function updateModel() {
                scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            }
            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);
            ngModel.$render = function (value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
});