<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 7/4/15
 * Time: 12:09 PM
 */


include_once 'DAL.php';
include 'misc.php';

$dal = DAL::getDAL();
$result = $dal->getGalleryImages();

echo json_encode($result);
