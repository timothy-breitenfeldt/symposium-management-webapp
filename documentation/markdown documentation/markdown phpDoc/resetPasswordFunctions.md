

#

# resetPasswordFunctions.php Documentation

### `function resetPassword()`

This is the main function for this module. If a user knows their existing password, they can change it to something diferent. The first check is to authenticate the users current password, then a check is made to insure that the new password and the confirmation password match. Finally, a query is made to update the users password. This depends on the user already being logged in, sinse the login system session variables are used to validate the user.

### `function verifyCurrentPassword($pdoUtil, $username, $currentPassword)`

Validates the existing password against the password hash in the database based on the session username session variable. The session username is first verified against the data in the database, if 1 record is returned, then the application continues. The provided password is hashed, and compared to the password hash in the database, if they don't match, then false is returned.

 * **Parameters:**
   * `PDOUtil` — - The memory location of the PDO wrapper object.
   * `$username` — `string` — - The username to identify the account by.
   * `$currentPassword` — `string` — - The current password that is used to sign into this account.
 * **Returns:** `boolean` — - returns true if the current password is valid, and false if not.
