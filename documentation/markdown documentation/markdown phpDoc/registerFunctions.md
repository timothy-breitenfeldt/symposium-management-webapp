

#

# registerFunctions.php Documentation

### `function register()`

This is the main function for this module. This module relys a lot on config.php to determine what aditional data is provided other than username, email, and password. HTML form field data is collected and sent to this module to handle user account creation via a post request. The data is validated and scrubbed before any actions are performed. Once the data has passed validation, a check is made to see if the given email address and or username has already been chosen or not. If true, an error is thrown. The next step is to insert the data into the database, where all of the prepared data from the post request is inserted into the database, On success, the user is redirected to the login page.

### `function checkIfEmailExists(&$pdoUtil, $email)`

A helper function used to check the database to see if the email has already been used or not in the creation of a user account. If the email exists already, then throw an error.

 * **Parameters:**
   * `PDOUtil` — - The memory location of the custom PDO wrapper object.
   * `$email` — `string` — - The email address to check for in the database.

### `function getSQLInsertAllFields(&$parameters)`

Creates the SQL query needed to insert a record into the database. The parameters array is also constructed here. the parameters array is used as the array for the prepared statements, which contains the values to be inserted into the database.

 * **Parameters:** `array` — - The memory location of an array that will contain the values to be inserted into the database record for the new account.
