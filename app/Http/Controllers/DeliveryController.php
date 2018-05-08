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
use App\Apiuser;
use App\Delivery;
use App\Settings;
use App;
use Session;
use DateTime;
use Carbon\Carbon;

// Delivery controller for driver and user delivery management.
class DeliveryController extends Controller
{
	// To create new job. 
    public function New(Request $request){

    	//global declaration
		$ResponseData['success'] =  false;
		$ResponseData = array();
		
		//get data from request and process
		$PostData = Input::all();

		if (isset($PostData) && !empty($PostData)) {

            //make validator for facebook
			$ValidateFacebook = Validator::make(array(
				'user_id' => Input::get('user_id'),
				'lang' => Input::get('lang'),
				'pickup_address' => Input::get('pickup_address'),
				'pick_lat' => Input::get('pickup_address'),
				'pick_long' => Input::get('pickup_address'),
				'dropoff_address' => Input::get('dropoff_address'),
				'drop_lat' => Input::get('drop_lat'),
				'drop_long' => Input::get('drop_long'),
				'reciver_name' => Input::get('reciver_name'),
				'mo_no' => Input::get('mo_no')
			), array(
				'user_id' => 'required',
				'lang' => 'required',
				'pickup_address' => 'required',
				'pick_lat' => 'required',
				'pick_long' => 'required',
				'dropoff_address' => 'required',
				'drop_lat' => 'required',
				'drop_long' => 'required',
				'reciver_name' => 'required',
				'mo_no' => 'required'
			));
			
			if ($ValidateFacebook->fails()) {
				$ResponseData['message'] = $ValidateFacebook->messages()->first();
				$ResponseData['success'] =  false;
				$ResponseData['data'] = new stdClass();
			}else {
				
					App::setLocale($request->get('lang'));
					$newDelivery = new Delivery();
					$getConfig = Config('constant.FAIR_BASE_RATE');

					//Calculate the price for delivery.
					$countDistance = self::getDistance($request->get('pick_lat'), $request->get('pick_long'), $request->get('drop_lat'), $request->get('drop_long'), $request->get('dropoff_address'));
				
					if(isset($countDistance['rows']) && count($countDistance['rows']) > 0){
						$mainDistance = $countDistance['rows'][0]['elements'][0]['distance'];
						$cleanString = preg_replace("/[^0-9.]/", '', $mainDistance['text']);
						if($cleanString){
							$newDelivery->distance = $cleanString;
							// Now calculate the fair price.
							$getFairPrice = Settings::select('*')->where('id', $getConfig)->first()->toArray();
							$newDelivery->fair_price = $getFairPrice['value'] * $cleanString;
							$ResponseData['data']['estimate_price'] = number_format($getFairPrice['value'] * $cleanString, 2);
						}else{
							$newDelivery->distance = 'N/A';
						}
					}
					
					$newDelivery->user_id = $request->get('user_id');
					$newDelivery->pickup_address = $request->get('pickup_address');
					$newDelivery->pick_lat = $request->get('pick_lat');
					$newDelivery->pick_long = $request->get('pick_long');
					$newDelivery->dropoff_address = $request->get('dropoff_address');
					$newDelivery->drop_lat	= $request->get('drop_lat');
					$newDelivery->drop_long = $request->get('drop_long');
					$newDelivery->reciver_name = $request->get('reciver_name');
					$newDelivery->mo_no = $request->get('mo_no');
					$newDelivery->alt_mo_no = $request->get('alt_mo_no');
					$newDelivery->status = 1;
					$newDelivery->created_at = date('Y-m-d H:i:s');
					$newDelivery->save();

				// To get the new delivery.
				if($newDelivery){
					$ResponseData['success'] = true;
					$ResponseData['message'] = trans('message.message.POSTAD_SUCCESS');
					//$ResponseData['data'] = new stdClass();
				}else{
					$ResponseData['success'] =  false;
					$ResponseData['message'] = trans('message.general.GENERAL_ERROR');
					$ResponseData['data'] = new stdClass();
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

	// To get the job history
    public function Jobhistory(Request $request){

    	//global declaration
		$ResponseData['success'] =  false;
		$ResponseData = array();
		
		//get data from request and process
		$PostData = Input::all();

		if (isset($PostData) && !empty($PostData)) {

            //make validator for facebook
			$ValidateFacebook = Validator::make(array(
				'user_id' => Input::get('user_id'),
				'lang' => Input::get('lang'),
			), array(
				'user_id' => 'required',
				'lang' => 'required'
			));
			
			if ($ValidateFacebook->fails()) {
				$ResponseData['message'] = $ValidateFacebook->messages()->first();
				$ResponseData['success'] =  false;
				$ResponseData['data'] = new stdClass();
			}else {

				// To set the local language.
				App::setLocale($request->get('lang'));
				
				//Get the job history of user.
				$getJobHistory = Delivery::select('*')->where('user_id', $request->get('user_id'))->where('status', 1)->get()->toArray();

				if($getJobHistory){
					$ResponseData['success'] = true;
					$ResponseData['data'] = $getJobHistory;
				}else{
					$ResponseData['success'] = false;
					$ResponseData['data'] = array();
					$ResponseData['message'] = trans('message.message.JOB_HISTORY_IS_NOT_AVAILABLE');
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

    // To ge the new jobs for drivers
    public function Newsjobs(Request $request){

    	//global declaration
		$ResponseData['success'] =  false;
		$ResponseData = array();
		
		//get data from request and process
		$PostData = Input::all();

		if (isset($PostData) && !empty($PostData)) {

            //make validator for facebook
			$ValidateFacebook = Validator::make(array(
				'driver_id' => Input::get('driver_id'),
				'lang' => Input::get('lang'),
			), array(
				'driver_id' => 'required',
				'lang' => 'required'
			));
			
			if ($ValidateFacebook->fails()) {
				$ResponseData['message'] = $ValidateFacebook->messages()->first();
				$ResponseData['success'] =  false;
				$ResponseData['data'] = new stdClass();
			}else {

				// To set the local language.
				App::setLocale($request->get('lang'));
				
				//Get the job history of user.
				$getJobHistory = Delivery::select('*')->where('status', 1)->get()->toArray();

				if($getJobHistory){
					$ResponseData['success'] = true;
					$ResponseData['data'] = $getJobHistory;
				}else{
					$ResponseData['success'] = false;
					$ResponseData['data'] = array();
					$ResponseData['message'] = trans('message.message.JOB_HISTORY_IS_NOT_AVAILABLE');
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

    // To accept the job
    public function Acceptjob(Request $request){

		//global declaration
		$ResponseData['success'] =  false;
		$ResponseData = array();
		
		//get data from request and process
		$PostData = Input::all();

		if (isset($PostData) && !empty($PostData)) {

            //make validator for facebook
			$ValidateFacebook = Validator::make(array(
				'driver_id' => Input::get('driver_id'),
				'job_id' => Input::get('job_id'),
				'lang' => Input::get('lang'),
			), array(
				'driver_id' => 'required',
				'job_id' => 'required',
				'lang' => 'required'
			));
			
			if ($ValidateFacebook->fails()) {
				$ResponseData['message'] = $ValidateFacebook->messages()->first();
				$ResponseData['success'] =  false;
				$ResponseData['data'] = new stdClass();
			}else {
				// To set the local language.
				App::setLocale($request->get('lang'));

				$updateJob = Delivery::find($request->get('job_id'));
				$updateJob->driver_id = $request->get('driver_id');
				$updateJob->status = 2;
				$updateJob->save();

				// Print the response.
				$ResponseData['data'] = array();
				$ResponseData['success'] = true;
				$ResponseData['message'] = trans('message.message.GENERAL_SUCCESS');
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

	// To get the distance.
    public static function getDistance($point1_lat, $point1_long, $point2_lat, $point2_long, $destinationAddress, $unit = 'K', $decimals = 2) {
        
        //echo 'http://maps.googleapis.com/maps/api/distancematrix/json?origins='.$point1_lat.','.$point1_long.'|'.$point2_lat.','.$point2_long.'&destinations='.$destinationAddress.'=driving&sensor=false';die;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_URL, 'http://maps.googleapis.com/maps/api/distancematrix/json?origins='.$point1_lat.','.$point1_long.'|'.$point2_lat.','.$point2_long.'&destinations='.str_replace(" ","",$destinationAddress).'=driving&sensor=false');
		$content = curl_exec($ch);
		$countDistance = json_decode($content, true);
		return $countDistance;
    }


}
