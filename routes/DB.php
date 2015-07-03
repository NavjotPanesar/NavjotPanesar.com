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
        $this->con = mysqli_connect($connStr->host,$connStr->username,$connStr->password,$connStr->dbname);
        if (mysqli_connect_errno())
        {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }
    }

    function read($query){
        $returned = array();
        if($result = $this->con->query($query)){
            while($row = $result->fetch_row()){
                array_push($returned, $row);
            }
            $result->close();
        }
        return $returned;
    }

    function write($query)
    {
        $result = mysqli_query($this->con,$query);
        //$result->close();
        return $result;
    }

    function getInt($query)
    {
        $returned = array();
        if($result = $this->con->query($query)){
            while($row = $result->fetch_row()){
                array_push($returned, $row);
            }
            $result->close();
        }
        return $returned[0][0];
    }

    function close(){
        $this->con->close();
    }

}


