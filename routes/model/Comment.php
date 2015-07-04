<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 17/01/14
 * Time: 10:08 PM
 */



class Comment{
    public $name;
    public $comment;
    public $date;

    function __construct($name, $content, $date){
        $this->name = $name;
        $this->content = $content;
        $this->date = $date;
    }
}

?>