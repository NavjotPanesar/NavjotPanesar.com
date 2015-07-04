<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 7/3/15
 * Time: 11:23 PM
 */
include 'model/PostModel.php';
include 'misc.php';

$pageID = "Blog";
$model = new PostModel();
$postList = $model->getPostsList($pageID);

echo json_encode($postList);