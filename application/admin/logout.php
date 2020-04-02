<?php
session_start();
$_SESSION["user"] = "admin";
session_write_close();

require_once "config.php";
require_once "../loginAPI/logoutFunctions.php";
?>