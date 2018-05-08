<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
//load authorization library
use Hash;
//load session & other useful library
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

//define model
use View;
use Response;
use stdClass;
use App\Drivers;
use App\Driverlist;
use App\Delivery;
use DB;
use App;
use Session;
use DateTime;
use Carbon\Carbon;;
class DriverController extends Controller
{
    //

	// Do login for driver
    public function Dologin(Request $request){

    	//global declaration
		$ResponseData['success'] =  false;
		$ResponseData = array();
		
		//get data from request and process
		$PostData = Input::all();

		if (isset($PostData) && !empty($PostData)) {

            //make validator for facebook
			$ValidateFacebook = Validator::make(array(
				'email' => Input::get('email'),
				'lang' => Input::get('lang'),
				'password' => Input::get('password')
			), array(
				'email' => 'required',
				'lang' => 'required',
				'password' => 'required'
			));
			
			if ($ValidateFacebook->fails()) {
				$ResponseData['message'] = $ValidateFacebook->messages()->first();
				$ResponseData['success'] =  false;
				$ResponseData['data'] = new stdClass();
			}else {
				App::setLocale($request->get('lang'));

				$credentials = [
                    "email" => Input::get("email"),
                    "password" => Input::get("password"),
                    'status'=> 1
                ];
                
                if(Auth::guard('drivers')->attempt(['email' => Input::get("email"), 'password' => Input::get("password")])) {
					$getUserData = Drivers::where('email', $request->get('email'))->first()->toArray();
                	unset($getUserData['password']);
                	// Get user info.
                	$getuserinfo = Driverlist::GetProfile($getUserData['id']);
                	$ResponseData['data'] = $getuserinfo;
                    $ResponseData['success'] = true;
                    $ResponseData['message'] = trans('message.message.LOGIN_SUCCESS');
                } else {
                    $ResponseData['success'] = false;
                    $ResponseData['data'] = array();
                    $ResponseData['message'] = trans('message.message.LOGIN_ERROR');
                }
			}
		} else {
            //print error response
			$ResponseData['success'] =  false;
			$ResponseData['message'] = trans('message.message.INVALID_PARAMS');
			$ResponseData['data'] = new stdClass();
		}
		
		//print response.
		return Response::json($ResponseData, 200, [], JSON_NUMERIC_CHECK);
    }

    // Do signup for driver
    public function Dosignup(Request $request){

    	//global declaration
		$ResponseData['success'] =  false;
		//$ResponseData['message'] = Config('message.message.GENERAL_ERROR');
		$ResponseData = array();
		
		//get data from request and process
		$PostData = Input::all();

		if (isset($PostData) && !empty($PostData)) {

            //make validator for facebook
			$ValidateFacebook = Validator::make(array(
				'password' => Input::get('password'),
				'email' => Input::get('email'),
				'lang' => Input::get('lang'),
				'name' => Input::get('name'),
				'mobile' => Input::get('mobile')
			), array(
				'password' => 'required',
				'name' => 'required',
				'lang' => 'required',
				'email' => 'required',
				'mobile' => 'required'
			));
			
			if ($ValidateFacebook->fails()) {
				$ResponseData['message'] = $ValidateFacebook->messages()->first();
				$ResponseData['success'] =  false;
				$ResponseData['data'] = new stdClass();
			}else {
				
				App::setLocale($request->get('lang'));
				$checkUserExist = Drivers::where('email', $request->get('email'))->orwhere('mo_no', $request->get('mobile'))->get()->toArray();
				
				if(!$checkUserExist){
					
					// Not available
					$addUser = new Drivers();
					$addUser->name = $request->get('name');
					$addUser->email = Input::get('email');
					$addUser->mo_no = Input::get('mobile');
					$addUser->password = Hash::make(Input::get('password'));
					$addUser->is_verified = 0;
					$addUser->status = 1; // pending OTP verification;
					$addUser->created_at = date('Y-m-d H:i:s');
					$addUser->save();
					
					// To add user.
					if($addUser){
						## SEND AN EMAIL HERE.
						$ResponseData['success'] = true;
						$ResponseData['data'] = Drivers::find($addUser->id)->toArray();
						$ResponseData['message'] = trans('message.message.USER_SIGNIP');
					}
				}else{
					$ResponseData['success'] = false;
					$ResponseData['message'] = trans('message.message.USER_ALREADY_SIGNUP'); 
				}
			}
		} else {
			//print error response
			$ResponseData['success'] =  false;
			$ResponseData['message'] = trans('message.message.GENERAL_ERROR');
			$ResponseData['data'] = new stdClass();
		}
		
		//print response.
		return Response::json($ResponseData, 200, [], JSON_NUMERIC_CHECK);

    }

    // To get the current job
    public function Currentjobs(Request $request){

    	//global declaration
		$ResponseData['success'] =  false;
		//$ResponseData['message'] = Config('message.message.GENERAL_ERROR');
		$ResponseData = array();
		
		//get data from request and process
		$PostData = Input::all();

		if (isset($PostData) && !empty($PostData)) {

            //make validator for facebook
			$ValidateFacebook = Validator::make(array(
				'driver_id' => Input::get('driver_id'),
				'lang' => Input::get('lang')
			), array(
				'driver_id' => 'required',
				'lang' => 'required'
			));
			
			if ($ValidateFacebook->fails()) {
				$ResponseData['message'] = $ValidateFacebook->messages()->first();
				$ResponseData['success'] =  false;
				$ResponseData['data'] = new stdClass();
			}else {
				
				App::setLocale($request->get('lang'));
				
				// To get current delivery.
				$getCurrentJobs = Delivery::select('*')->where('driver_id', $request->get('driver_id'))->where()->get()->toArray();



			}
		} else {
			//print error response
			$ResponseData['success'] =  false;
			$ResponseData['message'] = trans('message.message.GENERAL_ERROR');
			$ResponseData['data'] = new stdClass();
		}
		
		//print response.
		return Response::json($ResponseData, 200, [], JSON_NUMERIC_CHECK);
    }

}
