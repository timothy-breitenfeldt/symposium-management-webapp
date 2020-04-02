<?php
/*
 This module handles resetting a forgot password.
 Depends on the user providing a correct query string as a url to this module. Based on the URL sent to the user by the forgotPasswordFunctions.php module.
*/

require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";

require_once "includeConfig.php";
require_once "dataValidation.php";
require_once "../databaseUtil/pdoUtil.php";


/**
 * This is the main function for this module.
 * Provided a correct query string get request, this will process a users reset password request.
 * This is expecting the  get arguments token, and email, should be accessed via the URL sent to the user by email for resetting their account password.
 * This uses the provided email address to lookup a user and compare the provided token with the token in the database.
 * This validates the user and provides the needed information for resetting the users password.
 * The token does expire after a set amount of time, defined in config.php, if the time stamp in the database is smaller than the current time, then throw a locked out error.
 * Otherwise, validate the post request for the password, and update the database with the new password.
*/
function resetForgotPassword() {
    $pdoUtil = null;
    $status = "";
    $message = "";

    try {
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            $pdoUtil = PDOUtil::createPDOUtil();
            $email = $_GET["email"];
            $token = $_GET["token"];
            $username = validateUser($pdoUtil, $email, $token);
            $newPassword = $_POST[USER_PASSWORD_FIELD];
            $confirmNewPassword = $_POST[USER_CONFIRM_PASSWORD];

            updatePassword($pdoUtil, $username, $newPassword, $confirmNewPassword);
            sendSuccessEmail($username, $email);

            //logout of any accounts currently logged in
            session_start();
            $_SESSION = array();
            session_destroy();
            session_write_close();

            $status = "success";
            $message = LOGIN_PAGE_NAME;
        } else {
            throw new InvalidArgumentException("There was a problem Processing your request, please try again.");
        }//end else
    } catch(InvalidArgumentException $e) {
        $status = "error";
        $message = $e->getMessage();
    } catch(Exception $e) {
        $status = "error";
        $message = "This is a general exception:<br>" . $e->getMessage();
    } finally {
        if ($pdoUtil != null) {
            $pdoUtil->close();
        }//end if

        sleep(1);
        $result[$status] = $message;
        echo json_encode($result);
    }//end try catch finally
}//end function


/**
 * Validate that the email and token provided match a user account record in the database.
 * Once located, and determined to be valid, extract the username and return it.
 *
 * @param PDOUtil &$pdoUtil - The memory location of the PDO wrapper object.
 * @param string $email - The email used to identify the user account.
 * @param string $token - The randomly generated token that is used to validate the account for resetting a password.
 * @return string - the username of the account to reset the passwowrd for.
*/
function validateUser(&$pdoUtil, $email, $token) {
    $hashedToken = "";
    $tokenExperationTime = 0;
    $username = "";
    $c = "constant";
    $sql = "SELECT {$c('USERNAME_FIELD')}, {$c('FORGOT_PASSWORD_TOKEN_FIELD')}, {$c('FORGOT_PASSWORD_EXPERATION_FIELD')} " .
            "FROM {$c('USER_TABLE_NAME')} WHERE {$c('USER_EMAIL_FIELD')}=?;";
    $results = $pdoUtil->query($sql, [$email]);

    if ($results == null || sizeof($results) != 1) {
        throw new InvalidArgumentException("Invalid email or token, please return to the forgot password page to get a new link.");
    }//end if

    $hashedToken = $results[0][FORGOT_PASSWORD_TOKEN_FIELD];

    if ( !password_verify($token, $hashedToken)) {
        throw new InvalidArgumentException("Invalid email or token, please return to the forgot password page to resend a new link.");
    }//end if

    $tokenExperationTime = (int)$results[0][FORGOT_PASSWORD_EXPERATION_FIELD];

    if (time() >= $tokenExperationTime) {
        throw new InvalidArgumentException("Token has expired, please return to the forgot password page to resend a new link.");
    }//end if

    $username = $results[0][USERNAME_FIELD];
    return $username;
}//end function


/**
 * Update the user accounts password based on the provided username.
 * The fields are checked that the confirmation password matches the password field, then the password is updated based on the username.
 *
 * @param PDOUtil &$pdoUtil - The memory location of the PDO wrapper object.
 * @param string $username - The username to identify the account by.
 * @param string $newPassword - The new password for the account.
 * @param string $confirmNewPassword - The confirmation of the new password.
*/
function updatePassword(&$pdoUtil, $username, $newPassword, $confirmNewPassword) {
    $c = "constant";
    $sql = "UPDATE {$c('USER_TABLE_NAME')} SET {$c('USER_PASSWORD_FIELD')}=?, " .
            "{$c('FORGOT_PASSWORD_TOKEN_FIELD')}=?, {$c('FORGOT_PASSWORD_EXPERATION_FIELD')}=? WHERE {$c('USERNAME_FIELD')}=?";

    validatePasswordConfirmation($newPassword, $confirmNewPassword);

    $newPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $pdoUtil->query($sql, [$newPassword, null, 0, $username]);
}//end function 


/**
 * On success of the password being reset, a success email is sent out to notify them that their user account password was reset.
 * This uses a third-party library called phpMailer for sending out emails.
 *
 * @param string $username - The username for the account in which the password was reset for.
 * @param string $userEmail - The email address for the user to send the success email to.
*/
function sendSuccessEmail($username, $userEmail) {
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->CharSet =  "text/html; charset=UTF-8;";
    $mail->IsSMTP();
    $mail->SMTPAuth = true;                  
    $mail->Username = EMAIL_SENDER_USERNAME;
    $mail->Password = EMAIL_SENDER_PASSWORD;
    $mail->SMTPSecure = "ssl";  
    $mail->Host = EMAIL_SENDER_HOST;
    $mail->Port = EMAIL_SENDER_PORT;
    $mail->From = EMAIL_SENDER_FROM;
    $mail->Sender = EMAIL_SENDER_FROM;
    $mail->FromName = EMAIL_SENDER_NAME;
    $mail->AddReplyTo(EMAIL_SENDER_REPLY_TO_EMAIL, EMAIL_SENDER_REPLY_TO_NAME);
    $mail->AddAddress($userEmail, $username);
    $mail->Subject  =  "Password Reset Successful";
    $mail->IsHTML(true);
    $mail->Body    =
            "<!doctype html>" .
            "<html>" .
            "<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /></head>" .
            "<body>" .
            "<p>The password for the pacific western disability studies account with the username: {$username} has been reset,<br><br>if you did not reset your " .
            "password, please contact an administrator.<br><br>This is an automated message, please do not respond.</p>" .
            "</body>" .
            "</html>";

    $mail->AltBody =
            "The password for the pacific western disability studies account with the username: {$username} has been reset,\n\nif you did not reset your " .
            "password, your account may be comprimised. you should change your password right away.\n\nThis is an automated message, please do not respond.";

    if( !$mail->Send()) {
        throw new InvalidArgumentException("Mail Error - >" . $mail->ErrorInfo);
    }//end if
}//end function


if ( !isset($_GET) || !isset($_GET["token"]) || !isset($_GET["email"])) {
    $result = array("errorRedirection"=>"../error.php");
    echo json_encode($result);
} else {
    if (isset($_POST[USER_PASSWORD_FIELD]) && isset($_POST[USER_CONFIRM_PASSWORD])) {
        resetForgotPassword();
    } else {
        $result = array("errorRedirection"=>"../error.php");
        echo json_encode($result);
    }//end else
}//end else
?>