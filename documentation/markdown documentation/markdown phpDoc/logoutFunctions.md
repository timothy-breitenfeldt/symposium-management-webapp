

#

# logoutFunctions.php Documentation

### `function logout()`

This is the main function for this module. Performs the needed actions to logout of the currently logged in account. The session is destroyed, and the user is redirected to the login page. Note that because the admin and user udilize the same session, by logging out of either the user or admin, will log you out of the other at the same time.
