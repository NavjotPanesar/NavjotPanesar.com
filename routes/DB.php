<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 16/01/14
 * Time: 7:02 PM
 */
include_once 'config.php';

class DB {

    protected $con;

    function __construct(){


    }

    function connect(){
        $connStr = new ConnStr();
        if($_SERVER['HTTP_HOST'] == "localhost:63342")
            $connStr = new debug();

        $dsn = 'mysql:dbname='.$connStr->dbname.';host='.$connStr->host;
        $username = $connStr->username;
        $password = $connStr->password;
        try {
            $this->con = new PDO($dsn, $username, $password); // also allows an extra parameter of configuration
        } catch(PDOException $e) {
            die('Could not connect to the database:<br/>' . $e);
        }
    }

    function query($statement){
        $result = $this->con->query($statement);
        return $result;
    }

    function getInt($statement)
    {
        $queryResult = $this->query($statement);
        foreach($queryResult->FetchAll() as $queryRow) {
            return $queryRow[0];
        }
    }

    function close(){
        $this->con = null;
    }

}


