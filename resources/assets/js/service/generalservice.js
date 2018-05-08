(function(){
    angular.module('StreetTunesApp')
      .service('generalservice', ['$http', function($http){
        var me = this;
        function getCurrentAdmin(callback) {
            // if the user has already been retrieved then do not do it again, just return the retrieved instance
            if(me.currentUser)
                calback(me.currentUser);
            // retrieve the currentUser and set it as a property on the service
            $http.get('http://localhost:4000/api/current_user').then(function(res){
              // set the result to a field on the service
              me.currentUser = res.data;
              // call the callback with the retrieved user
              callback(me.currentUser);
            });
        }
        return {getUser:getUser}
      }]);
    })();