<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Settings extends Model
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

}
