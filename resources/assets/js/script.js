// script.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var app = angular.module('EthiaApp', ['ngRoute', 'ui.bootstrap']);

app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
}]);

app.config(function($logProvider) {
  $logProvider.debugEnabled(true);
});

// configure our routes
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    // route for the home page
    .when('/manage/dashboard', {
      controller: 'homeController',
      templateUrl: BASEURL + '/resources/views/angular/dashboard.html',
    })
    .when('/manage/delivery', {
      controller: 'deliveryController',
      templateUrl: BASEURL + '/resources/views/angular/delivery.html',
    })
    .when('/manage/past-delivery', {
      controller: 'pastdeliveryController',
      templateUrl: BASEURL + '/resources/views/angular/past-delivery.html',
    })
    .when('/manage/drivers', {
      controller: 'driverController',
      templateUrl: BASEURL + '/resources/views/angular/driver.html',
    })
    .when('/manage/users', {
      templateUrl: BASEURL + '/resources/views/angular/users.html',
      controller: 'usersController'
    })
    .when('/manage/settings', {
      templateUrl: BASEURL + '/resources/views/angular/settings.html',
      controller: 'settingsController'
    })
    .when('/manage/feedback', {
      controller: 'FeedbackController',
      templateUrl: BASEURL + '/resources/views/angular/feedback.html',
    }).
    otherwise({
        templateUrl: BASEURL + '/resources/views/front/404.html',
    });
 
  $locationProvider.html5Mode(true);
});

// Home controller
app.controller('homeController', function($scope, $http) {
  

  $http.get('manage/getdashboardstats', {
      cache: false
    }).
    success(function(response, status, headers, config) {
      console.log(response);
      $scope.dashboardState = response.data;
    }).
    error(function(data, status, headers, config) {});


  $(document).ready(function(){

     var chart = AmCharts.makeChart( "chartdiv", {
            "type": "serial",
            "theme": "light",
            //"dataProvider": jsonArray,
            "dataLoader": {
                "url": "manage/dashboardstateone"
            },
            "valueAxes": [ {
              "gridColor": "#3B3F51",
              "gridAlpha": 0.2,
              "dashLength": 0
            } ],
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [ {
              "balloonText": "[[category]]: <b>[[value]]</b>",
              "fillAlphas": 0.8,
              "lineAlpha": 0.2,
              "type": "line",
              "valueField": "visits"
            } ],
            "chartCursor": {
              "categoryBalloonEnabled": false,
              "cursorAlpha": 0,
              "zoomable": false
            },
            "categoryField": "Month",
            "categoryAxis": {
              "gridPosition": "start",
              "gridAlpha": 0,
              "labelRotation": 45,
              "tickPosition": "start",
              "tickLength": 20
            },
            "export": {
              "enabled": true
            }

      } );

       

       var chart = AmCharts.makeChart( "chartdiv2", {
            "type": "serial",
            "theme": "patterns",
             "dataLoader": {
                "url": "manage/dashboardstatesec"
            },
            "valueAxes": [ {
              "gridColor": "#FFFFFF",
              "gridAlpha": 0.2,
              "dashLength": 0
            } ],
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [ {
              "balloonText": "[[category]]: <b>[[value]]</b>",
              "fillAlphas": 0.8,
              "lineAlpha": 0.2,
              "type": "column",
              "valueField": "visits"
            } ],
            "chartCursor": {
              "categoryBalloonEnabled": false,
              "cursorAlpha": 0,
              "zoomable": false
            },
            "categoryField": "Month",
            "categoryAxis": {
              "gridPosition": "start",
              "gridAlpha": 0,
              "labelRotation": 45,
              "tickPosition": "start",
              "tickLength": 20
            },
            "export": {
              "enabled": true
            }

      } );

        function setDataSet(dataset_url) {
            AmCharts.loadFile(dataset_url, {}, function(data) {
              chart.dataProvider = AmCharts.parseJSON(data);
              chart.validateData();
            });
          }
      //chart.addListener("dataUpdated", zoomChart);
  

        // function zoomChart() {
        //     if (chart.zoomToIndexes) {
        //         chart.zoomToIndexes(130, chartData.length - 1);
        //     }
        // }
  });
});

app.controller('deliveryController', function($scope, $http) {
  console.log('delivery');
});

app.controller('pastdeliveryController', function($scope, $http) {
    console.log('pastdeliveryController');
});

app.controller('driverController', function($scope, $http) {
  console.log('driverController');
});

// Users controller
app.controller('usersController', function($scope, $http) {

  // Jquery operations
  $(document).ready(function() {

      var oTable2;
      $('#event_listing').dataTable({
            "processing": false,
            "serverSide": true,
            "bAutoWidth": false,
            "filter": true,
            "bStateSave": false, // save datatable state(pagination, sort, etc) in cookie.
            "ajax": {
              'type': 'POST',
              'url': BASEURL + "manage/getalluser",
              'data': function(d) {
                d.search = $('#search_user_string').val()
              }
            },
            "language": {
              "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
              },
              "emptyTable": "No User(s) available.",
              "info": "Found _START_ to _END_ of _TOTAL_ Users",
              "infoEmpty": "No art(s) found",
              "infoFiltered": "(filtered from _MAX_ total Users)",
              "lengthMenu": "View _MENU_ Users",
              "search": "Search:",
              "zeroRecords": "No matching Users found"
            },
            "dom": "<'row'<'col-md-6 col-sm-12'><'col-md-6 col-sm-12'>r>t<'row'<'col-md-3 col-sm-12'l><'col-md-4 col-sm-12'i><'col-md-5 col-sm-12 text-right'p>>",
            "aoColumns": [
              { "data": "id",  "name": "id", "searchable": true, "orderable": true },
              { "data": "name",  "name": "Name",  "searchable": true, "orderable": false },
              { "data": "email", "name": "Name", "searchable": true,  "orderable": false },
              { "data": "total_scan", "name": "Parent", "searchable": true, "orderable": false },
              { "data": "created_on",  "name": "Created at",  "searchable": false, "orderable": false },
              { "data": "action", "name": "Action", "searchable": false, "orderable": false }
            ],
            "lengthMenu": [
              [10, 30, 50, -1],
              [10, 30, 50, "All"] // change per page values here
            ],
            "pageLength": 10,
            "pagingType": "bootstrap_full_number"
      });

      oTable1 = $('#event_listing').DataTable();

      $('#search_user_string').keyup(function() {
        oTable1.search($(this).val()).draw();
      });

    // To delete the user.
    $(document).on('click', '.delete-currency', function() {

      // To delete the user.
      var currencyEditId = $(this).data('id');

      swal({
          title: "Are you sure?",
          text: "If you delete this user then it's removed from the application.",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, I am sure!',
          cancelButtonText: "No, cancel it!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          // Is user delete to confirmed.
          if (isConfirm) {
            swal({
              title: 'Deleted!',
              text: 'User is successfully removed!',
              type: 'success'
            }, function() {
              console.log('inside');
              // To Order details.
              $http.get('manage/deleteuser?id=' + currencyEditId, {
                cache: false
              }).
              success(function(data, status, headers, config) {
                oTable1.draw();
              }).
              error(function(data, status, headers, config) {});
            });
          } else {
            swal("Cancelled", "User not removed :)", "error");
          }
        });
    });

  });

});

app.controller('MyprofileController', function($scope, $http){
  
    console.log('asdas');

    $http.get('manage/getadmininfo', {
      cache: false
    }).
    success(function(response, status, headers, config) {
      console.log(response);
      $scope.adminInfo = response.data;
    }).
    error(function(data, status, headers, config) {});

      $('#profile-form').validate({
          errorElement: 'span', //default input error message container
          errorClass: 'help-block', // default input error message class
          focusInvalid: false, // do not focus the last invalid input
          rules: {
            name: {
              required: true
            },
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
              required: "Name is required."
            },
            email :{
              required: 'UPC code is required'
            }
          },
          invalidHandler: function(event, validator) { //display error alert on form submit
            $('.alert-danger', $('#brand-form')).show();
          },
          highlight: function(element) { // hightlight error inputs
            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
          },
          success: function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
          },
          errorPlacement: function(error, element) {
            if (element.is(':checkbox')) {
              error.insertAfter(element.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline"));
            } else if (element.is(':radio')) {
              error.insertAfter(element.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline"));
            } else {
              error.insertAfter(element); // for other inputs, just perform default behavior
            }
          },
          submitHandler: function(form) {

            //define form data
            var fd = new FormData($('#profile-form')[0]);
            //return false;
            $.ajax({
              url: BASEURL + 'manage/updateprofile',
              type: "post",
              processData: false,
              contentType: false,
              data: fd,
              beforeSend: function() {},
              success: function(res) {
                
                if (res.success == '1') // in case genre added successfully
                {
                  swal({
                    title: "Success!!",
                    text: res.message,
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonClass: "btn-success",
                    confirmButtonText: "Okay!",
                  });
                  //return false;
                  $('#profile-form')[0].reset();
                  //redirect to dashboard
                } else { // in case error occuer
                  swal({
                    title: "Error!!",
                    text: res.message,
                    type: "error",
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Try Again!",
                  });
                  return false;
                }
              },
              error: function(e) {
                swal({
                  title: "Error!!",
                  text: e.statusText,
                  type: "error",
                  confirmButtonClass: "btn-danger",
                  confirmButtonText: "Try Again!",
                });
                return false;
              },
              complete: function() {}
            }, "json");
            return false;
          }
      });


      $('#password-form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        rules: {
          name: {
            required: true
          },
          upc_code: {
            required: true
          }
        },
        messages: {
          name: {
            required: "Name is required."
          },
          upc_code :{
            required: 'UPC code is required'
          }
        },
        invalidHandler: function(event, validator) { //display error alert on form submit
          $('.alert-danger', $('#brand-form')).show();
        },
        highlight: function(element) { // hightlight error inputs
          $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        },
        success: function(label) {
          label.closest('.form-group').removeClass('has-error');
          label.remove();
        },
        errorPlacement: function(error, element) {
          if (element.is(':checkbox')) {
            error.insertAfter(element.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline"));
          } else if (element.is(':radio')) {
            error.insertAfter(element.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline"));
          } else {
            error.insertAfter(element); // for other inputs, just perform default behavior
          }
        },
        submitHandler: function(form) {
          //define form data
          var fd = new FormData($('#password-form')[0]);
          //return false;
          $.ajax({
            url: BASEURL + 'manage/updatepassword',
            type: "post",
            processData: false,
            contentType: false,
            data: fd,
            beforeSend: function() {},
            success: function(res) {
              
              if (res.success == '1') // in case genre added successfully
              {
                swal({
                  title: "Success!!",
                  text: res.message + ' Redirecting....',
                  type: "success",
                  showConfirmButton: true,
                   confirmButtonClass: "btn-success",
                    confirmButtonText: "Okay!",
                });
                //return false;
              } else { // in case error occuer
                swal({
                  title: "Error!!",
                  text: res.message,
                  type: "error",
                  confirmButtonClass: "btn-danger",
                  confirmButtonText: "Try Again!",
                });
                return false;
              }
            },
            error: function(e) {
              swal({
                title: "Error!!",
                text: e.statusText,
                type: "error",
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Try Again!",
              });
              return false;
            },
            complete: function() {}
          }, "json");
          return false;
        }
      });
});

//FeedbackController
app.controller('FeedbackController', function($scope, $http) {
  console.log('FF');
   // Jquery operations
  $(document).ready(function() {

      $('#feedback_list').dataTable({
            "processing": false,
            "serverSide": true,
            "bAutoWidth": false,
            "filter": true,
            "bStateSave": false, // save datatable state(pagination, sort, etc) in cookie.
            "ajax": {
              'type': 'POST',
              'url': BASEURL + "manage/feedbacklist",
              'data': function(d) {
                d.search = $('#search_user_string').val()
              }
            },
            "language": {
              "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
              },
              "emptyTable": "No Feedback(s) available.",
              "info": "Found _START_ to _END_ of _TOTAL_ Feedbacks",
              "infoEmpty": "No Feedback(s) found",
              "infoFiltered": "(filtered from _MAX_ total Feedbacks)",
              "lengthMenu": "View _MENU_ Feedbacks",
              "search": "Search:",
              "zeroRecords": "No matching Feedbacks found"
            },
            "dom": "<'row'<'col-md-6 col-sm-12'><'col-md-6 col-sm-12'>r>t<'row'<'col-md-3 col-sm-12'l><'col-md-4 col-sm-12'i><'col-md-5 col-sm-12 text-right'p>>",
            "aoColumns": [
              { "data": "id",  "name": "id", "searchable": false, "orderable": true },
              { "data": "user_name",  "name": "User Name", "searchable": false, "orderable": true },
              { "data": "feedback",  "name": "Feedback",  "searchable": false, "orderable": false },
              { "data": "created_on",  "name": "Created at",  "searchable": false, "orderable": false },
              { "data": "action", "name": "Action", "searchable": false, "orderable": false }
            ],
            "lengthMenu": [
              [10, 30, 50, -1],
              [10, 30, 50, "All"] // change per page values here
            ],
            "pageLength": 10,
            "pagingType": "bootstrap_full_number"
          });

          oTable1 = $('#feedback_list').DataTable();

          $('#search_user_string').keyup(function() {
            oTable1.search($(this).val()).draw();
          });

      // To delete the user.
      $(document).on('click', '.delete-product', function() {

          // To delete the user.
          var currencyEditId = $(this).data('id');

          swal({
              title: "Are you sure?",
              text: "If you delete this Feedback.",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Yes, I am sure!',
              cancelButtonText: "No, cancel it!",
              closeOnConfirm: false,
              closeOnCancel: false
            },
            function(isConfirm) {
              // Is user delete to confirmed.
              if (isConfirm) {
                swal({
                  title: 'Deleted!',
                  text: 'Feedback is successfully removed!',
                  type: 'success'
                }, function() {
                  console.log('inside');
                  // To Order details.
                  $http.get('manage/deletefeedback?id=' + currencyEditId, {
                    cache: false
                  }).
                  success(function(data, status, headers, config) {
                    oTable1.draw();
                  }).
                  error(function(data, status, headers, config) {});
                });
              } else {
                swal("Cancelled", "Feedback not removed :)", "error");
              }
            });
      });

  });
});

// Main controller
app.controller('mainController', function($scope, $rootScope, $location, $http) {
  // create a message to display in our view
  //$('.selectpicker').selectpicker();

    $http.get('manage/getadmininfo', {
      cache: false
    }).
    success(function(response, status, headers, config) {
      $scope.adminInfo = response.data;
    }).
    error(function(data, status, headers, config) {});

    $scope.isActive = function (path) {
        return ($location.path().substr(1, $location.path().length) === path[0]) ? 'true' : '';
    }
});
