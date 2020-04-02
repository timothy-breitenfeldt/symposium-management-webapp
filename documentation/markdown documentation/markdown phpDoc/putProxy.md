

#

# putProxy.php Documentation

### `function putToConferenceAPI()`

The main function for the put proxy. makes validation checks to insure the data provided is complete, then adds the user/admin id to the data. Not all requests need to be run through the proxy, most requests can be made to the API directly. Only requests that are spacific to a user or admin need to be requested through the proxy. Only supports the put method for: the conference table for an admin, the event table for an admin, the user_conference table for users, the user_accounts table for users, and the user_schedule table for users.

### `function addSessionVariableToData($idName, &$putData)`

A helper method used to perform validation checks on the provided data to insure that the data is complete, ready to be sent back to the API, and includes the $idName session variable. At the end of this function, an http put request is made using the httpRequester to the conference API with the new data. After the request to the API has been made and returns, a check is made to see if the request was successfull, and if the table requested is either the user_acounts or admin_accounts table, then update the login system session variables with the user's put data.

 * **Parameters:**
   * `$idName` — `string` — - the name of the login system id session variable. Is either user_id, or admin_id.
   * `array` — -  The actual memory location of the $_PUT array

### `function modifyUserSessionVariables(&$putData)`

Updates the users login system session variable with the put data. Modifys the user_name, user_email, user_phone, user_phoneCarrier, user_notifyByEmail, and user_notifyByPhone session variables. It is likely that the user is only changing a couple of these, so the rest are just being reset with the same value.

 * **Parameters:** `array` — - The memory location of $_PUT

### `function modifyAdminSessionVariables($putData)`

Updates the admins login system session variable with the put data. Modifys the admin_name, and the admin_email session variables. It is likely that the admin is only changing 1 of these, so the rest are just being reset with the same value.

 * **Parameters:** `array` — - The memory location of $_PUT

### `function setSessionVariable($name, $putData)`

a helper method for setting session variables to the correct value from the put data. Searches the put data attrs array for the specified attribute name, then assigns the session variable at the given index value to the value found in the put data values array at the found index.

 * **Parameters:**
   * `$name` — `string` — - the attribute name of the value in the session and in the put data.
   * `$putData` — `array` — - The $_PUT array.
