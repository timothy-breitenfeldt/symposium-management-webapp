<?php
/*
 This module manages the actions needed to register with the login system.
*/

require_once "../databaseUtil/pdoUtil.php";
require_once "dataValidation.php";
require_once "includeConfig.php";


/**
 * This is the main function for this module.
 * This module relys a lot on config.php to determine what aditional data is provided other than username, email, and password.
 * HTML form field data is collected and sent to this module to handle user account creation via a post request.
 * The data is validated and scrubbed before any actions are performed.
 * Once the data has passed validation, a check is made to see if the given email address and or username has already been chosen or not. If true, an error is thrown.
 * The next step is to insert the data into the database, where all of the prepared data from the post request is inserted into the database,
 * On success, the user is redirected to the login page.
*/
function register() {
    $pdoUtil = null;
    $status = "";
    $message = "";

    try {
        if($_SERVER["REQUEST_METHOD"] == "POST") {

            $username = strtolower(trim($_POST[USERNAME_FIELD]));
            $password = $_POST[USER_PASSWORD_FIELD];
            $confirmPassword = $_POST[USER_CONFIRM_PASSWORD];
            $pdoUtil = PDOUtil::createPDOUtil();
            $c = "constant";
            $sql = "SELECT {$c('USER_ID_FIELD')} FROM {$c('USER_TABLE_NAME')} WHERE {$c('USERNAME_FIELD')}=?;";
            $results = $pdoUtil->query($sql, [$username]);
            if (sizeof($results) != 0) {
                throw new InvalidArgumentException("that username has already been chosen, please choose another username.");
            }//end if

            validateUsername($username);
            validatePasswordConfirmation($password, $confirmPassword);

            //validate any other user data that is provided in USER_DATA_FIELDS
            foreach (USER_DATA_FIELDS as $field=>$validationFunction) {
            if (isset($_POST[$field])) {
                    $validationFunction($_POST[$field]);
                } else {
                    $validationFunction(null);
                }//end if
            }//end foreach loop

            checkIfEmailExists($pdoUtil, $_POST[USER_EMAIL_FIELD]);

            $parameters = [];
            $sql = getSQLInsertAllFields($parameters);

            //Insert data if no exception was thrown, and redirect to the login page.
            $password = password_hash($password, PASSWORD_DEFAULT);
            array_unshift($parameters, $username, $password);
            $pdoUtil->query($sql, $parameters);
            $status = "success";
            $message = LOGIN_PAGE_NAME;
        } else {
            throw new InvalidArgumentException("There was a problem Processing your request, please try again.");
        }//end else
    } catch(InvalidArgumentException $iae) {
        $status = "error";
        $message = $iae->getMessage();
    } catch(Exception $e) {
        $status = "error";
        //$message = "Unknown error: There was an error processing your request, please try again.";
        $message = $e->getMessage();
    } finally {
        if ($pdoUtil != null) {
            $pdoUtil->close();
        }//end if

        echo json_encode(array($status=>$message));
    }//end try catch finally
}//end function


/**
 * A helper function used to check the database to see if the email has already been used or not in the creation of a user account.
 * If the email exists already, then throw an error.
 *
 * @param PDOUtil &$pdoUtil - The memory location of the custom PDO wrapper object.
 * @param string $email - The email address to check for in the database.
*/
function checkIfEmailExists(&$pdoUtil, $email) {
    $c = "constant";
    $sql = "SELECT {$c('USER_ID_FIELD')} FROM {$c('USER_TABLE_NAME')} WHERE {$c('USER_EMAIL_FIELD')}=?;";
    $result = $pdoUtil->query($sql, [$email]);

    if ($result != null && sizeof($result) >= 1) {
        throw new InvalidArgumentException("That email address has already been used, please provide a different email address.");
    }//end if
}//end function


/**
 * Creates the SQL query needed to insert a record into the database. 
 * The parameters array is also constructed here. the parameters array is used as the array for the prepared statements,
 * which contains the values to be inserted into the database.
 *
 * @param array &$parameters - The memory location of an array that will contain the values to be inserted into the database record for the new account.
*/
function getSQLInsertAllFields(&$parameters) {
    $c = "constant";
    $sql = "INSERT INTO {$c('USER_TABLE_NAME')} ({$c('USERNAME_FIELD')}, {$c('USER_PASSWORD_FIELD')}";
    $sqlPlaceholders = "VALUES (?, ?";
    $fields = array_keys(USER_DATA_FIELDS);

    foreach ($fields as $field) {
        $sql .= ", " . $field;
        $sqlPlaceholders .= ", ?";
        array_push($parameters, $_POST[$field]);
    }//end foreach loop

    $sqlPlaceholders .= ")";
    $sql .= ") " . $sqlPlaceholders . ";";
    return $sql;
}//end function 


if (isset($_POST[USERNAME_FIELD]) and isset($_POST[USER_PASSWORD_FIELD]) and isset($_POST[USER_CONFIRM_PASSWORD])) {
    register();
}//end if
?>