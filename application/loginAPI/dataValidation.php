<?php
/*
 A collection of functions used for validating html form field data in the login system.
*/

require_once "includeConfig.php";


/**
 * Validates a string as a username.
 * A username must have between 3 and 30 characters inclusive, start with a letter,, and may contain: capital and lower case letters,
 * numbers between 0 and 9, and a period and a dash.
 *
 * @param string $username - the username string to validate.
*/
function validateUsername($username) {
    if ( !isset($username)) {
        throw new InvalidArgumentException("No username is defined.");
    }//end if


    $usernameRegex = '/^[A-Za-z][A-Za-z0-9\.\-]{3,31}$/';

    if (empty($username)) {
        throw new InvalidArgumentException("Please enter a username");
    }//end if
    if ( !preg_match($usernameRegex, $username)) {
        throw new InvalidArgumentException("Invalid username or password.");
    }//end if
}//end function


/**
 * Validates a password string.
 * A password must contain at least 6 characters.
 *
 * @param string $password - the string to validate as a password.
*/
function validatePassword($password) {
    if ( !isset($password)) {
        throw new InvalidArgumentException("No password is defined.");
    }//end if
    if (empty($password)) {
        throw new InvalidArgumentException("Please enter your password");
    }//end if
    if (strlen($password) < 6) {
        throw new InvalidArgumentException("Invalid password. Your password should have at least 6 characters.");
    }//end if
}//end function


/**
 * Validates a string as a password, and compares the two strings to guarantee that the passwords match.
 *
 * @param string $password - the string to be validated as a password.
 * @param string $confirmPassword - The String to be compared to the password string, this must match the $password string or an error is thrown.
*/
function validatePasswordConfirmation($password, $confirmPassword) {
    if ( !isset($password) && !isset($confirmPassword)) {
        throw new InvalidArgumentException("No password or confirm password is defined.");
    }//end if

    validatePassword($password);

    if (empty($confirmPassword)) {
        throw new InvalidArgumentException("Please confirm your password.");
    }//end if
    if ($password != $confirmPassword) {
        throw new InvalidArgumentException("Your passwords did not match.");
    }//end if
}//end function


/**
 * Validates a string as an email.
 * Uses filter_var to validate the email
 *
 * @param string $email - The string to be validated as an email.
*/
function validateEmail($email) {
    if ( !isset($email)) {
        throw new InvalidArgumentException("No email is defined.<br>$email");
    }//end if

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException( "Invalid email address. Email entered: " . $email);
    }
}//end function 



/**
 * Validates a string as a phone number.
 * The given string is scrubbed for any characters that are not numbers, then a check is made to test if the scrubbed string length is equal to 10.
 * 
 * @param string &$phone - The memory location of a string to be scrubbed and validated as a phone number.
*/
function validatePhone(&$phone) {
    if ( !isset($phone)) {
        throw new InvalidArgumentException("No phone is defined.");
    }//end if

    if($_POST["user_notifyByPhone"] == 1){
        $numbersOnly = preg_replace("/[^0-9]/", "", $phone);
        $numberOfDigits = strlen($numbersOnly);
        if ($numberOfDigits != 10) {
            throw new InvalidArgumentException("Invalid Phone Number, must be exactly 10 digits.");
        } 
        $phone = $numbersOnly; 
    } else {
        $phone = "";
    }
}//end function


/**
 * Validates three ints as components of a date, month, day, year.
 * Uses php function checkdate to validate.
 *
 * @param int $year - an integer that represents a year.
 * @param int $month - An integer that represents a month.
 * @param int $day - An integer that represents a day.
*/
function validateDate($year, $month, $day){
    if(!(checkdate($month, $day, $year))){
        throw new InvalidArgumentException("Invalid date format. Expected YYYY-MM-DD");
    }
}//end function


/**
 * Validates a string as a time based on a provided format.
 * The format string is provided a default value hh:ii:ss.
 * Uses the php date object to validate.
 *
 * @param string $time - A string to be validated as a time.
 * @param string $format - a string to be used as a template for how to validate the given time. Has a default value of hh:ii:ss.
*/
function validateTime($time, $format = "hh:ii:ss"){
    $dateObj = DateTime::createFromFormat($format, $time);
    if(!( $dateObj && $dateObj->format($format) == $time)){
        throw new InvalidArgumentException("Invalid time format. Expected 'hh:mm:ss'.");
    }
}//end function


/**
 * Validates a string as a boolean value for notify by email.
 * The resulting value will be 1 for true, and 0 for false.
 *
 * @param string $field - The memory location of a string that is a boolean value.
*/
function validateNotificationByEmail($field) {
    $_POST["user_notifyByEmail"] = setCheckboxValue($field);
}//end function


/**
 * Validates a string as a boolean value for notify by phone.
 * The resulting value will be 1 for true, and 0 for false.
 *
 * @param string $field - The memory location of a string that is a boolean value.
*/
function validateNotificationByPhone($field) {
    $_POST["user_notifyByPhone"] = setCheckboxValue($field);
}//end function


/**
 * Scrubs a string as a boolean variable.
 * If given a string value of true or 1, then return 1, otherwise, return 0.
 * This is used for validating html checkboxes.
 *
 * @param string $field - The string boolean value to be scrubbed.
 * @return int - The scrubbed boolean value.
*/
function setCheckboxValue($field) {
    if (isset($field)) {
        if ($field == "true" || $field == 1) {
            return 1;
        } else {
            return 0;
        }//end else
    }//end if


        return 0;
}//end function


/**
 * Validates a string as a phone carrier based on the supported carriers of our application.
 * Insures that the given string matches one of the carriers that are defined in config.php as a constant.
 *
 * @param string $carrier - A string to be validated as a phone carrier.
*/
function validatePhoneCarrier($carrier) {
    if ( !isset($carrier)) {
        throw new InvalidArgumentException("No carrier is defined.");
    }//end if

    if($_POST["user_notifyByPhone"] == 1){
            $match = false;

        foreach(USER_PHONE_CARRIERS as $carrierName){
            if($carrier == $carrierName){
                $match = true;
            }
        }
        if($match == false){
            throw new InvalidArgumentException("Carrier is invalid. Carrier entered: " . $carrier);
        }
    } else {
        $carrier = "";
    }
}//end function
?>