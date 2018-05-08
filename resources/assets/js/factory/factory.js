/*
 Author  : Komal Kapadi (komal@creolestudios.com)
 Date    : 28th July 2017
 Purpose : All the api's related to user module
 */
angular.module('StreetTunesApp').factory('userfactory', ['$http',
    function($http) {
        $('.spinner-loader').show();
        return {
            // Users listing
            getUsers: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'userListing'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
            },
            // get Locations as states
            getLocations: function() {
                $('.spinner-loader').show();
                var promise = $http.get('locationListing').then(function(response) {
                    return response.data;
                }, function(error) {
                    return false;
                })
                return promise;
            },
            // Get Full User detail
            getUser: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'GET',
                    data: data,
                    url: 'userDetail?encrypt_id=' + data
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
            },
            // Block user
            blockUnblockUser: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'blockUnblockUser'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            // Get GROUP tab detail of user detail page
            groupOfUsers: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'groupOfUsers'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            // Get Current login admin detail
            getAdminDetail: function(data) {
                $('.spinner-loader').show();
                console.log('user factory');
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'getAdminDetail'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
            },
            // Get Question asked by particular user.
            forumQuestionsOfUser: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'forumQuestionsOfUser'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
            },
            // Get Question asked by particular user.
            forumAnswersOfUser: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'forumAnswersOfUser'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
            },
            // Get Question asked by particular user.
            userUploadedEvents: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'userUploadedEvents'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
            },
            // Get Question asked by particular user.
            userParticipatedEvents: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'userParticipatedEvents'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
            }
        };
    }
]);
/*
 Author  : Komal Kapadi (komal@creolestudios.com)
 Date    : 28th July 2017
 Purpose : All the api's related to group module
 */
angular.module('StreetTunesApp').factory('groupfactory', ['$http',
    function($http) {
        return {
            // Groups listing
            getGroups: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'groupListing'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            // Get tabs detail of group,forum,snaps,event
            getGroupDetail: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'GET',
                    data: data,
                    url: 'getGroupDetail?encrypt_group_id=' + data
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            getGroupMembers: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'getGroupMembers'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            }
        };
    }
]);
/*
 Author  : Ashish Patel (ashish@creolestudios.com)
 Date    : 21st August 2017
 Purpose : All the api's related to Terms module
 */
angular.module('StreetTunesApp').factory('privacyfactory', ['$http',
    function($http) {
        return {
            getTerms: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'GET',
                    data: data,
                    url: 'getTerms/' + data
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            updateTerms: function(data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'updateTerms'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            }
        };
    }
]);