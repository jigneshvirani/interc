<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/manage', function () {
    return redirect('manage/login');
});

// To load the mastet of the dashboard
Route::middleware('admin')->get('manage/dashboard', function () {
    return view('layouts.master');
});
// To load the mastet of the dashboard
Route::middleware('admin')->get('manage/delivery', function () {
    return view('layouts.master');
});
// To load the mastet of the dashboard
Route::middleware('admin')->get('manage/drivers', function () {
    return view('layouts.master');
});
// To load the mastet of the dashboard
Route::middleware('admin')->get('manage/past-delivery', function () {
    return view('layouts.master');
});
// To load the mastet of the dashboard
Route::middleware('admin')->get('manage/users', function () {
    return view('layouts.master');
});
// To load the mastet of the dashboard
Route::middleware('admin')->get('manage/settings', function () {
    return view('layouts.master');
});
// To load the mastet of the dashboard
Route::middleware('admin')->get('manage/feedback', function () {
    return view('layouts.master');
});


## redirect to
Route::group(['prefix' => 'manage'], function () {
	
    //login bypass for the below listed controllers
    Route::resource('login', 'AdminloginController');
    Route::post('dologin', 'AdminloginController@Dologin');
    Route::post('forgotpassword', 'AdminloginController@Forgotpassword');
    Route::get('resetpassword', 'AdminloginController@Resetpassword');
    Route::post('doresetpassword', 'AdminloginController@Doresetpassword');
    Route::post('forgotpasswordapp', 'AdminloginController@ForgotpasswordApp');
    Route::get('resetpasswordapp', 'AdminloginController@ResetpasswordApp');
    Route::post('doresetpasswordapp', 'AdminloginController@DoresetpasswordApp');
    Route::get('logout', 'AdminloginController@Logout');
    Route::any('updateprofile', 'AdminloginController@Updateprofile');
    Route::any('updatepassword', 'AdminloginController@Updatepassword');
    Route::any('getadmininfo', 'AdminloginController@Getadmininfo');
    
});

Route::group(['prefix' => 'api'], function () {

    // User signup, login, forgot pasword, reset password
    Route::any('login', 'UserController@Dologin');
    Route::any('loginfb', 'UserController@DoLoginfacebook');
    Route::any('logingl', 'UserController@Dologingoogle');
    Route::any('dosignup', 'UserController@Dosignup');
    Route::get('forgotpasswordapp', 'UserController@Forgotpassword');
    // Driver routes
    //Route::any('');

    //Delivery routes
    Route::any('createdelivery', 'DeliveryController@New');
    Route::any('jobhistory', 'DeliveryController@Jobhistory');
    Route::any('newjobs', 'DeliveryController@Newsjobs');
    Route::any('acceptjob', 'DeliveryController@Acceptjob');


});

// For driver routes
Route::group(['prefix' => 'driver'], function () {

    Route::any('dosignup', 'DriverController@Dosignup');
    Route::any('dologin', 'DriverController@Dologin');
    Route::any('currentjobs', 'DriverController@Currentjobs');

});

Route::get('/', function () {
    return view('welcome');
});

