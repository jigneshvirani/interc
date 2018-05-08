$(".spinner-loader").hide();
var login_validation = '';
var forgot_validation = '';
var Login = function () {
    var handleLogin = function () {
        login_validation = $('#login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },
            messages: {
                email: {
                    required: "Email address is required.",
                    email: "Invalid email address."
                },
                password: {
                    required: "Password is required."
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit   
                $('.alert-danger', $('#login-form')).show();
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function (error, element) {
                if (element.is(':checkbox')) {
                    error.insertAfter(element.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline"));
                } else if (element.is(':radio')) {
                    error.insertAfter(element.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            submitHandler: function (form) {
                //define form data
                var fd = new FormData();
                //append data                
                $.each($('#login-form').serializeArray(), function (i, obj) {
                    fd.append(obj.name, obj.value)
                })

                $.ajax({
                    url: BASEURL + 'manage/dologin',
                    type: "post",
                    processData: false,
                    contentType: false,
                    data: fd,
                    beforeSend: function () {
                    },
                    success: function (res) {
                        if (res.status == '1')// in case genre added successfully
                        {
                            swal({
                                title: "Success!!",
                                text: res.message + ' Redirecting....',
                                type: "success",
                                showConfirmButton: false
                            });
                            $('#login-form')[0].reset();
                            //redirect to dashboard
                            setTimeout(function () {//redirect to dashboard after 3 seconds
                                location.href = BASEURL + 'manage/dashboard';
                            }, 2500);


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
                    error: function (e) {

                        swal({
                            title: "Error!!",
                            text: e.statusText,
                            type: "error",
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "Try Again!",
                        });
                        //return false
                        return false;
                    },
                    complete: function () {
                    }
                }, "json");
                return false;

            }
        });
    }

    var handleForgetPassword = function (e) {
        forgot_validation = $('.forget-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                email_fp: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email_fp: {
                    required: "Email address is required."
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit 
                $('.alert-danger', $('.forget-form')).show();
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function (error, element) {
                if (element.is(':checkbox')) {
                    error.insertAfter(element.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline"));
                } else if (element.is(':radio')) {
                    error.insertAfter(element.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            submitHandler: function (form) {
                //define form data
                var fd = new FormData();
                //append data                
                $.each($('.forget-form').serializeArray(), function (i, obj) {
                    fd.append(obj.name, obj.value)
                })

                $.ajax({
                    url: BASEURL + 'manage/forgotpasswordapp',
                    type: "post",
                    processData: false,
                    contentType: false,
                    data: fd,
                    beforeSend: function () {
                        $(".spinner-loader").show();
                        console.log('before send');
                    },
                    success: function (res) {
                        $('#forgot-password').modal('hide');

                        if (res.status == '1')// in case genre added successfully
                        {
                            //redirect to dashboard
                            $(".spinner-loader").hide();
                            swal({
                                title: "Success!!",
                                text: res.message,
                                type: "success",
                                showConfirmButton: true,
                                confirmButtonClass: "btn-success",
                                confirmButtonText: "I Got It!!",
                            });
                            $('.forget-form')[0].reset();
                            $('.fa-times-circle-o').click();
                            return false;

                        } else { // in case error occue
                            $(".spinner-loader").hide();
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
                    error: function (e) {
                        //called when there is an error
//                        App.stopPageLoading();
                        swal({
                            title: "Error!!",
                            text: res.message,
                            type: "error",
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "Try Again!",
                        });
                        return false;
                    },
                    complete: function () {
//                        App.stopPageLoading();
                    }
                }, "json");
                return false;
            }
        });
    }

    $('#login-form input').keypress(function (e) {
        if (e.which == 13) {
            $('#login-form').submit();
            return false;
        }
    });

    $('.forget-form input').keypress(function (e) {
        if (e.which == 13) {
            $('.forget-form').submit();
            return false;
        }
    });
    $(document).on('click','#forgot_link', function (e) {
        e.preventDefault();
        $('#forgot-password').modal('show');
        login_validation.resetForm();
        forgot_validation.resetForm();
    });

    return {
        //main function to initiate the module
        init: function () {

            handleLogin();
            handleForgetPassword();

            // init background slide images
            $('.login-bg').backstretch([
                "resources/assets/pages/img/login/bg1.png",
                "resources/assets/pages/img/login/bg2.png",
                "resources/assets/pages/img/login/bg3.png"
                ], {
                  fade: 1000,
                  duration: 8000
                }
            );
        }
    };
}();

jQuery(document).ready(function () {
    Login.init();
});