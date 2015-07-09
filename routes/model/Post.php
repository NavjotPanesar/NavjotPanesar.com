<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 17/01/14
 * Time: 10:08 PM
 */



class Post{
    public $title;
    public $description;
    public $img;
    public $date;
    public $redirect;
    public $content;
    public $numComments;
    public $redirectType;
    public $thumb;
    public $url;

    function __construct($title, $description, $img, $date, $redirect,$content,$numComments,$redirectType,$thumb){
        $this->title = $title;
        $this->description = $description;
        $this->img = $img;
        $this->date = $date;
        $this->redirect = $redirect;
        $this->content = $content;
        $this->numComments = $numComments;
        $this->redirectType = $redirectType;
        $this->thumb = $thumb;

        if($this->redirectType == "Play"){
            $this->url = "#view/$this->title/$this->redirect";
        }else if($this->redirect != null){
            $this->url = $this->redirect;
        }
    }
}

?>