<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    //

    //
     /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'user_id','driver_id', 'pickup_address','pick_lat', 'pick_long', 'dropoff_address','drop_lat','drop_long', 'picked_up_at', 'droped_at', 'reciver_name','mo_no','alt_mo_no', 'status','created_at'
    ];
    
    //Define the table name
    protected $table = 'deliveries';
}
