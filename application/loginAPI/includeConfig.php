<?php
/*
 This module acts as a wrapper for the include config.php file.
 Sinse there are two config.php files, one for the user, and one for the admin, The system must determine which user type is signed in, and load the correct config.php.
*/

/**
 * Check the session variable user, to check which user type is being accessed, user or admin.
 * Once the user is determined, the appropriate config.php file is included.
*/
function includeConfigFile() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }//end if

    if (isset($_SESSION["user"])) {
        if ($_SESSION["user"] == "user") {
            require_once "../config.php";
        } else if ($_SESSION["user"] == "admin") {
            require_once "../admin/config.php";
        } else {
            die("Invalid session, please reload the site and try again.");
        }//end else
    } else {
        die("Invalid session, please reload the site and try again.");
    }//end else
    
    session_write_close();
}//end function


includeConfigFile();
?>