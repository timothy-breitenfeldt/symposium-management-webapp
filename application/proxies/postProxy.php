<?php
/*
 This module is used as a proxy to the conference API for making post requests.
 The purpose of this module is to intercept the ajax request to the conference API, and add the user/admin id session variable to the data being passed to the conference API.
*/

require_once "httpRequester.php";


/**
 * The main function for the post proxy. 
 * makes validation checks to insure the data provided is complete, then adds the user/admin id to the data.
 * Not all requests need to be run through the proxy, most requests can be made to the API directly.
 * Only requests that are spacific to a user or admin need to be requested through the proxy.
 * Only supports the post method for:
 * the conference table for an admin, the event table for an admin, the user_conference table for users, and the user_schedule table for users.
*/
function postToConferenceAPI() {
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["table_name"])) {
        $tableName = $_POST["table_name"];

        if ($tableName == "conference") {
            addSessionVariableToData("admin_id");
        } else if ($tableName == "event") {
            addSessionVariableToData("admin_id");
        } else if($tableName == "user_schedule") {
            addSessionVariableToData("user_id");
        } else if ($tableName == "user_conference") {
            addSessionVariableToData("user_id");
        }//end else if
    }//end if
}//end function


/**
 * A helper method used to perform validation checks on the provided data to insure that the data is complete, ready to be sent back to the API, and
 * includes the $idName session variable.
 * At the end of this function, an http post request is made using the httpRequester to the conference API with the new data.
 *
 * @param string $idName - the name of the login system id session variable. Is either user_id, or admin_id.
*/
function addSessionVariableToData($idName) {
        session_start();

    if (isset($_SESSION[$idName]) && isset($_POST["attrs"]) && isset($_POST["values"])) {
        array_push($_POST["attrs"], $idName);
        array_push($_POST["values"], $_SESSION[$idName]);
        session_write_close();

        $url = DOMAIN . "/conferenceAPI/index.php";
        $response = HTTPRequester::HTTPPost($url, $_POST);
        echo $response;
    }//end if

    if (session_status() === PHP_SESSION_ACTIVE) {
            session_write_close();
    }//end if
}//end function


postToConferenceAPI();
?>