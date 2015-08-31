<?php

/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 8/31/2015
 * Time: 2:15 PM
 */
class Post{

    public $title;
    public $description;
    public $ico;
    public $date;
    public $redirect;
    public $content;
    public $redirectType;
    public $thumb;

    public $numComments;
    public $url;
    public $images;

    function __construct() {
        $dal = DAL::getDAL();
        $this->numComments = $dal->getNumComments($this->title);

        if($this->redirectType == "Play"){
            $this->url = "#view/$this->title/$this->redirect";
        }else if($this->redirect != null){
            $this->url = $this->redirect;
        }

        $this->images = $dal->getImagesForPost($this->title);
    }
}