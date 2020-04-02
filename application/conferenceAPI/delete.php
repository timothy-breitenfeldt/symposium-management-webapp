<?php
/**
 * File delete.php description
 * This code will do the following in this order:
 * 1. Restrict access to certain tables within this API on certain conditions.
 * 2. Parse through the entered arrays, dynamically creating a SQL string Query.
 * 3. Query the database with the dynamically generated query.
 *
 * This file can function without the restrictions in step 1, but will not have any restrictions whatsoever, so it will be a security hole.
 * The restrictions in step 1 will be marked with comments denoting the beginning of restricitons and the end of restrictions.
 * Feel free to try it without the restrictions. I'd advise against deleting them, but commenting them out should be fine.
 */
parse_str(file_get_contents('php://input'), $_DELETE);
if (isset($_DELETE["id_name"]) && isset($_DELETE["id_value"]) && isset($_DELETE["table_name"])) {
	try {
		$table = $_DELETE["table_name"];
		$tablecheck  = preg_replace("/[^a-zA-Z0-9]/", "", $table);
		$id_name = (array)$_DELETE["id_name"];
		$id_value = (array)$_DELETE["id_value"];
		$sql = "DELETE FROM $table WHERE ";

		//beginning of restrictions
		if($tablecheck == "useraccounts" || $tablecheck == "adminaccounts"){
		    exit("Access Restricted - 1");
		} else if ($tablecheck == "userschedule" || $tablecheck == "userconference"){
		    for($i = 0; $i < sizeof($id_name); $i++){
		        $curname = preg_replace("/[^a-zA-Z0-9]/", "", $id_name[$i]);
		        if($curname == "userid"){
		            if($id_value[$i] != $uid) exit("Access Restricted (uid mismatch)");
		        }
		    }
		} else {
		    for($i = 0; $i < sizeof($id_name); $i++){
		        $curname = preg_replace("/[^a-zA-Z0-9]/", "", $id_name[$i]);
		        if($curname == "adminid"){
		            if($id_value[$i] != $aid) exit("Access Restricted (aid mismatch)");
		             
		        }
		        
		    }
		}//end of restrictions
		
		foreach($id_name as $a){
		    $sql .= $a . " = ? AND ";
		}
		$sql = shorten($sql, strlen(" AND "));
		$sql.=";";

		$result = $pdoUtil->query($sql, $id_value);
			
		http_response_code(200);
		echo "Delete Succesful";
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
} 


?>