<?php
/**
 * Created by PhpStorm.
 * User: Navjot
 * Date: 4/20/2015
 * Time: 8:28 PM
 */

  include 'model/PostModel.php';
  include 'misc.php';

  $pageID = "Projects";
  $model = new PostModel();
  $postList = $model->getPostsList($pageID);

  echo json_encode($postList);
