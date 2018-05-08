/*
 Author  : Komal Kapadi (komal@creolestudios.com)
 Date    : 28th July 2017
 Purpose : All the api's related to user module
 */
angular.module('StreetTunesApp').factory('userfactory', ['$http',
    function ($http) {
        return {
            // get Locations as states
            getLocations: function () {
                $('.spinner-loader').show();
                var promise = $http.get('locationListing').then(function (response) {
                    return response.data;
                }, function (error) {
                    return false;
                })
                $('.spinner-loader').hide();
                return promise;
            },
            // Get Full User detail
            getUser: function (data) {
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
                $('.spinner-loader').hide();
            },
            // Block user
            blockUnblockUser: function (data) {
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
            groupOfUsers: function (data) {
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
            getAdminDetail: function (data) {
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
                $('.spinner-loader').hide();
            },
            // Get Current login admin detail
            editAdminDetail: function (data) {
                $('.spinner-loader').show();
                console.log('user factory');
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'editAdminDetail'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            logout: function (data) {
                $('.spinner-loader').show();
                console.log('user factory');
                return $http({
                    method: 'GET',
                    data: data,
                    url: 'logout'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            // Get Question asked by particular user.
            forumQuestionsOfUser: function (data) {
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
                $('.spinner-loader').hide();
            },
            // Get Question asked by particular user.
            forumAnswersOfUser: function (data) {
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
                $('.spinner-loader').hide();
            },
            // Get Question asked by particular user.
            userUploadedEvents: function (data) {
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
                $('.spinner-loader').hide();
            },
            // Get Question asked by particular user.
            userParticipatedEvents: function (data) {
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
                $('.spinner-loader').hide();
            },
            users: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'users'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            groups: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'groups'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            getGroupMembers: function (data) {
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
 Author  : Komal Kapadi (komal@creolestudios.com)
 Date    : 28th July 2017
 Purpose : All the api's related to group module
 */
angular.module('StreetTunesApp').factory('groupfactory', ['$http',
    function ($http) {
        return {
            // Groups listing
            getGroups: function (data) {
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
            getGroupDetail: function (data) {
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
            getGroupMembers: function (data) {
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
            },
            getGroupPosts: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'getGroupPosts'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                var promise = $http.get('locationListing').then(function (response) {
                    return response.data;
                }, function (error) {
                    return false;
                })
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
    function ($http) {
        return {
            getTerms: function (data) {
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
            updateTerms: function (data) {
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
/*
 Author  : Ashish Patel (ashish@creolestudios.com)
 Date    : 23rd August 2017
 Purpose : All the api's related to Subscriptions
 */
angular.module('StreetTunesApp').factory('subscriptionfactory', ['$http',
    function ($http) {
        return {
            // to get event limit and cost
            getCost: function () {
                $('.spinner-loader').show();
                return $http({
                    method: 'GET',
                    url: 'getCost'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            // to update event limit and cost
            editCost: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'editCost'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            // get subscribed users and details
            subscribedUsers: function () {
                return $http({
                    method: 'GET',
                    url: 'subscribedUsers'
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
angular.module('StreetTunesApp').factory('eventfactory', ['$http',
    function ($http) {
        return {
            // Events listing
            eventListing: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'eventListing'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            // Get tabs detail of particular event
            getEventDetail: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'GET',
                    data: data,
                    url: 'getEventDetail?encrypt_event_id=' + data
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            eventUsers: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'eventUsers'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
        };
    }
]);
/*
 Author  : Komal Kapadi (komal@creolestudios.com)
 Date    : 20th November 2017
 Purpose : All the api's related to category module
 */
angular.module('StreetTunesApp').factory('categoryfactory', ['$http',
    function ($http) {
        return {
            // Events listing
            // Get tabs detail of particular event
            getCategories: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'GET',
                    data: data,
                    url: 'categoryListing'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            groupListingByCategoryId: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'groupListingByCategoryId'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            categoryDataById: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'categoryDataById'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            updateGroupCategory: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'updateGroupCategory'
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
 Author  : Komal Kapadi (komal@creolestudios.com)
 Date    : 22nd November 2017
 Purpose : All the api's related to forum module
 */
angular.module('StreetTunesApp').factory('forumfactory', ['$http',
    function ($http) {
        return {
            getQuestionList: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'getQuestionList'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            forumCategoryDataById: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'forumCategoryDataById'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            // Get tabs detail of particular event
            getEventDetail: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'GET',
                    data: data,
                    url: 'getEventDetail?encrypt_event_id=' + data
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            deleteQuestion: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'deleteQuestion'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            getAnswersList: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'getAnswersList'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            forumQuestionDataById: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'forumQuestionDataById'
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
 Author  : Komal Kapadi (komal@creolestudios.com)
 Date    : 27th November 2017
 Purpose : All the api's related to snpa module
 */
angular.module('StreetTunesApp').factory('snapfactory', ['$http',
    function ($http) {
        return {
            activityListing: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'activityListing'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            snapListing: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'snapListing'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            getPostComments: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'getPostComments'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            getPostReports: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'getPostReports'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            getPostDetail: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'getPostDetail'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            deletePost: function (data) {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
                    data: data,
                    url: 'deletePost'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            dashboardEvents: function () {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
//                    data: data,
                    url: 'dashboardEvents'
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
                $('.spinner-loader').hide();
            },
            dashboardUsers: function () {
                $('.spinner-loader').show();
                return $http({
                    method: 'POST',
//                    data: data,
                    url: 'dashboardUsers'
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