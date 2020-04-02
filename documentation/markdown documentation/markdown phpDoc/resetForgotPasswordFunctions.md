

#

# resetForgotPasswordFunctions.php Documentation

### `function resetForgotPassword()`

This is the main function for this module. Provided a correct query string get request, this will process a users reset password request. This is expecting the get arguments token, and email, should be accessed via the URL sent to the user by email for resetting their account password. This uses the provided email address to lookup a user and compare the provided token with the token in the database. This validates the user and provides the needed information for resetting the users password. The token does expire after a set amount of time, defined in config.php, if the time stamp in the database is smaller than the current time, then throw a locked out error. Otherwise, validate the post request for the password, and update the database with the new password.

### `function validateUser(&$pdoUtil, $email, $token)`

Validate that the email and token provided match a user account record in the database. Once located, and determined to be valid, extract the username and return it.

 * **Parameters:**
   * `PDOUtil` — - The memory location of the PDO wrapper object.
   * `$email` — `string` — - The email used to identify the user account.
   * `$token` — `string` — - The randomly generated token that is used to validate the account for resetting a password.
 * **Returns:** `string` — - the username of the account to reset the passwowrd for.

### `function updatePassword(&$pdoUtil, $username, $newPassword, $confirmNewPassword)`

Update the user accounts password based on the provided username. The fields are checked that the confirmation password matches the password field, then the password is updated based on the username.

 * **Parameters:**
   * `PDOUtil` — - The memory location of the PDO wrapper object.
   * `$username` — `string` — - The username to identify the account by.
   * `$newPassword` — `string` — - The new password for the account.
   * `$confirmNewPassword` — `string` — - The confirmation of the new password.

### `function sendSuccessEmail($username, $userEmail)`

On success of the password being reset, a success email is sent out to notify them that their user account password was reset. This uses a third-party library called phpMailer for sending out emails.

 * **Parameters:**
   * `$username` — `string` — - The username for the account in which the password was reset for.
   * `$userEmail` — `string` — - The email address for the user to send the success email to.
