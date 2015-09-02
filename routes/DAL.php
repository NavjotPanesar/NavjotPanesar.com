<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 06/05/14
 * Time: 10:31 AM
 */

include_once('config.php');
include_once('models/Post.php');
class DAL{
    protected $db;

    private static $_instance = null;

    public static function getDAL(){
        if (!self::$_instance) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function __construct(){
        $connStr = new ConnStr();
        if($_SERVER['HTTP_HOST'] == "localhost:63342")
            $connStr = new debug();

        $dsn = 'mysql:dbname='.$connStr->dbname.';host='.$connStr->host;
        $username = $connStr->username;
        $password = $connStr->password;
        try {
            $this->db = new PDO($dsn, $username, $password); // also allows an extra parameter of configuration
        } catch(PDOException $e) {
            die('Could not connect to the database:<br/>' . $e);
        }
    }

    function query($query){
        $statement = $this->db->prepare($query);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_OBJ);
    }

    function queryWithParams($query, $params){
        $statement = $this->db->prepare($query);
        $statement->execute($params);
        return $statement->fetchAll(PDO::FETCH_OBJ);
    }

    function getInt($query, $params)
    {
        $statement = $this->db->prepare($query);
        $statement->execute($params);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result[0]["COUNT(id)"];
    }

    function getGalleryImages(){
        $query = "SELECT uri FROM pictures";
        $result = $this->query($query);
        return $result;
    }

    function getFeaturedGalleryImages($num){
        $query = "SELECT id FROM pictures limit ?";
        $params = array($num);
        return $this->queryWithParams($query, $params);
    }

    function getPostsList($pageID){
        $query = "SELECT * FROM posts WHERE pageID = ? ORDER BY date DESC";
        $params = array($pageID);
        $statement = $this->db->prepare($query);
        $statement->execute($params);
        $result = $statement->fetchAll(PDO::FETCH_CLASS, 'Post');
        return $result;
    }

    function getFeaturedPostsList($pageID){;
        $query = "SELECT *
            FROM posts
            INNER JOIN featured
            ON posts.id=featured.postID
            WHERE featured.PageID = ?
            AND posts.PageID = ?
            ORDER BY date DESC";

        $params = array($pageID, $pageID);

        $statement = $this->db->prepare($query);
        $statement->execute($params);
        $result = $statement->fetchAll(PDO::FETCH_CLASS, 'Post');

        return $result;
    }

    function getNumComments($title){
        $query = "SELECT COUNT(id) FROM comments WHERE title = ?";
        $params = array($title);
        $numComments = $this->getInt($query, $params);
        return $numComments;
    }

    function getSinglePostData($title){
        $query = "SELECT * FROM posts WHERE title = ? LIMIT 1";
        $params = array($title);

        $statement = $this->db->prepare($query);
        $statement->execute($params);
        $result = $statement->fetchAll(PDO::FETCH_CLASS, 'Post');

        $singleResult = $result[0];

        return $singleResult;
    }

    function getImagesForPost($title){;
        $query = "SELECT imageuri
            FROM postimages
            INNER JOIN posts
            ON posts.id=postimages.postid
            WHERE posts.title = ?";

        $params = array($title);

        $statement = $this->db->prepare($query);
        $statement->execute($params);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    function getComments($title){
        $query = "SELECT name,content,date FROM comments WHERE title = ? ORDER BY date DESC";
        $params = array($title);

        $result = $this->queryWithParams($query, $params);
        return $result;
    }

    function writeComment($name,$content,$email,$date,$title){
        $query = "INSERT INTO comments(name,content,email,date,title)VALUES(:name,:content,:email,:date,:title)";
        $params = array(':name' => $name, ':content' => $content,':email' =>  $email,':date' =>  $date,':title' =>  $title);

        $statement = $this->db->prepare($query);
        $statement->execute($params);
        return $statement->rowCount();
    }

    function writeImage($uri){
        $query = "INSERT INTO pictures(uri)VALUES(:uri)";
        $params = array(':uri' => $uri);

        $statement = $this->db->prepare($query);
        $statement->execute($params);
        return $statement->rowCount();
    }

    function insertCommentsForPostList($postList){
        foreach($postList as $post){
            $post->numComments = $this->getNumComments($post->title);
        }
    }

    function insertUrlForPostList($postList){
        foreach($postList as $post){
            $this->insertUrlForPost($post);
        }
    }

    function insertUrlForPost($post){
        if($post->redirectType == "Play"){
            $post->url = "#view/$post->title/$post->redirect";
        }else if($post->redirect != null){
            $post->url = $post->redirect;
        }
    }

    function close(){
        $this->db = null;
    }
}