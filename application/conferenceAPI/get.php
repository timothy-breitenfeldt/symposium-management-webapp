<?php
//include "./chromephp-master/ChromePhp.php";
/**
 * File get.php description
 * This code will do the following in this order:
 * 1. Restrict access to certain tables within this API on certain conditions.
 * 2. Parse through the entered arrays, dynamically creating a SQL string Query.
 * 3. Query the database with the dynamically generated query.
 *
 * This file can function without the restrictions in step 1, but will not have any restrictions whatsoever, so it will be a security hole.
 * The restrictions in step 1 will be marked with comments denoting the beginning of restricitons and the end of restrictions.
 * Feel free to try it without the restrictions. I'd advise against deleting them, but commenting them out should be fine.
 */
if(isset($_GET["genFlag"])){
	$sql = "SELECT ";
	$tables = (array)$_GET["table_names"];
	
	if(empty($_GET["attrs"]) && empty($_GET["values"])){
	    $attrs = [];
	    $values = [];
	} else {
	   	$attrs = (array)$_GET["attrs"];
		$values = (array)$_GET["values"];
	}

	//beginning of restrictions
	foreach($tables as $tn){
	    if($tn == "user_accounts" || $tn == "admin_accounts"){
	        exit("Access Restricted - 1");
	    }
	}
	//end of restrictions
	
	if(!empty($_GET["values_to_select"])){
		$selectValues = (array)$_GET["values_to_select"];
		foreach($selectValues as $sv){
			$sql .= $sv.",";
		}	
		$sql = shorten($sql, 1);
	}

	if(!empty($_GET["table_names"])){
		$tables = (array)$_GET["table_names"];
		$sql .= " FROM ";
	
		$join = " NATURAL JOIN ";
		
		foreach($tables as $tn){
			$sql .= $tn . "" . $join;
		}
		$sql = shorten($sql, strlen($join));
	}

	
	if(!empty($attrs) && !empty($values)){
		$sql .= " WHERE ";
		//$attrs = (array)$_GET["attrs"];
		//$values = (array)$_GET["values"];	
		$and = " AND ";
		for($i = 0; $i < sizeof($attrs); $i++){
			$sql .= $attrs[$i] . " = ? AND ";
		}
		$sql = shorten($sql, strlen($and));
	}

	if(!empty($_GET["orderBy"])){
	    $orderby = (array)$_GET["orderBy"];
	    $sql .= " ORDER BY ";
	    foreach($orderby as $o){
            $sql .= $o . ", ";
        }
	    $sql = shorten($sql, strlen(", "));

    }


	$sql .= ";";
	//ChromePHP::log($sql);

	try{

	    if(empty($values)) $values = [];
		$result = $pdoUtil->query($sql, $values);

		if($result || $result == []){
			http_response_code(200);
			echo json_encode($result);
		} else {
			http_response_code(204);
			exit("No Content");
		}
	} catch (Exception $e){
		error_log($e->getMessage());
		exit($e->getMessage());
	}
}


?>