<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 4/20/2015
 * Time: 7:31 PM
 */
include 'model/PostModel.php';
include 'misc.php';

$pageID = "Projects";
$model = new PostModel();
$postList = $model->getFeaturedPostsList($pageID);

echo json_encode($postList);