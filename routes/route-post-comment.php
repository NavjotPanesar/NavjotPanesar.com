<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 20/01/14
 * Time: 9:47 PM
 */
include 'DAL.php';
include_once 'model/Comment.php';

date_default_timezone_set('America/Toronto');

// captach verif used to go here

//I really need to switch backend soon...
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$name = htmlspecialchars($request->name);
$content = htmlspecialchars($request->content);
$title = htmlspecialchars($request->page);
$date = date("Y-m-d H:i:s");

$dal = new DAL();
$dal->writeComment($name, $content, " ", $date, $title);
$dal->close();

echo "hi";

?>