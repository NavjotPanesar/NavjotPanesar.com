<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 17/01/14
 * Time: 8:32 PM
 */
include 'model/Post.php';
include_once 'DAL.php';

class PostModel {


    function getPostsList($pageID){
        $dal = new DAL();
        $rawData = $dal->getPostsList($pageID);

        $postsList = array();
        foreach($rawData as $row){
            array_push($postsList, new Post($row[0],$row[1],$row[2],$row[3],$row[4],$row[5],$dal->getNumComments($row[0]),$row[6], $row[7] ) );
        }
        $dal->close();

        return $postsList;
    }

    function getFeaturedPostsList($pageID){
        $dal = new DAL();
        $rawData = $dal->getFeaturedPostsList($pageID);

        $postsList = array();
        foreach($rawData as $row){
            array_push($postsList, new Post($row[0],$row[1],$row[2],$row[3],$row[4],$row[5],$dal->getNumComments($row[0]),$row[6], $row[7] ) );
        }
        $dal->close();

        return $postsList;
    }

    function getPostsListSorted($pageID, $sort){
        $dal = new DAL();
        $rawData = $dal->getPostsListSorted($pageID, $sort);

        $postsList = array();
        foreach($rawData as $row){
            array_push($postsList, new Post($row[0],$row[1],$row[2],$row[3],$row[4],$row[5],$dal->getNumComments($row[0]),$row[6], $row[7] ) );
        }
        $dal->close();

        return $postsList;
    }

    function getPostsListSortedBy($pageID, $sortOrder, $sortBy){
        $dal = new DAL();
        $rawData = $dal->getPostsListSortedBy($pageID, $sortOrder, $sortBy);

        $postsList = array();
        foreach($rawData as $row){
            array_push($postsList, new Post($row[0],$row[1],$row[2],$row[3],$row[4],$row[5],$dal->getNumComments($row[0]),$row[6], $row[7] ) );
        }
        $dal->close();

        return $postsList;
    }

    function getSinglePost($title){
        $dal = new DAL();
        $rawData = $dal->getSinglePostData($title);
        foreach($rawData as $row){
            $data = new Post($row[0],$row[1],$row[2],$row[3],$row[4],$row[5],0, $row[6], $row[7] );
        }
        $dal->close();

        return $data;
    }




}


?>

