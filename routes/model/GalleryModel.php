<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 17/01/14
 * Time: 8:32 PM
 */
include 'model/GalleryImage.php';
include_once 'DAL.php';

class GalleryModel {

    function getImageList(){
        $dal = new DAL();
        $rawData = $dal->getGalleryImages();
        $dal->close();
        $imageList = array();
        foreach($rawData as $row){
            array_push($imageList, new GalleryImage($row[0]) );
        }
        return $imageList;
    }

    function getFeaturedImageList($num){
        $dal = new DAL();
        $rawData = $dal->getFeaturedGalleryImages($num);
        $dal->close();
        $imageList = array();
        foreach($rawData as $row){
            array_push($imageList, new GalleryImage($row[0]) );
        }
        return $imageList;
    }




}


?>

