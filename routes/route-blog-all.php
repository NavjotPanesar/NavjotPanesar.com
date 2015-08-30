<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 7/3/15
 * Time: 11:23 PM
 */
include_once 'DAL.php';
include 'misc.php';

$pageID = "Blog";

$dal = DAL::getDAL();
$result = $dal->getPostsList($pageID);

echo json_encode($result);
