<?php
/*
 This module is used as a proxy to the conference API for making put requests.
 The purpose of this module is to intercept the ajax request to the conference API, and add the user/admin id session variable to the data being passed to the conference API.
*/

require_once "httpRequester.php";


/**
 * The main function for the put proxy. 
 * makes validation checks to insure the data provided is complete, then adds the user/admin id to the data.
 * Not all requests need to be run through the proxy, most requests can be made to the API directly.
 * Only requests that are spacific to a user or admin need to be requested through the proxy.
 * Only supports the put method for:
 * the conference table for an admin, the event table for an admin, the user_conference table for users, the user_accounts table for users, and the user_schedule table for users.
*/
function putToConferenceAPI() {
    parse_str(file_get_contents('php://input'), $_PUT);

    if ($_SERVER["REQUEST_METHOD"] == "PUT" && isset($_PUT["table_name"])) {
        $tableName = $_PUT["table_name"];

        if ($tableName == "conference") {
            addSessionVariableToData("admin_id", $_PUT);
        } else if ($tableName == "event") {
            addSessionVariableToData("admin_id", $_PUT);
        } else if($tableName == "user_schedule") {
            addSessionVariableToData("user_id", $_PUT);
        } else if ($tableName == "user_conference") {
            addSessionVariableToData("user_id", $_PUT);
        } else if ($tableName == "user_accounts") {
            $_PUT["updateUserDataFlag"] = true;
            addSessionVariableToData("user_id", $_PUT);
        }//end else if
    }//end if
}//end function


/**
 * A helper method used to perform validation checks on the provided data to insure that the data is complete, ready to be sent back to the API, and
 * includes the $idName session variable.
 * At the end of this function, an http put request is made using the httpRequester to the conference API with the new data.
 * After the request to the API has been made and returns, a check is made to see if the request was successfull,
 * and if the table requested is either the user_acounts or admin_accounts table, then update the login system session variables with the user's put data.
 *
 * @param string $idName - the name of the login system id session variable. Is either user_id, or admin_id.
 * @param array &$putData -  The actual memory location of the $_PUT array 
*/
function addSessionVariableToData($idName, &$putData) {
    session_start();
    $tableName = $putData["table_name"];

    if (isset($_SESSION[$idName]) && isset($putData["attrs"]) && isset($putData["values"]) && isset($putData["target_id_name"]) && isset($putData["target_id_value"])) {
        if (sizeof($putData["target_id_name"]) == 1 && $putData["target_id_name"][0] == "") {
            $putData["target_id_name"] = array();
            $putData["target_id_value"] = array();
        }//end if
        array_push($putData["target_id_name"], $idName);
        array_push($putData["target_id_value"], $_SESSION[$idName]);
            session_write_close();

        $url = DOMAIN . "/conferenceAPI/index.php";
        $response = HTTPRequester::HTTPPut($url, $putData);

        if ($response == json_encode("success")) {
            if ($tableName == "user_accounts") {
                modifyUserSessionVariables($putData);
            } else if ($tableName == "admin_accounts") {
                modifyAdminSessionVariables($putData);
            }//end else if
        }//end if

        echo $response;
    }//end if

    if (session_status() === PHP_SESSION_ACTIVE) {
        session_write_close();
    }//end if
}//end function


/**
 * Updates the users login system session variable with the put data.
 * Modifys the user_name, user_email, user_phone, user_phoneCarrier, user_notifyByEmail, and user_notifyByPhone session variables.
 * It is likely that the user is only changing a couple of these, so the rest are just being reset with the same value.
 *
 * @param array &$putData - The memory location of $_PUT 
*/
function modifyUserSessionVariables(&$putData) {
    if (sizeof($putData["attrs"]) != sizeof($putData["values"])) {
        exit("Invalid data");
    }//end if

    session_start();
    setSessionVariable("user_name", $putData);
    setSessionVariable("user_email", $putData);
    setSessionVariable("user_phone", $putData);
    setSessionVariable("user_phoneCarrier", $putData);
    setSessionVariable("user_notifyByPhone", $putData);
    setSessionVariable("user_notifyByEmail", $putData);
    session_write_close();
}//end function


/**
 * Updates the admins login system session variable with the put data.
 * Modifys the admin_name, and the admin_email session variables.
 * It is likely that the admin is only changing 1 of these, so the rest are just being reset with the same value.
 *
 * @param array &$putData - The memory location of $_PUT 
*/
function modifyAdminSessionVariables($putData) {
    if (sizeof($putData["attrs"]) != sizeof($putData["values"])) {
        exit("Invalid data");
    }//end if

    session_start();
    setSessionVariable("admin_name", $putData);
    setSessionVariable("admin_email", $putData);
    session_write_close();
}//end function


/**
 * a helper method for setting session variables to the correct value from the put data.
 * Searches the put data attrs array for the specified attribute name,
 * then assigns the session variable at the given index value to the value found in the put data values array at the found index.
 *
 * @param string $name - the attribute name of the value in the session and in the put data.
 * @param array $putData - The $_PUT array.
*/
function setSessionVariable($name, $putData) {
    $index = array_search($name, $putData["attrs"], false);

    if ($index !== false) {
        $_SESSION[$name] = $putData["values"][$index];
    } else {
        exit("Invalid data 2");
    }//end else
}//end function


putToConferenceAPI();
?>