<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class Driverlist extends Model
{
     ///
     /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [ 

    	'name', 'value','status','created_at'
    ];
    
    //Define the table name
    protected $table = 'settings';


    public static function GetProfile($UserId){

        //global declaraton.
        $ReturnData = array();

        $queryUser = DB::table('drivers')
                    ->select(DB::Raw('id as user_id'), 'name',
                                'email',
                                'mo_no',
                                'profile_pic')
                    ->where('id', $UserId)
                    ->first();

        $userData = json_decode(json_encode($queryUser), true);
        
        // To user data
        if ($userData) {
            // Profile picture.
            if($userData['profile_pic'] !=''){
               $userData['profile_pic'] = self::Getuserphoto(array('user_id' => $userData['user_id'])); 
            }else{
               $userData['profile_pic'] =  url('resources/uploads/profilepic/').'/'.'default.png';
           }

            $ReturnData['status'] = true;
            $ReturnData['user_data'] = $userData;
        } else {
            $ReturnData['status'] = false;
        }

        return $ReturnData;
    }

}
