

#

# forgotPasswordFunctions.php Documentation

### `function processForgotPasswordRequest()`

This is the main function for this module. Given an email through a post request, a user is looked up by email address, which must be unique. A database query is made to insert the forgot password token, and the current time plus the experation constant found in config.php. Once the database query is complete, an email is sent to the user with a custom built url pointing at the reset forgot password page. The url includes a query string that has two arguments, token, which equals to the uniquely randomly generated string that identifys the user as valid, and email, with is the email address the user's account is associated with.

### `function checkIfUserExists(&$pdoUtil)`

Performs a check to see if the user exists based on the provided email address in the post request. uses pdo to query the database, if no records are returned, then an error is thrown. Otherwise, the found record is returned.

 * **Parameters:**
   * `$pdoUtil` — `PDOUtil` — - the custom PDO wrapper for making database queries.
   * `$results` — `array` — - The array returned from the PDO query, which holds only one record.

### `function generateToken(&$pdoUtil, $email)`

Generates a cryptographicly random string of characters for the forgot password token to securely identify the user. Also inserts into the database the token, and the time of experation based on the given email address. When a user recieves an email, they have only so much time before that url expires, and they have to request a new url for resetting their password. The experation time is based on the current time plus a constant defined in config.php that designates in seconds how long the user has until the token expires.

 * **Parameters:**
   * `$pdoUtil` — `PDOUtil` — - The memory location of the custom object that is a wrapper for php's PDO class.
   * `$email` — `string` — - the email that is associated with the user account that the password is being reset for.
 * **Returns:** `string` — Returns the randomly generated token.

### `function sendForgotPasswordEmail($username, $userEmail, $token)`

Sends an email to the provided email address including the users username, and the url to reset their forgot password. The URL is constructed here, poinging at the resetForgotPassword.php file, and includes the query string arguments of token and email. Uses a third party library (phpMailer) to send the email.

 * **Parameters:**
   * `$username` — `string` — - the username of the user to reset the passsword for.
   * `$email` — `string` — - The email address associated with the account to reset the password for.
   * `$token` — `string` — - The randomly generated token that identifys the account whose password is being requested to reset.
