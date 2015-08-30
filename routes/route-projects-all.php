<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 4/20/2015
 * Time: 8:28 PM
 */
include_once 'DAL.php';
include 'misc.php';

$pageID = "Projects";

$dal = DAL::getDAL();
$result = $dal->getPostsList($pageID);

echo json_encode($result);
