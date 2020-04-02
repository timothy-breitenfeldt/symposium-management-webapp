

#

# deleteProxy.php Documentation

### `function deleteFromConferenceAPI()`

The main function for the delete proxy. makes validation checks to insure the data provided is complete, then adds the user/admin id to the data. Not all requests need to be run through the proxy, most requests can be made to the API directly. Only requests that are spacific to a user or admin need to be requested through the proxy. Only supports the delete method for: the conference table for an admin, the user_conference table for users, and the user_schedule table for users.

### `function addSessionVariableToData($idName)`

A helper method used to perform validation checks on the provided data to insure that the data is complete, ready to be sent back to the API, and includes the $idName session variable. At the end of this function, an http delete request is made using the httpRequester to the conference API with the new data.

 * **Parameters:** `$idName` — `string` — - the name of the login system id session variable. Is either user_id, or admin_id.
