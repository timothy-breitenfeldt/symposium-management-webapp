<?php 
require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";

require_once "../databaseUtil/pdoUtil.php";
require_once "includeConfig.php";


/**
 * This is the main function for this module.
 * Given an email through a post request, a user is looked up by email address, which must be unique.
 * A database query is made to insert the forgot password token, and the current time plus the experation constant found in config.php.
 * Once the database query is complete, an email is sent to the user with a custom built url pointing at the reset forgot password page.
 * The url includes a query string that has two arguments, token, which equals to the uniquely randomly generated string that identifys the user as valid,
 * and email, with is the email address the user's account is associated with.
*/
function processForgotPasswordRequest() {
    $pdoUtil = null;
    $status = "";
    $message = "";

    try {
        $pdoUtil = PDOUtil::createPDOUtil();
        $userInfo = checkIfUserExists($pdoUtil);
        $token = generateToken($pdoUtil, $userInfo[USER_EMAIL_FIELD]);

        sendForgotPasswordEmail($userInfo[USERNAME_FIELD], $userInfo[USER_EMAIL_FIELD], $token);

        $status = "successMessage";
        $message = "Success! Please check your email for a link to reset your password.";
    } catch(InvalidArgumentException $iae) {
        $status = "error";
        $message = $iae->getMessage();
    } catch(Exception $e) {
        $status = "error";
        $message = $e->getMessage();
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
 * Performs a check to see if the user exists based on the provided email address in the post request.
 * uses pdo to query the database, if no records are returned, then an error is thrown.
 * Otherwise, the found record is returned.
 *
 * @param PDOUtil $pdoUtil - the custom PDO wrapper for making database queries.
 * @param array $results - The array returned from the PDO query, which holds only one record.
*/
function checkIfUserExists(&$pdoUtil) {
    if ( !isset($_POST[USER_EMAIL_FIELD])) {
        throw new InvalidArgumentException("Please enter an email address.");
    }//end if

    $email = trim($_POST[USER_EMAIL_FIELD]);
    $results = [];
    $c = "constant";
    $sql = "SELECT {$c('USERNAME_FIELD')}, {$c('USER_EMAIL_FIELD')} FROM {$c('USER_TABLE_NAME')} WHERE {$c('USER_EMAIL_FIELD')}=?";

    if (empty($_POST[USER_EMAIL_FIELD])) {
        throw new InvalidArgumentException("Please enter an email address.");
    }//end if
    if ( !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException("Invalid email address.");
    }//end if

    $results = $pdoUtil->query($sql, [$email]);

    if (sizeof($results) != 1) {
        throw new InvalidArgumentException("Invalid email address.");
    }//end if

    return $results[0];
}//end function


/**
 * Generates a cryptographicly random string of characters for the forgot password token to securely identify the user.
 * Also inserts into the database the token, and the time of experation based on the given email address.
 * When a user recieves an email, they have only so much time before that url expires, and they have to request a new url for resetting their password.
 * The experation time is based on the current time plus a constant defined in config.php that designates in seconds how long the user has until the token expires.
 *
 * 
 * @param PDOUtil $pdoUtil - The memory location of the custom object that is a wrapper for php's PDO class.
 * @param string $email - the email that is associated with the user account that the password is being reset for.
 * @return string Returns the randomly generated token.
*/
function generateToken(&$pdoUtil, $email) {
    $token = md5(uniqid(rand(), true));
    $hashedToken = password_hash($token, PASSWORD_DEFAULT);
    $experationTime = time() + FORGOT_PASSWORD_TOKEN_EXPERATION_TIME;
    $c = "constant";
    $sql = "UPDATE {$c('USER_TABLE_NAME')} SET {$c('FORGOT_PASSWORD_TOKEN_FIELD')}=?, {$c('FORGOT_PASSWORD_EXPERATION_FIELD')}=? " .
            "WHERE {$c('USER_EMAIL_FIELD')}=?;";

    $pdoUtil->query($sql, [$hashedToken, $experationTime, $email]);
    return $token;
}//end function


/**
 * Sends an email to the provided email address including the users username, and the url to reset their forgot password.
 * The URL is constructed here, poinging at the resetForgotPassword.php file, and includes the query string arguments of token and email.
 * Uses a third party library (phpMailer) to send the email. 
 *
 * @param string $username - the username of the user to reset the passsword for.
 * @param string $email - The email address associated with the account to reset the password for.
 * @param string $token - The randomly generated token that identifys the account whose password is being requested to reset.
*/
function sendForgotPasswordEmail($username, $userEmail, $token) {
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->CharSet = "text/html; charset=UTF-8;";
    $mail->WordWrap = 80;
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
    $mail->Subject  =  "Reset Password";
    $mail->IsHTML(true);

    $mail->Body    = 
            "<!doctype html>" .
            "<html>" .
            "<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /></head>" .
            "<body>" .
            "<p>To reset your password for the username " . $username . ".<br><br>Click on the link below, or copy and paste the URL into your browser.<br><br>" .
            "<a href=\"" . RESET_FORGOT_PASSWORD_URL. "?token=" . $token . "&email=" . $userEmail . "\">" .
            htmlspecialchars(RESET_FORGOT_PASSWORD_URL . "?token=" . $token . "&email=" . $userEmail) .
            "</a></p>" .
            "<p>This is an automated email, please do not respond.</p>" .
            "</body>" .
            "</html>";

    $mail->AltBody =
            "To reset your password for the username " . $username . ".\n\nClick on the link below.\n\n" .
            htmlspecialchars("www.pacificwesterndisabilitystudies.tk/resetForgotPassword.php?token=" . $token . "&email=" . $userEmail) .
            "\n\nThis is an automated email, please do not respond.";

    if( !$mail->Send()) {
        throw new InvalidArgumentException("Mail Error - >" . $mail->ErrorInfo);
    }//end if
}//end function


processForgotPasswordRequest();
?>