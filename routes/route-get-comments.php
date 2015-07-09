<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 7/4/15
 * Time: 12:09 PM
 */



include 'model/CommentModel.php';
include 'misc.php';

$pageID = htmlspecialchars($_GET["page"]);
$model = new CommentModel();
$commentsList = $model->getComments($pageID);

echo json_encode($commentsList);
