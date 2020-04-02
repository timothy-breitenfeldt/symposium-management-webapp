<?php

/**
 * this function authenticates a user to access a page.
 * If a user does not have the correct session variables set, then they are redirected to the login page.
*/
function authenticateUser() {
    session_start();
    $_SESSION["user"] = "admin";
    $_SESSION["pageToAccess"] = $_SERVER["PHP_SELF"];
    
    require_once "../loginAPI/includeConfig.php";
    
    if (!isset($_SESSION[LOGGEDIN_TOKEN_NAME]) || !isset($_SESSION["user"])
            || !$_SESSION[LOGGEDIN_TOKEN_NAME] || !$_SESSION[LOGGEDIN_TOKEN_NAME] || $_SESSION["user"] != "admin") {
        header("location: " . LOGIN_PAGE_NAME);
        exit;
        }//end if
    
    session_write_close();
}//end function


authenticateUser();
?>