<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ratings extends Model
{
   
    //
     /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'driver_id','job_id', 'rating', 'text', 'status','created_at'
    ];
    
    //Define the table name
    protected $table = 'driver_ratings';
}
