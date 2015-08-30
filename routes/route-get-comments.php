<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 7/4/15
 * Time: 12:09 PM
 */



include 'DAL.php';
include 'misc.php';

$pageID = htmlspecialchars($_GET["page"]);


$dal = DAL::getDAL();
$commentsList = $dal->getComments($pageID);

echo json_encode($commentsList);
