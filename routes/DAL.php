<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 06/05/14
 * Time: 10:31 AM
 */
include_once 'DB.php';

class DAL{
    protected $db;
    function __construct(){
        $this->db = new DB();
        $this->db->connect();
    }

    function getNavBarData(){
        $result = $this->db->read("SELECT label, link, ico FROM navbardata");
        return $result;
    }

    function getGalleryImages(){
        return $this->db->read("SELECT id FROM pictures");
    }

    function getFeaturedGalleryImages($num){
        return $this->db->read("SELECT id FROM pictures limi $num");
    }

    function getPostsList($pageID){
        $result = $this->db->read("SELECT title, description, ico, datePosted, redirect, content, redirectType, thumb FROM posts WHERE pageID = '$pageID' ORDER BY datePosted DESC");
        return $result;
    }

    function getFeaturedPostsList($pageID){
        $q =  "SELECT title, description, ico, datePosted, redirect, content, redirectType, thumb
            FROM posts
            INNER JOIN featured
            ON posts.id=featured.postID
            WHERE featured.PageID = '$pageID'
            AND posts.PageID = '$pageID'
            ORDER BY datePosted DESC";
        $result = $this->db->read($q);

        return $result;
    }

    function getFeaturedPostsListWithLimit($pageID, $limit){
        $q =  "SELECT title, description, ico, datePosted, redirect, content, redirectType, thumb
            FROM posts
            INNER JOIN featured
            ON posts.id=featured.postID
            WHERE featured.PageID = '$pageID'
            AND posts.PageID = '$pageID'
            ORDER BY datePosted DESC LIMIT $limit";
        $result = $this->db->read($q);

        return $result;
    }

    function getPostsListSorted($pageID, $sort){
        $result = $this->db->read("SELECT title, description, ico, datePosted, redirect, content, redirectType, thumb FROM posts WHERE pageID = '$pageID' ORDER BY datePosted $sort");
        return $result;
    }

    function getPostsListSortedBy($pageID, $sortDirection, $sortBy){
        $result = $this->db->read("SELECT title, description, ico, datePosted, redirect, content, redirectType, thumb FROM posts WHERE pageID = '$pageID' ORDER BY $sortBy $sortDirection");
        return $result;
    }

    function getNumComments($title){
        $numComments = $this->db->getInt("SELECT COUNT(id) FROM comments WHERE title = '$title'");
        return $numComments;
    }

    function getSinglePostData($title){
        $result = $this->db->read("SELECT title, description, ico, datePosted, redirect, content, redirectType, thumb FROM posts WHERE title = '$title'");
        return $result;
    }

    function getComments($title){
        $result = $this->db->read("SELECT name,comment,date FROM comments WHERE title = '$title' ORDER BY date DESC");
        return $result;
    }

    function writeComment($name,$content,$email,$date,$title){
        $this->db->write("INSERT INTO comments(name,comment,email,date,title)VALUES('$name','$content','$email','$date','$title')");
    }

    function writeAnalytic($tweetId, $command, $username, $time, $date){
        $this->db->write("INSERT INTO analytics(id,command,username,time,date)VALUES('$tweetId','$command','$username','$time','$date')");
    }

    function close(){
        $this->db->close();
    }
}