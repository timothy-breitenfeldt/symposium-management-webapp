<?php
/**
 * File post.php description
 * This code will do the following in this order:
 * 1. Restrict access to certain tables within this API on certain conditions.
 * 2. Parse through the entered arrays, dynamically creating a SQL string Query.
 * 3. Query the database with the dynamically generated query.
 *
 * This file can function without the restrictions in step 1, but will not have any restrictions whatsoever, so it will be a security hole.
 * The restrictions in step 1 will be marked with comments denoting the beginning of restricitons and the end of restrictions.
 * Feel free to try it without the restrictions. I'd advise against deleting them, but commenting them out should be fine.
 */
if (isset($_POST["table_name"])){
	$table = $_POST["table_name"];
	$tablecheck  = preg_replace("/[^a-zA-Z0-9]/", "", $table);
	$attrs = (array)$_POST["attrs"];
	$values = (array)$_POST["values"];

	//beginning of restrictions
	if($tablecheck == "useraccounts" || $tablecheck ==  "adminaccounts") {
	    exit("Access Restricted - 1");
	} else if ($tablecheck == "userschedule" || $tablecheck == "userconference"){
	    for($i = 0; $i < sizeof($attrs); $i++){
	        $curattrs = preg_replace("/[^a-zA-Z0-9]/", "", $attrs[$i]);
	        if($curattrs == "userid"){
	            if($values[$i] != $uid) exit("Access Restricted (uid mismatch)");
	        }
	    }
	} else {
	    $access = 0;
	    for($i = 0; $i < sizeof($attrs); $i++){
	        $curattrs = preg_replace("/[^a-zA-Z0-9]/", "", $attrs[$i]);
	        if($curattrs == "adminid"){
	            if($values[$i] != $aid) exit("Access Restricted (aid mismatch)");
	            if($values[$i] == $aid) {
	                $access = 1;
	            }
	        }
	    }
	    if($access < 1) exit("Access Restricted - 2");
	} //end of restrictions

	$sql = "INSERT INTO ".$table." ("; 
	foreach($attrs as $a){
		$sql .= $a.",";
	}
	$sql = substr($sql, 0, strlen($sql) -1);
	$sql .= ") VALUES (";
	foreach($values as $val){
		$sql .= "?, ";
	}
	$sql = substr($sql, 0, strlen($sql) -2);
	$sql .= ");";
	try {
		if(empty($values)) $values = [];
		$result = $pdoUtil->query($sql, $values);
		http_response_code(201);
		echo json_encode("Create Succesful");
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit($e->getMessage());
	}
}
?>