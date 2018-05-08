
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Intercity: An courier delivery solution</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Intercity Courier delivery service administrator panel" name="description" />
        <meta content="" name="author" />
        <base href="<?= url('/') . '/' ?>">
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
        <link href="resources/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="resources/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
        <link href="resources/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="resources/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <link href="resources/assets/global/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
        <link href="resources/assets/global/plugins/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="resources/assets/plugins/bootstrap-sweetalert/sweetalert.css">
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="resources/assets/global/css/components-md.min.css" rel="stylesheet" id="style_components" type="text/css" />
        <link href="resources/assets/global/css/plugins-md.min.css" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN PAGE LEVEL STYLES -->
        <link href="resources/assets/pages/css/login-5.min.css" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL STYLES -->
        <!-- BEGIN THEME LAYOUT STYLES -->
        <!-- END THEME LAYOUT STYLES -->
         
        <link rel="shortcut icon" href="favicon.ico" /> 
        <style type="text/css">
            .user-login-5 .form-group.has-error {
                border-bottom : none !important;
            }
        </style>
    </head>
    <!-- END HEAD -->

    <body class=" login">
        <div class="overlay"></div>

        <div class="spinner spinner-loader">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>
        <!-- BEGIN : LOGIN PAGE 5-2 -->
        <div class="user-login-5">
            <div class="row bs-reset">
                <div class="col-md-6 login-container bs-reset">
                   <!--  <img class="login-logo login-6" src="resources/assets/pages/img/color_logo_transparent.svg" style="height: 100px;" /> -->
                    <div class="login-content">
                        <h1>Intercity Admin Login</h1>
                        <p> </p>
                        <form action="javascript:;" id="login-form" method="post">
                            {{ csrf_field() }}
                            <div class="alert alert-danger display-hide">
                                <button class="close" data-close="alert"></button>
                                <span>Enter any username and password. </span>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">
                                    <input class="form-control form-control-solid placeholder-no-fix form-group" type="text" autocomplete="off" placeholder="Username" name="email" required/> </div>
                                <div class="col-xs-6">
                                    <input class="form-control form-control-solid placeholder-no-fix form-group" type="password" autocomplete="off" placeholder="Password" name="password" required/> </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label class="rememberme mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="remember" value="1" /> Remember me
                                        <span></span>
                                    </label>
                                </div>
                                <div class="col-sm-8 text-right">
                                    <div class="forgot-password">
                                      <a id="forgot_link" href="#" data-toggle="modal" data-target="#forgot-password">Forgot Password?</a>
                                    </div>
                                    <button class="btn blue" type="submit">Sign In</button>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                    <div class="login-footer">
                        <div class="row bs-reset">
                            <div class="col-xs-7 bs-reset">
                                <div class="login-copyright text-right">
                                    <p>Copyright &copy; Intercity 2018</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="forgot-password" class="modal fade" role="dialog">
                            <div class="modal-dialog">
                                <!-- Modal content-->
                                <div class="modal-content border-radius-20 padding">
                                    <div class="col-md-12 text-center">
                                        <h2 class="font-green-sharp">Forgot password</h2>
                                    </div>
                                    <form action="javascript:;"  method="post" class="form form-horizontal forget-form" id="">
                                        {{ csrf_field() }}
                                        <div class="modal-body">
                                            <div class="info-section">
                                                <div class="form-body">
                                                      
                                                        <div class="form-group">
                                                          <label class="col-md-3 control-label">EMAIL :</label>
                                                              <div class="col-md-9">
                                                              <input type="text" class="form-control" name="email_fp" id="email_fp"> 
                                                          </div>
                                                      </div>
                                                    <!--   <div class="form-group">
                                                          <p>Temporary password will sent on email. You can update it from your Profile.</p>
                                                      </div> -->

                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-actions">
                                          <div class="row">
                                              <div class="col-md-offset-3 col-md-9">
                                                  <button type="submit" class="btn green">Send</button>
                                                  <button type="button" class="btn default">Cancel</button>
                                              </div>
                                          </div>
                                      </div>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                <div class="col-md-6 bs-reset">
                    <div class="login-bg"> </div>
                </div>
            </div>
        </div>
         <script>var BASEURL = '<?php echo Config('constants.path.BASEURL_MANAGE') ?>'</script>
        <!-- BEGIN CORE PLUGINS -->
        <script src="resources/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
        <script src="resources/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="resources/assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
        <script src="resources/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="resources/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="resources/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
        <!-- END CORE PLUGINS -->

        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <script src="resources/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
        <script src="resources/assets/global/plugins/jquery-validation/js/additional-methods.min.js" type="text/javascript"></script>
        <script src="resources/assets/global/plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
        <script src="resources/assets/global/plugins/backstretch/jquery.backstretch.js" type="text/javascript"></script>
        <script type="text/javascript" src="resources/assets/plugins/bootstrap-sweetalert/sweetalert.min.js"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="resources/assets/global/scripts/app.min.js" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        
        <!-- BEGIN PAGE LEVEL SCRIPTS -->
        <script src="resources/assets/pages/scripts/login-5.js" type="text/javascript"></script>
        {{ HTML::script('resources/assets/plugins/jquery-validation/js/jquery.validate.min.js') }}
        {{ HTML::script('resources/assets/plugins/bootstrap-sweetalert/sweetalert.min.js') }}
        {{ HTML::script('resources/assets/js/login.js') }}
        <!-- END PAGE LEVEL SCRIPTS -->
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        
        <!-- END THEME LAYOUT SCRIPTS -->
    </body>

</html>