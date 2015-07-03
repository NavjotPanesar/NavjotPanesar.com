<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 17/01/14
 * Time: 8:32 PM
 */
include 'model/Comment.php';
include_once 'DAL.php';

class CommentModel {


    function getComments($title){
        $dal = new DAL();
        $rawData = $dal->getComments($title);
        $commentList = array();

        foreach($rawData as $row){
            array_push($commentList, new Comment($row[0],$row[1],$row[2]));
        }
        $dal->close();

        return $commentList;
    }




}


?>

