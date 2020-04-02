<?php
/*
 This module is used as a proxy to the conference API for making get requests.
 The purpose of this module is to intercept the ajax request to the conference API, and add the user/admin id session variable to the data being passed to the conference API.
*/

require_once "httpRequester.php";


/**
 * The main function for the get proxy. 
 * makes validation checks to insure the data provided is complete, then adds the user/admin id to the data.
 * Not all requests need to be run through the proxy, most requests can be made to the API directly.
 * Only requests that are spacific to a user or admin need to be requested through the proxy.
 * Only supports the get method for:
 * the conference table for an admin, the user_conference table for users, and the user_schedule table for users.
*/
function getFromConferenceAPI() {
    if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["table_names"])) {
        $tableName = $_GET["table_names"][0];

        if ($tableName == "conference") {
            addSessionVariableToData("admin_id");
        } else if ($tableName == "user_conference") {
            addSessionVariableToData("user_id");
        }else if ($tableName == "user_schedule") {
            addSessionVariableToData("user_id");
        }//end else if
    }//end if
}//end function


/**
 * A helper method used to perform validation checks on the provided data to insure that the data is complete, ready to be sent back to the API, and
 * includes the $idName session variable.
 * At the end of this function, an http get request is made using the httpRequester to the conference API with the new data.
 *
 * @param string $idName - the name of the login system id session variable. Is either user_id, or admin_id.
*/
function addSessionVariableToData($idName) {
    session_start();

    if (isset($_SESSION[$idName]) && isset($_GET["attrs"]) && isset($_GET["values"])) {
        if (sizeof($_GET["attrs"]) == 1 && $_GET["attrs"][0] == "") {
            $_GET["attrs"] = [];
            $_GET["values"] = [];
        }//end if

        array_push($_GET["attrs"], $idName);
        array_push($_GET["values"], $_SESSION[$idName]);
        session_write_close();

        $url = DOMAIN . "/conferenceAPI/index.php";
        $response = HTTPRequester::HTTPGet($url, $_GET);
        echo $response;
    }//end if

    if (session_status() === PHP_SESSION_ACTIVE) {
            session_write_close();
    }//end if
}//end function


getFromConferenceAPI();
?>