<?php
include_once("../databaseUtil/creds.php");
include_once("../databaseUtil/pdoUtil.php");

/**
 * File index.php description
 *
 * This code will do the following:
 *
 * 1. Start a session.
 * 2. Set the global user id ($uid) or global admin id ($aid) variable respectively.
 * 3. Send the HTTP request to the appropriate Request Method, i.e. if you used getRecord, index.php will redirect to get.php.
 */
$uid = -1;
$aid = -1;

session_start();
if($_SESSION["user"] == "user" && isset($_SESSION["user_id"])) $uid = $_SESSION["user_id"];
else if ($_SESSION["user"] == "admin" && isset($_SESSION["admin_id"])) $aid = $_SESSION["admin_id"];

$pdoUtil = PDOUtil::createPDOUtil();
$request = $_SERVER["REQUEST_METHOD"];
try{
	if ($request == "POST") {
		include_once("./post.php");
	}
	else if ($request == "GET"){
		include_once("./get.php");
	}
	else if ($request == "DELETE"){
		include_once("./delete.php");
	}
	else if ($request == "PUT"){
		include_once("./put.php");
	}
} catch (Exception $e){
	error_log($e->getMessage());
	exit($e->getMessage());
}
session_write_close();

function shorten($string, $shortenBy){
	$return = substr($string, 0, strlen($string) - $shortenBy);
	return $return;
}

?>