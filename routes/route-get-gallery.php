<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 7/4/15
 * Time: 12:09 PM
 */



include 'model/GalleryModel.php';
include 'misc.php';

$model = new GalleryModel();
$imageList = $model->getImageList();

echo json_encode($imageList);
