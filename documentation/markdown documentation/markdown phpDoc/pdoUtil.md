

#

# pdoUtil.php Documentation

### `class PDOUtil`

PDOUtil class depends on the credentials for the database found in creds.php uses the singleton pattern to insure that there is not more than one connection to the database open at any given time. Instantiate PDOUtil using the createPDOUtil method, query, and close. the query method returns an associative array based on the results of the query. Sometimes there will be nothing in the array, it will be a 1d array, or it could be a 2d array.

 * **Example:** * $pdoUtil = PDOUtil::createPDOUtil();

     $results = $pdoUtil->query("select * from Users where id=?", [12]);

     echo var_dump($results);

     $pdoUtil->close();

### `private function __construct()`

The private constructor only to be called by createPDOUtil This method creates a PDO object by using the credentials for the target database found in creds.php

### `public static function createPDOUtil()`

Creates an instance of PDOUtil and returns it if there is not already an existing instance of PDOUtil if there is an existing instance, return that instance.

### `public function query($sql, $variables)`

Make a query using the open PDO connection You may include an array of arguments to this object based on the order they would be put into the prepared statement an empty array means there are no arguments for the query This method returns an associative array based on the query results. The array can differ, being empty, 1d, or 2d. This function uses prepared statements to improve security, and mitagate SQL injections.

 * **Parameters:**
   * `$sql` — `string` — - the sql query
   * `$variables` — `array` — - The parameters to be used in the prepared statement.
 * **Returns:** `array` — - The results from the sql query as an associative array.

### `public function getLastInsertedID()`

This method gets the id of the last inserted record

 * **Returns:** `string` — - the id of the last record inserted into the database. Useful if your ids are generated automatically.

### `public function close()`

This closes the PDO connection to the database.
