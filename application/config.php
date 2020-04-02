<?php

//These constants  reflect the column names in your user table
//These collumn names  will be used in SQL queries to read, write, and update usernames and  passwords
//You have to include all of these columns or this system will not work correctly  
define("USER_TABLE_NAME", "user_accounts");
define("USER_ID_FIELD", "user_id");
define("USERNAME_FIELD", "user_name");
define("USER_PASSWORD_FIELD", "user_password");
define("USER_EMAIL_FIELD", "user_email");
define("FAILED_LOGIN_COUNT_FIELD", "user_failed_login_count");
define("FIRST_FAILED_LOGIN_FIELD", "user_first_failed_login");
define("FORGOT_PASSWORD_TOKEN_FIELD", "user_forgot_password_token");
define("FORGOT_PASSWORD_EXPERATION_FIELD", "user_forgot_password_experation");


//The property for the name attribute  for the confirm password on the registration page 
define("USER_CONFIRM_PASSWORD", "confirm_password");

//The property for the name attribute  for the old password on the reset password page  
define("USER_OLD_PASSWORD", "old_password");

//other data that you want added as session variables when the user logs in, it is also aditional data that is expected in registration 
//it is read as an associative array, where each key is a string containing a name of a field in the database, and each value is the name of a validation function as a string
//the validation function is expected  to be in dataValidation.php, and only take one argument, the data for that field.
//the name of the field in the database, will be the name of the session variable 
//for eexample: array("userEmail"=>"validateEmail", "userPhone"=>"validatePhone"), where userEmail and userPhone are fields in the database,
//and validateEmail and validatePhone are names of functions found in dataValidation.php.
//note: registerFunctions.php expects the incoming post data to have keys that match the name of the fields. So if collecting data from a html form,
//give ids and names the same field name as the name in the database.
define("USER_PHONE_CARRIERS", 
        array("verizon", "metro pcs", "nextel", "sprint", "t-mobile", "u.s. cellular", "at&t", "virgin mobile", "tracfone", "ting", "boost mobil")
        );

define("USER_DATA_FIELDS",array("user_notifyByEmail"=>"validateNotificationByEmail", "user_notifyByPhone"=>"validateNotificationByPhone", "user_email"=>"validateEmail", "user_phone"=>"validatePhone", "user_phoneCarrier"=>"validatePhoneCarrier")
);

define("LOGIN_PAGE_NAME", "login.php");
define("LOGGEDIN_LANDING_PAGE_NAME", "index.php");

define("LOGIN_ATTEMPT_LIMIT", 5);
define("LOCKOUT_TIME", 180);

define("LOGGEDIN_TOKEN_NAME", "user_loggedin");

//forgot password token experation time
//if a user requests a forgot password email, the token in the url will expire in x time, where x is this constant
define("FORGOT_PASSWORD_TOKEN_EXPERATION_TIME", 360);

//email settings
define("EMAIL_SENDER_USERNAME", "ewudisabilitysymposium@gmail.com");
define("EMAIL_SENDER_PASSWORD", "lcjx cqnt ghtd wjko");
define("EMAIL_SENDER_HOST", "smtp.gmail.com");
define("EMAIL_SENDER_PORT", "465");

define("EMAIL_SENDER_FROM", "ewudisabilitysymposium@gmail.com");
define("EMAIL_SENDER_NAME", "Disability Symposium Forgot Password");
define("EMAIL_SENDER_REPLY_TO_EMAIL", "ewudisabilitysymposium@gmail.com");
define("EMAIL_SENDER_REPLY_TO_NAME", "No Reply");

define("RESET_FORGOT_PASSWORD_URL", "http://www.pacificwesterndisabilitystudies.tk/resetForgotPassword.php");


?>