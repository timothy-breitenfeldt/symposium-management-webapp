

#

# loginFunctions.php Documentation

### `function login()`

This is the main function for this module. Provided a username and password through a post request, the user is authenticated, and if the credentials are incorrect, then an error is thrown. First the username and password are validated, then a call to loginUser is made to authenticate the user. On success, the user is redirected to the landing page, other wise an error is thrown.

### `function loginUser(&$pdoUtil, $username, $password)`

Authenicate a user based on a provided username and password. Retrieve the user account information for the provided username. Check if the lockout attempts and time are valid. If the user is not locked out, compare the provided password with the password in the database based on the username. Throw an error if any issue arises in the authentication process. The lockout attempts are based on a constant defined in config.php, a user is only able to attempt loging in so many times until they are locked out for a specified amount of time based on a constant in the config.php file. A user is looked up based on the provided username, and all of the account information is returned. The provided password is hashed, and compared with the password hash in the database associated with the username. If the passwords do not match, then a the lockout attempts are incremented and an error is thrown. Session variables are created for all of the user account information to allow for accessing protected pages and future use.

 * **Parameters:**
   * `PDOUtil` — - The memory location of the custom PDO wrapper object.
   * `$username` — `string` — - The username to authentacate
 @param string $password - the password to authenticate.

### `function getSQLSelectForAllFields()`

A helper method to construct the sql statement for collecting the necessary data from the user_acounts table for logging in. The SQL query is constructed based on a constant defined in config.php, which defines the aditional fields in the database that are user data other than the username, password, and email which are required for this login in system to work.

 * **Returns:** `string` — - the constructed sql query
