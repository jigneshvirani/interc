//###############################################################
//File Name : user.js 
//Author : Komal Kapadi <komal@creolestudios.com>
//Purpose : jQUery functions related to user module
//Date : 9th August 2017
//###############################################################
console.log('loaded');

$('.logout_link').click(function (e) {
    e.preventDefault();
    location.href = BASEURL + 'manage/logout';
});
