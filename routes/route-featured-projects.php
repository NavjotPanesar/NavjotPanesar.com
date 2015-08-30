<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 4/20/2015
 * Time: 7:31 PM
 */
include_once 'DAL.php';
include 'misc.php';

$pageID = "Projects";

$dal = DAL::getDAL();
$result = $dal->getFeaturedPostsList($pageID);

echo json_encode($result);
