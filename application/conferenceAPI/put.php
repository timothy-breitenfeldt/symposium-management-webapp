<?php

/**
 * File put.php description
 * This code will do the following in this order:
 * 1. Restrict access to certain tables within this API on certain conditions.
 * 2. Parse through the entered arrays, dynamically creating a SQL string Query.
 * 3. Query the database with the dynamically generated query.
 *
 * This file can function without the restrictions in step 1, but will not have any restrictions whatsoever, so it will be a security hole.
 * The restrictions in step 1 will be marked with comments denoting the beginning of restricitons and the end of restrictions.
 * Feel free to try it without the restrictions. I'd advise against deleting them, but commenting them out should be fine.
 */
parse_str(file_get_contents('php://input'), $_PUT);
if (isset($_PUT["table_name"])) {

	try {
		$table = $_PUT["table_name"];
		$tablecheck  = preg_replace("/[^a-zA-Z0-9]/", "", $table);
		$target_name = (array) $_PUT["target_id_name"];
		$target_value = (array) $_PUT["target_id_value"];
		$attrs = (array) $_PUT["attrs"];
		$values = (array) $_PUT["values"];



		//check which table is trying to be accessed
		//check if the put call includes a user_id or admin_id in it's target_name array
		//check if the user_id or admin_id entered in target_name, target_value, attrs or values is the same as the session ids.
		//PUT requests must include a user_id or admin_id in it's call and it must match up to the current session variable.

        //Beginning of restrictions
		if($tablecheck == "useraccounts" || $tablecheck ==  "adminaccounts" ) {
		    if(!(isset($_PUT["updateUserDataFlag"]))){
		      exit("Access Restricted - 1");   
		    }
		    else {
		        $access = 1;
		        if($tablecheck == "useraccounts"){
		            for($i = 0; $i < sizeof($attrs); $i++){
		                $curattrs = preg_replace("/[^a-zA-Z0-9]/", "", $attrs[$i]);
		                if(!($curattrs == "userid" || $curattrs == "username" || $curattrs == "userphone" || $curattrs == "useremail")){
		                    $access = 0;
		                }
		            }
		        }
		        else if ($tablecheck == "adminaccounts"){
		            for($i = 0; $i < sizeof($attrs); $i++){
		                $curattrs = preg_replace("/[^a-zA-Z0-9]/", "", $attrs[$i]);
		                if(!($curattrs == "adminid" || $curattrs == "adminname" || $curattrs == "adminemail")){
		                    $access = 0;
		                }
		            }
		        }
		        if($access = 0) exit("Access Restricted - 11");
		    }
		} else if ($tablecheck == "userschedule" || $tablecheck == "userconference"){
		    for($i = 0; $i < sizeof($attrs); $i++){
		        $curattrs = preg_replace("/[^a-zA-Z0-9]/", "", $attrs[$i]);
		        if($curattrs == "userid"){
		            if($values[$i] != $uid) exit("Access Restricted (uid mismatch)");
		        }
		    }
		    $access = 0;

		    for($i = 0; $i < sizeof($target_name); $i++){
		        $target_name_cleaned = preg_replace("/[^a-zA-Z0-9]/", "", $target_name[$i]);
		        if($target_name_cleaned == "userid") {
		            if($target_value[$i] != $uid) exit("Access Restricted (uid mismatch)");
		            else $access = 1;
		        }
		    }
		    if($access < 1) exit("Access Restricted - 2");
		} else {
		    $access = 0;
		    for($i = 0; $i < sizeof($attrs); $i++){
		        $curattrs = preg_replace("/[^a-zA-Z0-9]/", "", $attrs[$i]);
		        if($curattrs == "adminid"){
		            if($values[$i] != $aid) exit("Access Restricted (aid mismatch)");
		            else $access = 1;
		        }
		    }
		    for($i = 0; $i < sizeof($target_name); $i++){
		        $target_name_cleaned = preg_replace("/[^a-zA-Z0-9]/", "", $target_name[$i]);
		        if($target_name_cleaned == "adminid") {
		            if($target_value[$i] != $aid) exit("Access Restricted (aid mismatch)");
		            else $access = 1;
		        }
		    }
		    if($access < 1) exit("Access Restricted - 3");
		}//End of restrictions
		
		
		$sql = "UPDATE $table SET ";
		for($i = 0; $i < sizeof($attrs); $i++){
			$sql .= $attrs[$i] . " = ?, ";
		}
		$sql = substr($sql, 0, strlen($sql) -2);
		
		$sql .= " WHERE ";
		
		for($i = 0; $i < sizeof($target_name); $i++){
		    $sql .= $target_name[$i] . " = ? AND ";
		}
		$sql = shorten($sql, strlen(" AND "));
		
		$values = array_merge($values, $target_value);
		
		$result = $pdoUtil->query($sql,$values);
		http_response_code(201);
		echo json_encode("success");
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
}


?>