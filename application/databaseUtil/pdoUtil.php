<?php

/**
 * PDOUtil class
 * depends on the credentials for the database  found in creds.php
 * uses the singleton pattern to insure that there is not more than one connection to the database open at any given time.
 * Instantiate PDOUtil using the createPDOUtil method, query, and close.
 * the query method returns an associative array based on the results of the query. Sometimes there will be nothing in the array, it will be a 1d array, or it could be a 2d array.
 * 
 * @example
 * $pdoUtil = PDOUtil::createPDOUtil();
 * $results = $pdoUtil->query("select * from Users where id=?", [12]);
 * echo var_dump($results);
 * $pdoUtil->close();
*/
class PDOUtil {

    private static $instance = null;
    private $connection;

    /**
     * The private constructor only to be called by createPDOUtil
     * This method creates a PDO object by using the credentials for the target database found in creds.php
    */
    private function __construct() {
        REQUIRE_once "creds.php";

        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET . ";";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false
        ];

        try {
            $this->connection = new PDO($dsn, DB_USERNAME, DB_PASSWORD, $options);
        } catch(\PDOException $e) {
            die(json_encode(array("error"=>$e->getMessage())));
        }//end try catch
    }//end constructor

    /**
     * Creates an instance of PDOUtil and returns it if there is not already an existing instance of PDOUtil
     * if there is an existing instance, return that instance.
    */
    public static function createPDOUtil() {
        if (self::$instance == null) {
            self::$instance = new PDOUtil();
        }//end if

        return self::$instance;
    }//end method


    /**
     * Make a query using the open PDO connection 
     * You may include an array of arguments to this object based on the order they would be put into the prepared statement
     * an empty array means there are no arguments for the query
     * This method returns an associative array based on the query results. The array can differ, being empty, 1d, or 2d.
     * This function uses prepared statements to improve security, and mitagate SQL injections.
     *
     * @param string $sql - the sql query
     * @param array $variables - The parameters to be used in the prepared statement.
     * @return array - The results from the sql query as an associative array.
    */
    public function query($sql, $variables) {
        $statement = null;

        try {
            if (count($variables) == 0) {
                $statement = $this->connection->query ($sql);
            } else {
                $statement = $this->connection->prepare($sql);
                $statement->execute($variables);
            }//end else
        } catch(\PDOException $e) {
            die(json_encode(array("error"=>$e->getMessage())));
        }//end try catch

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }//end method

    /**
     * This method gets the id of the last inserted record 
     * @return string - the id of the last record inserted into the database. Useful if your ids are generated automatically.
    */
    public function getLastInsertedID() {
        return $this->connection->lastInsertId();
    }//end method

    /**
     * This closes the PDO connection to the database.
     Call this method after you are done making queries to the database.
    */
    public function close() {
        $this->connection = null;
        self::$instance = null;
    }//end method

}//end class
?>